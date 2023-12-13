import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import { getExports, getParts } from '../setup-test'
import { SegmentGroup, type SegmentGroupProps } from './'

const ComponentUnderTest = (props: SegmentGroupProps) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <SegmentGroup.Root {...props}>
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator />
      <For each={items}>
        {(item) => (
          <SegmentGroup.Item value={item.value} disabled={item.disabled}>
            <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  )
}

describe('Segment Group', () => {
  it.each(getParts(segmentGroupAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(segmentGroupAnatomy))('should export %s', async (part) => {
    expect(SegmentGroup[part]).toBeDefined()
  })

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Solid'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'solid' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()

    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Svelte'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
