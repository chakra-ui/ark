import { radioGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { RadioGroup, type RadioGroupProps } from '.'
import { getExports, getParts } from '../setup-test'

const ComponentUnderTest = (props: RadioGroupProps) => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <RadioGroup.Root {...props}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Indicator />
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework} disabled={framework === 'Svelte'}>
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemControl />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

describe('Radio Group', () => {
  it.each(getParts(radioGroupAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(radioGroupAnatomy))('should export %s', async (part) => {
    expect(RadioGroup[part]).toBeDefined()
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
