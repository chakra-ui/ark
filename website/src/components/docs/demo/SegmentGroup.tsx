import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentLabel,
} from '@ark-ui/react'
import { segmentGroup } from 'panda/recipes/segment-group'

const options = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'svelte', label: 'Svelte', disabled: true },
  { id: 'vue', label: 'Vue' },
]

export const DemoSegmentGroup = () => {
  return (
    <SegmentGroup className={segmentGroup()} defaultValue="react" orientation="horizontal">
      <SegmentGroupIndicator />
      {options.map((option, id) => (
        <Segment key={id} value={option.id} disabled={option.disabled}>
          <SegmentControl />
          <SegmentLabel>{option.label}</SegmentLabel>
        </Segment>
      ))}
    </SegmentGroup>
  )
}
