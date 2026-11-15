import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './date-input-bindable.test.svelte'

const getYear = () => screen.getByRole('spinbutton', { name: /year/i })

describe('DateInput / bindable', () => {
  it('should use the bound placeholderValue', async () => {
    render(ComponentUnderTest)
    getYear().focus()
    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(getYear()).toHaveTextContent('2030'))
  })

  it('should sync when the bound placeholderValue changes', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'change' }))
    getYear().focus()
    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(getYear()).toHaveTextContent('2040'))
  })
})
