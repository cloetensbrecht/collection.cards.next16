import MultiSelect from '@/components/select/MultiSelect'
import {Energy, energy, getEnergyIcon} from '@/consts/energy'

type EnergyFilterProps = {
  options: Energy[]
  onChange: (options: {label: string; value: Energy | null}) => void
  selected: Energy | null
}

const EnergyFilter: React.FC<EnergyFilterProps> = ({
  options,
  onChange,
  selected
}) =>
  options.length > 1 ? (
    <MultiSelect
      innerLabel="Filter by Energy"
      label="Energy"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== selected)[0] || null
        onChange({
          label: selectedOption?.label || 'All energies',
          value: selectedOption?.value
            ? selectedOption.value === selected
              ? null
              : (selectedOption.value as Energy)
            : null
        })
      }}
      options={options.map(option => ({
        icon: getEnergyIcon(option),
        label: energy[option],
        value: option
      }))}
      placeholder="All energies"
      selected={selected ? [selected] : undefined}
    />
  ) : null

export default EnergyFilter
