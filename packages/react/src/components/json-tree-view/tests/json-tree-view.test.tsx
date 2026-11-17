import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { JsonTreeView, useJsonTreeView } from '../index.ts'

const getBranch = (index: number) => document.querySelectorAll<HTMLElement>('[data-part="branch"]')[index]
const getBranchControl = (index: number) => getBranch(index).querySelector<HTMLElement>('[data-part="branch-control"]')!

const Basic = (props: Omit<JsonTreeView.RootProps, 'children'>) => (
  <JsonTreeView.Root {...props}>
    <JsonTreeView.Tree />
  </JsonTreeView.Root>
)

const Controlled = (props: { data: object }) => {
  const [data, setData] = useState(props.data)
  const [expandedValue, setExpandedValue] = useState<string[]>([])
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  return (
    <>
      <JsonTreeView.Root
        data={data}
        expandedValue={expandedValue}
        onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
        selectedValue={selectedValue}
        onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
      >
        <JsonTreeView.Tree />
      </JsonTreeView.Root>
      <output data-testid="expanded">{expandedValue.length}</output>
      <output data-testid="selected">{selectedValue.length}</output>
      <button type="button" onClick={() => setExpandedValue([])}>
        collapse
      </button>
      <button type="button" onClick={() => setData({ replaced: true })}>
        replace
      </button>
    </>
  )
}

const RootProvider = () => {
  const [data, setData] = useState<object>({ original: 1 })
  const jsonTreeView = useJsonTreeView({ data })
  return (
    <>
      <JsonTreeView.RootProvider value={jsonTreeView}>
        <JsonTreeView.Tree />
      </JsonTreeView.RootProvider>
      <button type="button" onClick={() => setData({ replaced: true })}>
        replace
      </button>
    </>
  )
}

describe('JsonTreeView', () => {
  it('should render the data', () => {
    render(<Basic data={{ name: 'ark' }} />)
    expect(screen.getByRole('tree')).toHaveTextContent('name')
  })

  it('should expand a branch on click', async () => {
    render(<Basic data={{ user: { name: 'ark' } }} />)
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(getBranchControl(0))
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
  })

  it('should expand branches up to defaultExpandedDepth', () => {
    render(<Basic data={{ user: { name: 'ark' } }} defaultExpandedDepth={1} />)
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')
    expect(getBranch(1)).toHaveAttribute('aria-expanded', 'false')
  })

  it('should sync controlled expandedValue in both directions', async () => {
    render(<Controlled data={{ user: { name: 'ark' } }} />)
    await userEvent.click(getBranchControl(0))
    expect(screen.getByTestId('expanded')).toHaveTextContent('1')
    expect(getBranch(0)).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'collapse' }))
    await waitFor(() => expect(getBranch(0)).toHaveAttribute('aria-expanded', 'false'))
  })

  it('should sync controlled selectedValue', async () => {
    render(<Controlled data={{ user: { name: 'ark' } }} />)
    await userEvent.click(getBranchControl(0))
    expect(screen.getByTestId('selected')).toHaveTextContent('1')
  })

  it('should update when data changes', async () => {
    render(<Controlled data={{ original: 1 }} />)
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await userEvent.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
    expect(screen.getByRole('tree')).not.toHaveTextContent('original')
  })

  it('should update useJsonTreeView when data changes', async () => {
    render(<RootProvider />)
    expect(screen.getByRole('tree')).toHaveTextContent('original')
    await userEvent.click(screen.getByRole('button', { name: 'replace' }))
    await waitFor(() => expect(screen.getByRole('tree')).toHaveTextContent('replaced'))
  })
})
