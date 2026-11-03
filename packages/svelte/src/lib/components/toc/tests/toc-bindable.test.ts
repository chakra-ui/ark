import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './toc-bindable.test.svelte'

describe('Toc / bindable', () => {
  // TODO: unskip once @zag-js/toc ships past 2.0.0-next.3 (setActiveIds reports the stale controlled activeIds)
  it.skip('should write back bind:activeIds', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button', { name: 'activate' }))
    await waitFor(() => expect(screen.getByTestId('active')).toHaveTextContent('usage'))
  })
})
