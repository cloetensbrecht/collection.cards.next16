import Select from '@/components/select/Select'
import {energy} from '@/consts/energy'
import {Dragon} from '@/icons/pokemon/energies/Dragon'
import {Fighting} from '@/icons/pokemon/energies/Fighting'
import {Fire} from '@/icons/pokemon/energies/Fire'
import {Grass} from '@/icons/pokemon/energies/Grass'
import {CopyPlusIcon} from 'lucide-react'

type EnergyKey = keyof typeof energy

type EnergyFilterProps = {
  options: EnergyKey[]
  onChange: (options: {label: string; value: EnergyKey | null}) => void
  selected: EnergyKey | null
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
      onSelect={({label, value}) =>
        onChange({
          label,
          value: value === selected ? null : (value as EnergyKey)
        })
      }
      options={options.map(option => ({
        icon:
          option === 'grass'
            ? Grass
            : option === 'fire'
            ? Fire
            : option === 'fighting'
            ? Fighting
            : option === 'dragon'
            ? Dragon
            : CopyPlusIcon,
        label: energy[option],
        value: option
      }))}
      placeholder="All energies"
      selected={selected ?? undefined}
    />
  )
}

export default EnergyFilter
