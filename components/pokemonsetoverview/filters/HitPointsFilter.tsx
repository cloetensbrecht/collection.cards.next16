import MultiSelect from '@/components/select/MultiSelect'

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
    <MultiSelect
      label="Hit Points"
      innerLabel="Filter by Hit Points"
      onChange={selectedOptions => {
        const selectedOption =
          selectedOptions.filter(o => o.value !== `${selected}`)[0] || null
        onChange({
          label: selectedOption?.label || 'Any Hit Points',
          value: selectedOption?.value
            ? Number(selectedOption.value) === selected
              ? null
              : Number(selectedOption.value)
            : null
        })
      }}
      options={options.map(option => ({
        label: `${option} HP`,
        value: `${option}`
      }))}
      placeholder="Any Hit Points"
      selected={selected !== null ? [`${selected}`] : undefined}
    />
  )
}

export default HitPointsFilter
