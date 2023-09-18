import { For, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Segment, SegmentControl, SegmentGroup, SegmentGroupIndicator, SegmentLabel } from './'
import './segment-group.css'

const meta: Meta = {
  title: 'SegmentGroup',
}

export default meta

const options = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'vue', label: 'Vue' },
]

export const Basic = () => {
  return (
    <SegmentGroup>
      <SegmentGroupIndicator />
      <For each={options}>
        {(option) => (
          <Segment value={option.id}>
            <SegmentLabel>{option.label}</SegmentLabel>
            <SegmentControl />
          </Segment>
        )}
      </For>
    </SegmentGroup>
  )
}

export const Controlled = () => {
  const [value, setValue] = createSignal('react')
  return (
    <SegmentGroup value={value()} onValueChange={({ value }) => setValue(value)}>
      <SegmentGroupIndicator />
      <For each={options}>
        {(option) => (
          <Segment value={option.id}>
            <SegmentLabel>{option.label}</SegmentLabel>
            <SegmentControl />
          </Segment>
        )}
      </For>
    </SegmentGroup>
  )
}

export const Disabled = () => {
  const [value, setValue] = createSignal('react')
  return (
    <SegmentGroup value={value()} onValueChange={({ value }) => setValue(value)}>
      <SegmentGroupIndicator />
      <For each={options}>
        {(option) => (
          <Segment value={option.id} disabled={option.id === 'svelte'}>
            <SegmentLabel>{option.label}</SegmentLabel>
            <SegmentControl />
          </Segment>
        )}
      </For>
    </SegmentGroup>
  )
}
