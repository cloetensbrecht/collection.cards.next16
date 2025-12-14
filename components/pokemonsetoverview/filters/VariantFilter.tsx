import MultiSelect from '@/components/select/MultiSelect'
import {
  HolofoilPattern,
  holofoilPatterns,
  Pattern,
  ReverseHolofoilPattern,
  reverseHolofoilPatterns
} from '@/consts/pattern'
import {variant, Variant} from '@/consts/variant'

type VariantFilterProps = {
  options: (Variant | Pattern)[]
  onChange: (options: {
    label: string
    value: (Variant | Pattern) | null
  }) => void
  selected: (Variant | Pattern) | null
}

const VariantFilter: React.FC<VariantFilterProps> = ({
  options,
  onChange,
  selected
}) =>
  options.length > 1 ? (
    <MultiSelect
      innerLabel="Filter by Variant"
      label="Variant"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== selected)[0] || null
        onChange({
          label: selectedOption?.label || 'All energies',
          value: selectedOption?.value
            ? selectedOption.value === selected
              ? null
              : (selectedOption.value as Variant | Pattern)
            : null
        })
      }}
      options={options.map(option => ({
        label:
          variant[option as Variant] ||
          reverseHolofoilPatterns[option as ReverseHolofoilPattern] ||
          holofoilPatterns[option as HolofoilPattern],
        value: option
      }))}
      placeholder="All variants"
      selected={selected ? [selected] : undefined}
    />
  ) : null

export default VariantFilter
