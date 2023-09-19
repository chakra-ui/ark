import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { SegmentGroup, type SegmentGroupProps } from './'

const ComponentUnderTest = (props: SegmentGroupProps) => {
  const frameworks = ['React', 'Solid', 'Vue']
  return (
    <SegmentGroup.Root {...props}>
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}
describe('Segment Group', () => {
  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText('Grapes'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'grape' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText('Mangoes'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
