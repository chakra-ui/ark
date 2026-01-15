import { TreeView, createTreeCollection, useTreeViewContext } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useMemo } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/tree-view.module.css'

const ExpandCollapseButtons = () => {
  const tree = useTreeViewContext()
  const branchValues = useMemo(() => tree.collection.getBranchValues(), [tree.collection])
  const isAllExpanded = useMemo(
    () => branchValues.every((value) => tree.expandedValue.includes(value)),
    [tree.expandedValue, branchValues],
  )

  return (
    <div className="hstack">
      {isAllExpanded ? (
        <button className={button.Root} onClick={() => tree.collapse()}>
          Collapse all
        </button>
      ) : (
        <button className={button.Root} onClick={() => tree.expand()}>
          Expand all
        </button>
      )}
    </div>
  )
}

export const ExpandCollapseAll = () => {
  return (
    <TreeView.Root className={styles.Root} collection={collection} data-animate="false">
      <ExpandCollapseButtons />
      <TreeView.Tree className={styles.Tree}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {(nodeState) =>
          node.children ? (
            <TreeView.Branch className={styles.Branch}>
              <TreeView.BranchControl className={styles.BranchControl}>
                <TreeView.BranchIndicator className={styles.BranchIndicator}>
                  <ChevronRightIcon />
                </TreeView.BranchIndicator>
                <TreeView.BranchText className={styles.BranchText}>
                  {nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                  {node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent className={styles.BranchContent}>
                <TreeView.BranchIndentGuide className={styles.BranchIndentGuide} />
                {node.children.map((child, index) => (
                  <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item className={styles.Item}>
              <TreeView.ItemText className={styles.ItemText}>
                <FileIcon />
                {node.name}
              </TreeView.ItemText>
            </TreeView.Item>
          )
        }
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  )
}

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
        id: 'node_modules',
        name: 'node_modules',
        children: [
          { id: 'node_modules/zag-js', name: 'zag-js' },
          { id: 'node_modules/pandacss', name: 'panda' },
          {
            id: 'node_modules/@types',
            name: '@types',
            children: [
              { id: 'node_modules/@types/react', name: 'react' },
              { id: 'node_modules/@types/react-dom', name: 'react-dom' },
            ],
          },
        ],
      },
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/app.tsx', name: 'app.tsx' },
          { id: 'src/index.ts', name: 'index.ts' },
        ],
      },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
