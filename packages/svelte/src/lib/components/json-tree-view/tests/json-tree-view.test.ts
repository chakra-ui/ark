import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Basic from './json-tree-view-basic.test.svelte'
import Controlled from './json-tree-view-controlled.test.svelte'
import RootProvider from './json-tree-view-root-provider.test.svelte'

const getBranch = (index: number) => document.querySelectorAll<HTMLElement>('[data-part="branch"]')[index]
const getBranchControl = (index: number) => getBranch(index).querySelector<HTMLElement>('[data-part="branch-control"]')!

describe('JsonTreeView', () => {
  it('should render the data', () => {
    render(Basic, { props: { data: { name: 'ark' } } })
    expect(screen.getByRole('tree')).toHaveTextContent('name')
  })

  it('should expand a branch on click', async () => {
    render(Basic, { props: { data: { user: { name: 'ark' } } } })
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false')
    await user.click(getBranchControl(0))
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
  })

  it('should expand branches up to defaultExpandedDepth', () => {
    render(Basic, { props: { data: { user: { name: 'ark' } }, defaultExpandedDepth: 1 } })
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
    expect(getBranch(1)).toHaveAttribute('aria-expanded', 'false')
  })

  it('should call onExpandedChange', async () => {
    const onExpandedChange = vi.fn()
    render(Basic, { props: { data: { user: { name: 'ark' } }, onExpandedChange } })
    await user.click(getBranchControl(0))
    expect(onExpandedChange).toHaveBeenCalledWith(expect.objectContaining({ expandedValue: [expect.any(String)] }))
  })

  it('should sync bind:expandedValue in both directions', async () => {
    render(Controlled, { props: { data: { user: { name: 'ark' } } } })
    await user.click(getBranchControl(0))
    expect(screen.getByTestId('expanded')).toHaveTextContent('1')
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'collapse' }))
    await waitFor(() => expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false'))
  })

  it('should sync bind:selectedValue', async () => {
    render(Controlled, { props: { data: { user: { name: 'ark' } } } })
    await user.click(getBranchControl(0))
    expect(screen.getByTestId('selected')).toHaveTextContent('1')
  })

  it('should update when data changes', async () => {
    render(Controlled, { props: { data: { original: 1 } } })
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await user.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
    expect(screen.getByRole('tree')).not.toHaveTextContent('original')
  })

  it('should update useJsonTreeView when data changes', async () => {
    render(RootProvider)
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await user.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
  })
})
