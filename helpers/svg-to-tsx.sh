#!/usr/bin/env bash
set -euo pipefail

# Convert all .svg files in a directory to React TSX components.
# Usage:
#   ./svg-to-tsx.sh ./svgs ./out [Prefix]
# Example:
#   ./svg-to-tsx.sh ./icons ./icons-tsx Pokedex

IN_DIR="${1:-}"
OUT_DIR="${2:-}"
PREFIX="${3:-Icon}"

if [[ -z "$IN_DIR" || -z "$OUT_DIR" ]]; then
  echo "Usage: $0 <input_dir> <output_dir> [Prefix]"
  exit 1
fi

if [[ ! -d "$IN_DIR" ]]; then
  echo "Input dir not found: $IN_DIR"
  exit 1
fi

mkdir -p "$OUT_DIR"

pascal_case() {
  # turns "1.svg" -> "Pokedex1", "my_icon.svg" -> "MyIcon"
  local s="$1"
  s="${s%.svg}"
  # split on non-alnum, uppercase first letter of each chunk, join
  awk -v str="$s" 'BEGIN{
    gsub(/[^A-Za-z0-9]+/, " ", str);
    n=split(str, a, " ");
    out="";
    for (i=1;i<=n;i++){
      if (a[i]=="") continue;
      out = out toupper(substr(a[i],1,1)) substr(a[i],2);
    }
    print out;
  }'
}

jsxify_svg() {
  # minimal JSX fixes:
  # - remove XML prolog
  # - make attribute quotes double
  # - self-close tags like <path ...></path> -> <path ... />
  # - fix common React attribute casing (add more if needed)
  #
  # NOTE: your sample SVG already uses React-safe attrs mostly (fill, viewBox, xmlns, etc.)
  sed -E \
    -e "s/^<\?xml[^>]*\?>[[:space:]]*//g" \
    -e "s/'/\"/g" \
    -e "s/<(path|circle|rect|line|polyline|polygon|ellipse|stop)([^>]*)><\/\1>/<\1\2 \\/>/g" \
    -e "s/\bclass=/className=/g" \
    -e "s/\bstroke-width=/strokeWidth=/g" \
    -e "s/\bstroke-linecap=/strokeLinecap=/g" \
    -e "s/\bstroke-linejoin=/strokeLinejoin=/g" \
    -e "s/\bstroke-miterlimit=/strokeMiterlimit=/g" \
    -e "s/\bfill-rule=/fillRule=/g" \
    -e "s/\bclip-rule=/clipRule=/g" \
    -e "s/\bxmlns:xlink=/xmlnsXlink=/g" \
    -e "s/\bxlink:href=/xlinkHref=/g"
}

wrap_tsx() {
  local component="$1"
  local svg_content="$2"

  cat <<EOF
import { SVGProps } from 'react'

export function ${component}(props: SVGProps<SVGSVGElement>) {
  return (
$(printf "%s" "$svg_content" | sed -E 's/^/    /')
  )
}

export default ${component}
EOF
}

shopt -s nullglob
for svg in "$IN_DIR"/*.svg; do
  base="$(basename "$svg")"
  name="$(pascal_case "$base")"
  component="${PREFIX}${name}"
  out="$OUT_DIR/${component}.tsx"

  # Read file, convert to JSX-ish SVG, then inject {...props} into the <svg ...> open tag.
  svg_jsx="$(cat "$svg" | jsxify_svg)"

  # Ensure we only add props once:
  # Add {...props} before the closing ">" of the first <svg ...> tag.
  if ! grep -q "{...props}" <<<"$svg_jsx"; then
    svg_jsx="$(perl -0777 -pe 's/<svg\b([^>]*)>/
      my $a=$1;
      # keep attributes, add props at the end (before >)
      "<svg".$a." {...props}>"
    /e' <<<"$svg_jsx")"
  fi

  wrap_tsx "$component" "$svg_jsx" > "$out"
  echo "✔ $base -> $(basename "$out")"
done

echo "Done. Output in: $OUT_DIR"
