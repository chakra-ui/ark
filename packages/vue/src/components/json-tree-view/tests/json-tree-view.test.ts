import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import Basic from './basic.test.vue'
import Controlled from './controlled.test.vue'
import RootProvider from './root-provider.test.vue'

const getBranch = (index: number) => document.querySelectorAll<HTMLElement>('[data-part="branch"]')[index]
const getBranchControl = (index: number) => getBranch(index).querySelector<HTMLElement>('[data-part="branch-control"]')!

const renderBasic = (attrs: Record<string, unknown>) => render(Basic, { attrs })

describe('JsonTreeView', () => {
  it('should render the data', () => {
    renderBasic({ data: { name: 'ark' } })
    expect(screen.getByRole('tree')).toHaveTextContent('name')
  })

  it('should expand a branch on click', async () => {
    renderBasic({ data: { user: { name: 'ark' } } })
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(getBranchControl(0))
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
  })

  it('should expand branches up to defaultExpandedDepth', () => {
    renderBasic({ data: { user: { name: 'ark' } }, defaultExpandedDepth: 1 })
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
    expect(getBranch(1)).toHaveAttribute('aria-expanded', 'false')
  })

  it('should emit expandedChange', async () => {
    const onExpandedChange = vi.fn()
    renderBasic({ data: { user: { name: 'ark' } }, onExpandedChange })
    await userEvent.click(getBranchControl(0))
    expect(onExpandedChange).toHaveBeenCalledWith(expect.objectContaining({ expandedValue: [expect.any(String)] }))
  })

  it('should sync v-model:expanded-value in both directions', async () => {
    render(Controlled, { props: { data: { user: { name: 'ark' } } } })
    await userEvent.click(getBranchControl(0))
    expect(screen.getByTestId('expanded')).toHaveTextContent('1')
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'collapse' }))
    await waitFor(() => expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false'))
  })

  it('should sync v-model:selected-value', async () => {
    render(Controlled, { props: { data: { user: { name: 'ark' } } } })
    await userEvent.click(getBranchControl(0))
    expect(screen.getByTestId('selected')).toHaveTextContent('1')
  })

  it('should update when data changes', async () => {
    render(Controlled, { props: { data: { original: 1 } } })
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await userEvent.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
    expect(screen.getByRole('tree')).not.toHaveTextContent('original')
  })

  it('should update useJsonTreeView when data changes', async () => {
    render(RootProvider)
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await userEvent.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
  })
})
