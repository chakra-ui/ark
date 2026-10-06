import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import RenameNode from '../examples/rename-node.vue'
import RenameInputTree from './rename-input.test.vue'

describe('TreeView / NodeRenameInput', () => {
  it('should focus the rename input when it is always rendered', async () => {
    render(RenameInputTree)
    await userEvent.click(screen.getByRole('treeitem', { name: 'README.md' }))
    await userEvent.keyboard('{F2}')

    const input = screen.getByRole('textbox', { name: 'File name' })
    await waitFor(() => expect(input).toHaveFocus())
    expect(input).toHaveValue('README.md')
  })

  it('should focus the rename input when it is conditionally rendered', async () => {
    render(RenameNode)
    await userEvent.click(screen.getByRole('treeitem', { name: 'README.md' }))
    await userEvent.keyboard('{F2}')

    const input = await screen.findByRole('textbox')
    await waitFor(() => expect(input).toHaveFocus())
    expect(input).toHaveValue('README.md')
  })

  it('should submit the new name on Enter', async () => {
    render(RenameNode)
    await userEvent.click(screen.getByRole('treeitem', { name: 'README.md' }))
    await userEvent.keyboard('{F2}')

    const input = await screen.findByRole('textbox')
    await waitFor(() => expect(input).toHaveFocus())
    await userEvent.keyboard('CHANGELOG.md{Enter}')

    expect(await screen.findByRole('treeitem', { name: 'CHANGELOG.md' })).toBeVisible()
  })
})
