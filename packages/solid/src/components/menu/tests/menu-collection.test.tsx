import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Collection } from '../examples/collection.tsx'

const highlighted = () => document.querySelector('[data-highlighted]')?.textContent

describe('Menu / Collection', () => {
  it('navigates the items in the order they render', async () => {
    render(() => <Collection />)
    await user.click(screen.getByRole('button', { name: 'File' }))
    await screen.findByRole('menuitem', { name: 'New file' })
    const rendered = Array.from(document.querySelectorAll('[role^="menuitem"]'), (item) => item.textContent)

    const visited: (string | null | undefined)[] = []
    for (const _ of rendered) {
      await user.keyboard('{ArrowDown}')
      visited.push(highlighted())
    }

    expect(visited).toEqual(rendered)
  })

  it('renders checkbox and radio items from the item type and updates their state', async () => {
    render(() => <Collection />)
    await user.click(screen.getByRole('button', { name: 'File' }))
    await screen.findByRole('menuitem', { name: 'New file' })

    expect(screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' })).toBeChecked()
    expect(screen.getByRole('menuitemradio', { name: 'Date modified' })).toBeChecked()

    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Show status bar' }))
    await waitFor(() => expect(screen.getByRole('menuitemcheckbox', { name: 'Show status bar' })).toBeChecked())

    await user.click(screen.getByRole('menuitemradio', { name: 'Name' }))
    await user.click(screen.getByRole('button', { name: 'File' }))
    await waitFor(() => expect(screen.getByRole('menuitemradio', { name: 'Name' })).toBeChecked())
  })
})
