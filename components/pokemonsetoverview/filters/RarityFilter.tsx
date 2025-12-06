import MultiSelect from '@/components/select/MultiSelect'
import {getRarityIcon, Rarity, rarity} from '@/consts/rarity'

type RarityFilterProps = {
  options: Rarity[]
  onChange: (options: {label: string; value: Rarity | null}) => void
  selected: Rarity | null
}

const RarityFilter: React.FC<RarityFilterProps> = ({
  options,
  onChange,
  selected
}) =>
  options.length > 0 ? (
    <MultiSelect
      label="Rarity"
      innerLabel="Filter by Rarity"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== selected)[0] || null
        onChange({
          label: selectedOption?.label || 'Any rarity',
          value: selectedOption?.value
            ? selectedOption.value === selected
              ? null
              : (selectedOption.value as Rarity)
            : null
        })
      }}
      options={options.map(option => ({
        icon: getRarityIcon(option),
        label: `${rarity[option]}`,
        value: `${option}`
      }))}
      placeholder="Any Rarity"
      selected={selected !== null ? [selected] : undefined}
    />
  ) : null

export default RarityFilter
