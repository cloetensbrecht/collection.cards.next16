import {Label} from '@/components/ui/label'
import type {Option} from '@/components/ui/multi-select'
import MultipleSelector from '@/components/ui/multi-select'
import Grass from '@/icons/pokemon/energies/Grass'

const categories: Option[] = [
  {
    icon: Grass,
    value: 'grass',
    label: 'Grass'
  },
  {
    icon: Grass,
    value: 'footwear',
    label: 'Footwear'
  },
  {
    icon: Grass,
    value: 'accessories',
    label: 'Accessories'
  }
]

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
      className="w-full max-w-xs space-y-2"
      style={{'--radius': '8px'} as React.CSSProperties}
    >
      {label && (
        <Label
          id="energy-label"
          htmlFor="energy"
          className="hidden mb-0 font-normal text-xs whitespace-nowrap text-muted-foreground xl:inline-block"
        >
          {label}
        </Label>
      )}
      <MultipleSelector
        commandProps={{
          label: 'All energies'
        }}
        value={options.filter(option => selected?.includes(option.value))}
        defaultOptions={options}
        placeholder={placeholder}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        className="w-full"
        innerLabel={innerLabel}
        onChange={onChange}
      />
    </div>
  )
}

export default MultiSelect
