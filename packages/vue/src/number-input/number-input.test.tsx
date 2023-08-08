import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { NumberInput, type NumberInputProps } from '.'

const Component = (props: NumberInputProps) => (
  <NumberInput.Root {...props}>
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>
        <button>-1</button>
      </NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>
        <button>+1</button>
      </NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
)

describe('NumberInput', () => {
  it('should render', () => {
    render(Component)
  })

  it('should increment on increment button click', async () => {
    const { getByRole } = render(Component)

    const input = getByRole('spinbutton')
    const incButton = getByRole('button', {
      name: /inc/i,
    })
    await user.click(incButton)

    expect(input).toHaveValue('1')
    await user.click(incButton)
    expect(input).toHaveValue('2')
  })

  it('should decrement on decrement button click', async () => {
    const { getByRole } = render(Component)

    const input = getByRole('spinbutton')
    const decButton = getByRole('button', {
      name: /dec/i,
    })
    await user.click(decButton)

    expect(input).toHaveValue('-1')
    await user.click(decButton)
    expect(input).toHaveValue('-2')
  })

  it('should call onChange on value change', async () => {
    const onChange = vi.fn()

    const { getByRole } = render(Component, {
      props: {
        onChange,
      },
    })

    await user.click(
      getByRole('button', {
        name: /inc/i,
      }),
    )
    expect(onChange).toBeCalledWith({ value: '1', valueAsNumber: 1 })
  })

  it('should clamp value on blur', async () => {
    const { getByRole } = render(Component, {
      props: {
        max: 30,
      },
    })

    const input = getByRole('spinbutton')
    await user.type(input, '35')
    await user.tab()

    expect(input).toHaveValue('30')
  })
})
