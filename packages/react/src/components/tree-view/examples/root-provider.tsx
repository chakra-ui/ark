import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import styles from 'styles/tree-view.module.css'

export const RootProvider = () => {
  const treeView = useTreeView({ collection })

  return (
    <div className="stack">
      <output>selected: {JSON.stringify(treeView.selectedValue)}</output>
      <TreeView.RootProvider className={styles.Root} value={treeView}>
        <TreeView.Label className={styles.Label}>Tree</TreeView.Label>
        <TreeView.Tree className={styles.Tree}>
          {collection.rootNode.children?.map((node, index) => (
            <TreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView.RootProvider>
    </div>
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
  children?: Node[] | undefined
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
