import MultiSelect from '@/components/select/MultiSelect'
import {Energy} from '@/consts/energy'

type PokemonFilterProps = {
  options: {
    label: string
    value: string
  }[]
  onChange: (options: {label: string; value: Energy | null}) => void
  selected: string | null
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({
  options,
  onChange,
  selected
}) =>
  options.length > 1 ? (
    <MultiSelect
      innerLabel="Filter by Pokémon"
      label="Pokémon"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== selected)[0] || null
        onChange({
          label: selectedOption?.label || 'All Pokémon',
          value: selectedOption?.value
            ? selectedOption.value === selected
              ? null
              : (selectedOption.value as Energy)
            : null
        })
      }}
      options={options}
      placeholder="All Pokémon"
      selected={selected ? [selected] : undefined}
    />
  ) : null

export default PokemonFilter
