import Select from '@/components/select/Select'
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
}) => {
  return (
    <Select
      label="Energy"
      innerLabel="Filter by Energy"
      nullable={true}
      onSelect={selectedOption => {
        if (!selectedOption) {
          return onChange({label: 'All energies', value: null})
        }
        const {label, value} = selectedOption
        onChange({
          label,
          value: value === selected ? null : (value as Energy)
        })
      }}
      options={options.map(option => ({
        icon: getEnergyIcon(option),
        label: energy[option],
        value: option
      }))}
      placeholder="All energies"
      selected={selected ?? undefined}
    />
  )
}

export default EnergyFilter
