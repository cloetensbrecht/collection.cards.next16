import {Label} from '@/components/ui/label'
import type {Option} from '@/components/ui/multi-select'
import MultipleSelector from '@/components/ui/multi-select'

type MultiSelectProps = {
  innerLabel?: string
  label?: string
  onChange: (options: Option[]) => void
  options: Option[]
  placeholder?: string
  selected?: Option['value'][] | undefined
}

const MultiSelect = ({
  innerLabel,
  label,
  onChange,
  options,
  placeholder,
  selected
}: MultiSelectProps) => {
  return (
    <div
      className="inline-flex flex-col gap-1 items-start"
      style={{'--radius': '8px'} as React.CSSProperties}
    >
      {label && (
        <Label className="hidden mb-0 font-normal text-xs whitespace-nowrap text-muted-foreground xl:inline-block">
          {label}
        </Label>
      )}
      <MultipleSelector
        commandProps={{
          label: placeholder || 'Select...'
        }}
        value={options.filter(option => selected?.includes(option.value))}
        defaultOptions={options}
        placeholder={placeholder}
        inputProps={{
          className:
            'pl-1 pr-2 py-0 placeholder:text-(--foreground) focus:bg-background rounded-md relative pointer-events-auto'
        }}
        maxSelected={1}
        className="pointer-events-auto flex min-h-[32px] bg-background shadow-xs hover:text-accent-foreground overflow-hidden rounded-md border border-input p-0.5"
        innerLabel={innerLabel}
        onChange={onChange}
        badgeClassName="h-6.5"
      />
    </div>
  )
}

export default MultiSelect
