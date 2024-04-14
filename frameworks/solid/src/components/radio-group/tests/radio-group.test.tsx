import { radioGroupAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { RadioGroup } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Radio Group', () => {
  it.each(getParts(radioGroupAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(radioGroupAnatomy))('should export %s', async (part) => {
    expect(RadioGroup[part]).toBeDefined()
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
