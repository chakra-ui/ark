import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import { getParts } from '../setup-test'
import { SegmentGroup, type SegmentGroupProps } from './'

const options = [
  { id: 'apple', label: 'Apples' },
  { id: 'orange', label: 'Oranges' },
  { id: 'mango', label: 'Mangoes', disabled: true },
  { id: 'grape', label: 'Grapes' },
]

const ComponentUnderTest = (props: SegmentGroupProps) => (
  <SegmentGroup.Root {...props}>
    <SegmentGroup.Label>Fruits</SegmentGroup.Label>
    <SegmentGroup.Indicator />
    <For each={options}>
      {(option) => (
        <SegmentGroup.Item value={option.id} disabled={option.disabled}>
          <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      )}
    </For>
  </SegmentGroup.Root>
)

describe('Segment Group', () => {
  it.each(getParts(segmentGroupAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Grapes'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()

    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByLabelText('Mangoes'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
