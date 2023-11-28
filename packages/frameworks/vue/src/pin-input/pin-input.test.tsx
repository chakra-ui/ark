import user from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import { nextTick } from 'vue'
import { PinInput, PinInputControl, PinInputInput, PinInputLabel, type PinInputProps } from '.'

const Component = (props: PinInputProps) => (
  <PinInput {...props}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id, index) => (
        <PinInputInput key={id} index={index} />
      ))}
    </PinInputControl>
  </PinInput>
)

type RenderFuncParams = Parameters<typeof render>

async function renderOnNextTick(TestComponent: RenderFuncParams[0], options?: RenderFuncParams[1]) {
  const renderReturnOptions = render(TestComponent, options)

  await nextTick()

  return renderReturnOptions
}

describe('PinInput', () => {
  it('should render', async () => {
    await renderOnNextTick(Component)
  })
  it('should have the proper aria labels!', async () => {
    const { queryAllByLabelText } = await renderOnNextTick(Component)
    expect(queryAllByLabelText('pin code 1 of 3')).toHaveLength(1)
    expect(queryAllByLabelText('pin code 2 of 3')).toHaveLength(1)
    expect(queryAllByLabelText('pin code 3 of 3')).toHaveLength(1)
  })
  it('should autoFocus the first input', async () => {
    const { getByLabelText } = await renderOnNextTick(Component, { props: { autoFocus: true } })
    await waitFor(() => expect(getByLabelText('pin code 1 of 3')).toHaveFocus())
  })
  it('should move focus to the next item when entering a value', async () => {
    const { getByLabelText } = await renderOnNextTick(Component)
    await user.type(getByLabelText('pin code 1 of 3'), '1')
    await waitFor(() => expect(getByLabelText('pin code 2 of 3')).toHaveFocus())
    await user.type(getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(getByLabelText('pin code 3 of 3')).toHaveFocus())
  })
  it('should clear the previous input when pressing backspace', async () => {
    const { getByLabelText } = await renderOnNextTick(Component)
    await user.type(getByLabelText('pin code 1 of 3'), '1')
    await user.type(getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(getByLabelText('pin code 3 of 3')).toHaveFocus())
    fireEvent.keyDown(getByLabelText('pin code 3 of 3'), { key: 'Backspace' })
    await waitFor(() => expect(getByLabelText('pin code 2 of 3')).toHaveFocus())
    expect(getByLabelText('pin code 2 of 3')).toHaveValue('')
  })
  it('should invoke onValueComplete when all inputs are filled out', async () => {
    const onValueComplete = vi.fn()
    const { getByLabelText } = await renderOnNextTick(Component, { props: { onValueComplete } })
    await user.type(getByLabelText('pin code 1 of 3'), '1')
    await user.type(getByLabelText('pin code 2 of 3'), '2')
    await user.type(getByLabelText('pin code 3 of 3'), '3')
    expect(onValueComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' })
  })
  it('should set one-time-code for autocomplete on fields', async () => {
    const { getByLabelText } = await renderOnNextTick(Component, { props: { otp: true } })
    expect(getByLabelText('pin code 1 of 3')).toHaveAttribute('autocomplete', 'one-time-code')
    expect(getByLabelText('pin code 2 of 3')).toHaveAttribute('autocomplete', 'one-time-code')
    expect(getByLabelText('pin code 3 of 3')).toHaveAttribute('autocomplete', 'one-time-code')
  })
  it('should replace last input calls onValueComplete correctly', async () => {
    const onValueComplete = vi.fn()
    const { getByLabelText } = await renderOnNextTick(Component, { props: { onValueComplete } })
    const input1 = getByLabelText('pin code 1 of 3')
    const input2 = getByLabelText('pin code 2 of 3')
    const input3 = getByLabelText('pin code 3 of 3')
    await user.type(input1, '1')
    await user.type(input2, '2')
    await user.type(input3, '3')
    await waitFor(() =>
      expect(onValueComplete).toHaveBeenCalledWith({
        value: ['1', '2', '3'],
        valueAsString: '123',
      }),
    )
    onValueComplete.mockClear()
    await user.type(input3, '{selectall}{backspace}')
    await waitFor(() => expect(input3).toHaveValue(''))
    await user.type(input3, '3')
    await waitFor(() =>
      expect(onValueComplete).toHaveBeenCalledWith({
        value: ['1', '2', '3'],
        valueAsString: '123',
      }),
    )
  })
})
