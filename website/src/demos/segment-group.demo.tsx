import { SegmentGroup } from '~/components/ui'

export const Demo = (props: SegmentGroup.RootProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'svelte', label: 'Svelte', disabled: true },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <SegmentGroup.Root defaultValue="react" orientation="horizontal" {...props}>
      {options.map((option) => (
        <SegmentGroup.Item key={option.id} value={option.id} disabled={Boolean(option.disabled)}>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
      <SegmentGroup.Indicator />
    </SegmentGroup.Root>
  )
}
