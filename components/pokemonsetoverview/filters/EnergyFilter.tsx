import MultiSelect from '@/components/select/MultiSelect'
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
    <>
      <Select
        label="Energy"
        innerLabel="Filter by Energy"
        nullable={true}
        onSelect={selectedOption => {
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
        selected={selected ?? undefined}
      />
      <MultiSelect
        innerLabel="Filter by Energy"
        label="Energy"
        // onSelect={selectedOption => {
        //   onChange({
        //     label: selectedOption?.label || 'All energies',
        //     value: selectedOption?.value
        //       ? selectedOption.value === selected
        //         ? null
        //         : (selectedOption.value as Energy)
        //       : null
        //   })
        // }}
        onChange={selectedOptions => {
          // For simplicity, just take the first selected option or null
          const firstOption = selectedOptions[0] || null
          onChange({
            label: firstOption?.label || 'All energies',
            value: firstOption?.value
              ? firstOption.value === selected
                ? null
                : (firstOption.value as Energy)
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
    </>
  )
}

export default EnergyFilter
