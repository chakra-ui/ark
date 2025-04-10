import { SegmentGroup } from '@ark-ui/react/segment-group'
import { useState } from 'react'

export const Conditional = () => {
  const [show, setShow] = useState(false)
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && (
        <SegmentGroup.Root defaultValue="React">
          <SegmentGroup.Indicator
            style={{
              backgroundColor: 'lightblue',
              width: 'var(--width)',
              height: 'var(--height)',
              left: 'var(--left)',
              top: 'var(--top)',
            }}
          />
          {frameworks.map((framework) => (
            <SegmentGroup.Item key={framework} value={framework}>
              <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      )}
    </div>
  )
}
