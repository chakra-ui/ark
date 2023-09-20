import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { getParts } from '../setup-test'
import { SegmentGroup, type SegmentGroupProps } from './'

const ComponentUnderTest = (props: SegmentGroupProps) => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root {...props}>
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework} disabled={framework === 'Svelte'}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}
describe('Segment Group', () => {
  it.each(getParts(segmentGroupAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText('Solid'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'Solid' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText('Svelte'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
