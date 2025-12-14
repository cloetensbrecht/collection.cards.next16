import MultiSelect from '@/components/select/MultiSelect'
import {cardType, CardType} from '@/consts/cardtype'

type TypeFilterProps = {
  options: CardType[]
  onChange: (options: {label: string; value: CardType | null}) => void
  selected: CardType | null
}

const TypeFilter: React.FC<TypeFilterProps> = ({options, onChange, selected}) =>
  options.length > 1 ? (
    <MultiSelect
      innerLabel="Filter by Type"
      label="Type"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== selected)[0] || null
        onChange({
          label: selectedOption?.label || 'All types',
          value: selectedOption?.value
            ? selectedOption.value === selected
              ? null
              : (selectedOption.value as CardType)
            : null
        })
      }}
      options={options.map(option => ({
        label: cardType[option],
        value: option
      }))}
      placeholder="All types"
      selected={selected ? [selected] : undefined}
    />
  ) : null

export default TypeFilter
