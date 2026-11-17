import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './drawer-bindable.test.svelte'

describe('Drawer / bindable', () => {
  it('should write back bind:triggerValue', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText('Second'))
    await waitFor(() => expect(screen.getByTestId('trigger')).toHaveTextContent('second'))
  })

  it('should write back bind:snapPoint', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'snap' }))
    await waitFor(() => expect(screen.getByTestId('snap-point')).toHaveTextContent('1'))
  })
})
