import { act, render, screen, waitFor, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { AsyncLoading } from '../examples/async-loading.tsx'
import { Basic } from '../examples/basic.tsx'
import { CheckboxTree } from '../examples/checkbox-tree.tsx'
import { DisabledNode } from '../examples/disabled-node.tsx'
import { ExpandCollapseAll } from '../examples/expand-collapse-all.tsx'
import { Filtering } from '../examples/filtering.tsx'
import { LazyMount } from '../examples/lazy-mount.tsx'
import { Links } from '../examples/links.tsx'
import { Mutation } from '../examples/mutation.tsx'
import { RenameNode } from '../examples/rename-node.tsx'
import { ComponentUnderTest } from './basic.tsx'

const row = (name: string) => screen.getByRole('row', { name })
const queryRow = (name: string | RegExp) => screen.queryByRole('row', { name })

describe('TreeView', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<Basic />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render a treegrid labelled by its label', () => {
    render(<ComponentUnderTest />)

    expect(screen.getByRole('treegrid', { name: 'Tree' })).toBeInTheDocument()
    expect(row('README.md')).toBeVisible()
    expect(row('src')).toBeVisible()
  })

  it('should expose level, position and set size on rows', async () => {
    render(<ComponentUnderTest />)

    expect(row('README.md')).toHaveAttribute('aria-level', '1')
    expect(row('README.md')).toHaveAttribute('aria-posinset', '6')
    expect(row('README.md')).toHaveAttribute('aria-setsize', '6')

    await user.click(row('src'))

    expect(await screen.findByRole('row', { name: 'app.tsx' })).toHaveAttribute('aria-level', '2')
    expect(row('index.ts')).toHaveAttribute('aria-posinset', '2')
    expect(row('index.ts')).toHaveAttribute('aria-setsize', '2')
  })

  it('should render branches collapsed with their children hidden', () => {
    render(<ComponentUnderTest />)

    expect(row('src')).toHaveAttribute('aria-expanded', 'false')
    expect(row('README.md')).not.toHaveAttribute('aria-expanded')
    expect(screen.getByText('app.tsx')).not.toBeVisible()
    expect(queryRow('app.tsx')).not.toBeInTheDocument()
  })

  it('should select a leaf on click', async () => {
    render(<ComponentUnderTest />)

    await user.click(row('package.json'))

    await waitFor(() => expect(row('package.json')).toHaveAttribute('aria-selected', 'true'))
    expect(row('README.md')).not.toHaveAttribute('aria-selected', 'true')
  })

  it('should expand and select a branch on click', async () => {
    render(<ComponentUnderTest />)

    await user.click(row('src'))

    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('src')).toHaveAttribute('aria-selected', 'true')
    expect(within(screen.getByRole('group')).getByRole('row', { name: 'app.tsx' })).toBeVisible()
  })

  it('should collapse an expanded branch on click', async () => {
    render(<ComponentUnderTest />)

    await user.click(row('src'))
    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'true'))

    await user.click(row('src'))

    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'false'))
    expect(screen.getByText('app.tsx')).not.toBeVisible()
  })

  it('should toggle a branch from the expand trigger without selecting it', async () => {
    render(<ComponentUnderTest />)

    await user.click(within(row('src')).getByRole('button', { hidden: true }))

    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('src')).not.toHaveAttribute('aria-selected', 'true')
  })

  it('should select a branch without expanding it when expandOnClick is false', async () => {
    render(<ComponentUnderTest expandOnClick={false} />)

    await user.click(row('src'))

    await waitFor(() => expect(row('src')).toHaveAttribute('aria-selected', 'true'))
    expect(row('src')).toHaveAttribute('aria-expanded', 'false')
  })

  it('should move focus with ArrowDown and ArrowUp', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    expect(row('node_modules')).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(row('src')).toHaveFocus())

    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(row('panda.config.ts')).toHaveFocus())

    await user.keyboard('{ArrowUp}')
    await waitFor(() => expect(row('src')).toHaveFocus())
  })

  it('should expand with ArrowRight and collapse with ArrowLeft', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(row('src')).toHaveFocus())

    await user.keyboard('{ArrowRight}')
    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('src')).toHaveFocus()

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => expect(row('src')).toHaveAttribute('aria-expanded', 'false'))
  })

  it('should move into children with ArrowDown and back to the parent with ArrowLeft', async () => {
    render(<ComponentUnderTest defaultExpandedValue={['src']} />)

    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    await waitFor(() => expect(row('app.tsx')).toHaveFocus())

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => expect(row('src')).toHaveFocus())
    expect(row('src')).toHaveAttribute('aria-expanded', 'true')
  })

  it('should move focus to the first and last visible rows with Home and End', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    await user.keyboard('{End}')
    await waitFor(() => expect(row('README.md')).toHaveFocus())

    await user.keyboard('{Home}')
    await waitFor(() => expect(row('node_modules')).toHaveFocus())
  })

  it('should select the focused row with Enter and Space', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    await user.keyboard('{End}')
    await waitFor(() => expect(row('README.md')).toHaveFocus())

    await user.keyboard('{Enter}')
    await waitFor(() => expect(row('README.md')).toHaveAttribute('aria-selected', 'true'))

    await user.keyboard('{ArrowUp}')
    await waitFor(() => expect(row('package.json')).toHaveFocus())

    await user.keyboard(' ')
    await waitFor(() => expect(row('package.json')).toHaveAttribute('aria-selected', 'true'))
    expect(row('README.md')).not.toHaveAttribute('aria-selected', 'true')
  })

  it('should expand all sibling branches with *', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    await user.keyboard('*')

    await waitFor(() => expect(row('node_modules')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('src')).toHaveAttribute('aria-expanded', 'true')
    expect(row('@types')).toHaveAttribute('aria-expanded', 'false')
  })

  it('should focus the matching row on typeahead', async () => {
    render(<ComponentUnderTest />)

    await user.tab()
    await user.keyboard('p')

    await waitFor(() => expect(row('panda.config.ts')).toHaveFocus())
  })

  it('should toggle rows with Ctrl+click in multiple selection mode', async () => {
    const user$ = user.setup()
    render(<ComponentUnderTest selectionMode="multiple" />)

    expect(screen.getByRole('treegrid')).toHaveAttribute('aria-multiselectable', 'true')

    await user$.click(row('panda.config.ts'))
    await user$.keyboard('{Control>}')
    await user$.click(row('README.md'))

    await waitFor(() => expect(row('README.md')).toHaveAttribute('aria-selected', 'true'))
    expect(row('panda.config.ts')).toHaveAttribute('aria-selected', 'true')

    await user$.click(row('panda.config.ts'))
    await user$.keyboard('{/Control}')

    await waitFor(() => expect(row('panda.config.ts')).toHaveAttribute('aria-selected', 'false'))
    expect(row('README.md')).toHaveAttribute('aria-selected', 'true')
  })

  it('should select a range with Shift+click in multiple selection mode', async () => {
    const user$ = user.setup()
    render(<ComponentUnderTest selectionMode="multiple" />)

    await user$.click(row('panda.config.ts'))
    await user$.keyboard('{Shift>}')
    await user$.click(row('README.md'))
    await user$.keyboard('{/Shift}')

    await waitFor(() => expect(row('README.md')).toHaveAttribute('aria-selected', 'true'))
    expect(row('panda.config.ts')).toHaveAttribute('aria-selected', 'true')
    expect(row('package.json')).toHaveAttribute('aria-selected', 'true')
    expect(row('src')).toHaveAttribute('aria-selected', 'false')
  })

  it('should extend the selection with Shift+ArrowDown in multiple selection mode', async () => {
    render(<ComponentUnderTest selectionMode="multiple" />)

    await user.click(row('panda.config.ts'))
    await user.keyboard('{Shift>}{ArrowDown}{/Shift}')

    await waitFor(() => expect(row('package.json')).toHaveAttribute('aria-selected', 'true'))
    expect(row('package.json')).toHaveFocus()
    expect(row('panda.config.ts')).toHaveAttribute('aria-selected', 'true')
  })

  it('should keep a single selection with Ctrl+click in single selection mode', async () => {
    const user$ = user.setup()
    render(<ComponentUnderTest />)

    expect(screen.getByRole('treegrid')).not.toHaveAttribute('aria-multiselectable')

    await user$.click(row('panda.config.ts'))
    await user$.keyboard('{Control>}')
    await user$.click(row('README.md'))
    await user$.keyboard('{/Control}')

    await waitFor(() => expect(row('README.md')).toHaveAttribute('aria-selected', 'true'))
    expect(row('panda.config.ts')).toHaveAttribute('aria-selected', 'false')
  })

  it('should apply default expanded and selected values', () => {
    render(
      <ComponentUnderTest defaultExpandedValue={['node_modules']} defaultSelectedValue={['node_modules/zag-js']} />,
    )

    expect(row('node_modules')).toHaveAttribute('aria-expanded', 'true')
    expect(row('zag-js')).toBeVisible()
    expect(row('zag-js')).toHaveAttribute('aria-selected', 'true')
  })

  it('should call onSelectionChange and onExpandedChange', async () => {
    const onSelectionChange = vi.fn()
    const onExpandedChange = vi.fn()
    render(<ComponentUnderTest onSelectionChange={onSelectionChange} onExpandedChange={onExpandedChange} />)

    await user.click(row('src'))

    await waitFor(() =>
      expect(onSelectionChange).toHaveBeenCalledWith(expect.objectContaining({ selectedValue: ['src'] })),
    )
    expect(onExpandedChange).toHaveBeenCalledWith(expect.objectContaining({ expandedValue: ['src'] }))
  })

  it('should mark disabled nodes and skip them on interaction', async () => {
    render(<DisabledNode />)

    const disabled = row('renovate.json')
    expect(disabled).toHaveAttribute('aria-disabled', 'true')
    expect(disabled).not.toHaveAttribute('aria-selected')

    await user.click(disabled)
    await user.click(row('README.md'))
    await waitFor(() => expect(row('README.md')).toHaveAttribute('aria-selected', 'true'))
    expect(disabled).not.toHaveAttribute('aria-selected')

    await user.keyboard('{ArrowUp}')
    await waitFor(() => expect(row('package.json')).toHaveFocus())
  })

  it('should only change expanded state through expandedValue when controlled', async () => {
    const onExpandedChange = vi.fn()
    const { rerender } = render(<ComponentUnderTest expandedValue={[]} onExpandedChange={onExpandedChange} />)

    await user.click(row('src'))

    await waitFor(() =>
      expect(onExpandedChange).toHaveBeenCalledWith(expect.objectContaining({ expandedValue: ['src'] })),
    )
    expect(row('src')).toHaveAttribute('aria-expanded', 'false')

    rerender(<ComponentUnderTest expandedValue={['node_modules']} onExpandedChange={onExpandedChange} />)

    await waitFor(() => expect(row('node_modules')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('zag-js')).toBeVisible()
  })

  it('should only change selected state through selectedValue when controlled', async () => {
    const onSelectionChange = vi.fn()
    const { rerender } = render(<ComponentUnderTest selectedValue={[]} onSelectionChange={onSelectionChange} />)

    await user.click(row('README.md'))

    await waitFor(() =>
      expect(onSelectionChange).toHaveBeenCalledWith(expect.objectContaining({ selectedValue: ['readme.md'] })),
    )
    expect(row('README.md')).toHaveAttribute('aria-selected', 'false')

    rerender(<ComponentUnderTest selectedValue={['package.json']} onSelectionChange={onSelectionChange} />)

    await waitFor(() => expect(row('package.json')).toHaveAttribute('aria-selected', 'true'))
  })

  it('should expand and collapse all branches', async () => {
    render(<ExpandCollapseAll />)

    await user.click(screen.getByRole('button', { name: 'Expand all' }))

    await waitFor(() => expect(row('@types')).toHaveAttribute('aria-expanded', 'true'))
    expect(row('node_modules')).toHaveAttribute('aria-expanded', 'true')
    expect(row('src')).toHaveAttribute('aria-expanded', 'true')
    expect(row('react-dom')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Collapse all' }))

    await waitFor(() => expect(row('node_modules')).toHaveAttribute('aria-expanded', 'false'))
    expect(row('src')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Expand all' })).toBeInTheDocument()
  })

  it('should propagate checked state through a checkbox tree', async () => {
    render(<CheckboxTree />)

    await user.click(row('src'))
    await waitFor(() => expect(row('app.tsx')).toBeVisible())

    const checkbox = (name: string) => within(row(name)).getByRole('checkbox')

    expect(checkbox('src')).toHaveAttribute('aria-checked', 'false')

    await user.click(checkbox('src'))

    await waitFor(() => expect(checkbox('src')).toHaveAttribute('aria-checked', 'true'))
    expect(checkbox('app.tsx')).toHaveAttribute('aria-checked', 'true')
    expect(checkbox('index.ts')).toHaveAttribute('aria-checked', 'true')

    await user.click(checkbox('app.tsx'))

    await waitFor(() => expect(checkbox('app.tsx')).toHaveAttribute('aria-checked', 'false'))
    expect(checkbox('src')).toHaveAttribute('aria-checked', 'mixed')
    expect(checkbox('index.ts')).toHaveAttribute('aria-checked', 'true')
  })

  it('should toggle the checkbox of the focused row with Space', async () => {
    render(<CheckboxTree />)

    await user.tab()
    await user.keyboard('{End}')
    await waitFor(() => expect(row('README.md')).toHaveFocus())

    await user.keyboard(' ')

    await waitFor(() => expect(within(row('README.md')).getByRole('checkbox')).toHaveAttribute('aria-checked', 'true'))
    expect(row('README.md')).not.toHaveAttribute('aria-selected', 'true')
  })

  it('should lazy mount children and unmount them on collapse', async () => {
    render(<LazyMount />)

    expect(screen.queryByText('zag-js')).not.toBeInTheDocument()

    await user.click(row('node_modules'))
    expect(await screen.findByRole('row', { name: 'zag-js' })).toBeVisible()

    await user.click(row('node_modules'))
    await waitFor(() => expect(screen.queryByText('zag-js')).not.toBeInTheDocument())
  })

  it('should load children asynchronously when a branch expands', async () => {
    render(<AsyncLoading />)

    expect(queryRow('zag-js')).not.toBeInTheDocument()

    await user.click(row('node_modules'))

    await waitFor(() => expect(row('node_modules')).toHaveAttribute('aria-busy', 'true'))
    expect(await screen.findByRole('row', { name: 'zag-js' }, { timeout: 5000 })).toBeVisible()
    expect(row('node_modules')).toHaveAttribute('aria-expanded', 'true')
    expect(row('node_modules')).not.toHaveAttribute('aria-busy')
  })

  it('should filter rows while keeping matching ancestors', async () => {
    render(<Filtering />)

    await user.type(screen.getByPlaceholderText('Search'), 'react')

    await waitFor(() => expect(queryRow('README.md')).not.toBeInTheDocument())
    expect(queryRow('src')).not.toBeInTheDocument()
    expect(row('node_modules')).toBeVisible()

    await user.click(row('node_modules'))
    await user.click(await screen.findByRole('row', { name: '@types' }))

    expect(await screen.findByRole('row', { name: 'react' })).toBeVisible()
    expect(row('react-dom')).toBeVisible()
    expect(queryRow('zag-js')).not.toBeInTheDocument()

    await user.clear(screen.getByPlaceholderText('Search'))
    await waitFor(() => expect(row('README.md')).toBeVisible())
  })

  it('should rename a node with F2 and commit with Enter', async () => {
    render(<RenameNode />)

    await user.tab()
    await user.keyboard('{End}')
    await waitFor(() => expect(row('README.md')).toHaveFocus())

    await user.keyboard('{F2}')

    const input = await screen.findByRole('textbox', { name: 'Rename tree item' })
    await waitFor(() => expect(input).toHaveFocus())
    await waitFor(() => expect(input).toHaveValue('README.md'))

    await user.clear(input)
    await user.type(input, 'NOTES.md{Enter}')

    await waitFor(() => expect(row('NOTES.md')).toHaveFocus())
    expect(queryRow('README.md')).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'Rename tree item' })).not.toBeInTheDocument()
  })

  it('should cancel renaming with Escape', async () => {
    render(<RenameNode />)

    await user.tab()
    await user.keyboard('{End}')
    await waitFor(() => expect(row('README.md')).toHaveFocus())

    await user.keyboard('{F2}')
    const input = await screen.findByRole('textbox', { name: 'Rename tree item' })
    await waitFor(() => expect(input).toHaveFocus())

    await user.type(input, 'draft')
    await user.keyboard('{Escape}')

    await waitFor(() => expect(row('README.md')).toHaveFocus())
    expect(screen.queryByRole('textbox', { name: 'Rename tree item' })).not.toBeInTheDocument()
    expect(queryRow(/draft/)).not.toBeInTheDocument()
  })

  it('should render leaf cells as links', async () => {
    render(<Links />)

    await user.click(row('Documentation'))

    const cell = await screen.findByRole('gridcell', { name: 'Getting Started' })
    expect(cell).toHaveAttribute('href', '/docs/getting-started')
  })

  it('should add and remove nodes', async () => {
    render(<Mutation />)

    await user.click(within(row('package.json')).getByRole('button'))
    await waitFor(() => expect(queryRow('package.json')).not.toBeInTheDocument())

    const [, addButton] = within(row('src')).getAllByRole('button')
    await user.click(addButton as HTMLElement)

    expect(await screen.findByRole('row', { name: 'untitled.tsx' })).toBeVisible()
    expect(row('src')).toHaveAttribute('aria-expanded', 'true')
  })
})
