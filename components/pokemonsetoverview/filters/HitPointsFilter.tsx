import Select from '@/components/select/Select'

type HitPointsFilterProps = {
  options: number[]
  onChange: (options: {label: string; value: number | null}) => void
  selected: number | null
}

const HitPointsFilter: React.FC<HitPointsFilterProps> = ({
  options,
  onChange,
  selected
}) => {
  return (
    <Select
      label="Hit Points"
      innerLabel="Filter by Hit Points"
      onSelect={({label, value}) =>
        onChange({
          label,
          value: Number(value) === selected ? null : Number(value)
        })
      }
      options={options.map(option => ({
        label: `${option} HP`,
        value: `${option}`
      }))}
      placeholder="Any Hit Points"
      selected={selected !== null ? `${selected}` : undefined}
    />
  )
}

export default HitPointsFilter
