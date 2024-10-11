import { SegmentGroup } from '@ark-ui/react/segment-group'
import { useState } from 'react'

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const [value, setValue] = useState('React')
  return (
    <SegmentGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}
