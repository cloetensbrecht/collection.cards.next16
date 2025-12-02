import Select from '@/components/select/Select'
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
}) => {
  return (
    <Select
      label="Rarity"
      innerLabel="Filter by Rarity"
      onSelect={({label, value}) =>
        onChange({
          label,
          value: value === selected ? null : (value as Rarity)
        })
      }
      options={options.map(option => ({
        icon: getRarityIcon(option),
        label: `${rarity[option]}`,
        value: `${option}`
      }))}
      placeholder="Any Rarity"
      selected={selected !== null ? `${selected}` : undefined}
    />
  )
}

export default RarityFilter
