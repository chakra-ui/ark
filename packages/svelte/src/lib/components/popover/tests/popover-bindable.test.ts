import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './popover-bindable.test.svelte'

describe('Popover / bindable', () => {
  it('should write back bind:triggerValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Second'))
    await waitFor(() => expect(screen.getByTestId('trigger')).toHaveTextContent('second'))
  })
})
