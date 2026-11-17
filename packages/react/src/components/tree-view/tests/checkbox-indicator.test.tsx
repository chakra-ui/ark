import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TreeView, createTreeCollection } from '../index.ts'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/a', name: 'a' },
          { id: 'src/b', name: 'b' },
        ],
      },
    ],
  },
})

const NodeCheckbox = (props: { id: string }) => (
  <TreeView.NodeCheckbox data-testid={`checkbox-${props.id}`}>
    <TreeView.NodeCheckboxIndicator indeterminate="partial" fallback="empty">
      checked
    </TreeView.NodeCheckboxIndicator>
  </TreeView.NodeCheckbox>
)

const CheckboxTree = () => (
  <TreeView.Root collection={collection} defaultExpandedValue={['src']} defaultCheckedValue={[]}>
    <TreeView.Tree>
      <TreeView.NodeProvider node={collection.rootNode.children![0]} indexPath={[0]}>
        <TreeView.Branch>
          <TreeView.BranchControl>
            <NodeCheckbox id="src" />
            <TreeView.BranchText>src</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            {collection.rootNode.children![0].children!.map((child, index) => (
              <TreeView.NodeProvider key={child.id} node={child} indexPath={[0, index]}>
                <TreeView.Item>
                  <NodeCheckbox id={child.id} />
                  <TreeView.ItemText>{child.name}</TreeView.ItemText>
                </TreeView.Item>
              </TreeView.NodeProvider>
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      </TreeView.NodeProvider>
    </TreeView.Tree>
  </TreeView.Root>
)

const indicator = (id: string) => screen.getByTestId(`checkbox-${id}`)

describe('TreeView / NodeCheckboxIndicator', () => {
  it('should render the fallback when unchecked', () => {
    render(<CheckboxTree />)
    expect(indicator('src')).toHaveTextContent('empty')
    expect(indicator('src/a')).toHaveTextContent('empty')
  })

  it('should render checked and indeterminate states as nodes are checked', async () => {
    render(<CheckboxTree />)
    await userEvent.click(indicator('src/a'))
    expect(indicator('src/a')).toHaveTextContent('checked')
    expect(indicator('src/b')).toHaveTextContent('empty')
    expect(indicator('src')).toHaveTextContent('partial')

    await userEvent.click(indicator('src/b'))
    expect(indicator('src')).toHaveTextContent('checked')
  })
})
