import { TreeView, useTreeView } from '@ark-ui/solid/tree-view'

export const RootProvider = () => {
  const treeView = useTreeView({ defaultSelectedValue: ['1.0'] })

  return (
    <>
      <button onClick={() => treeView().collapse(['1.0'])}>Collapse 1.0</button>

      <TreeView.RootProvider value={treeView}>
        <TreeView.Label>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Item value="1.0">
            <TreeView.ItemText>1.0</TreeView.ItemText>
          </TreeView.Item>
          <TreeView.Branch value="2.0">
            <TreeView.BranchControl>
              <TreeView.BranchIndicator>↕️</TreeView.BranchIndicator>
              <TreeView.BranchText>2.0</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.Item value="2.1">
                <TreeView.ItemText>2.2</TreeView.ItemText>
              </TreeView.Item>
              <TreeView.Item value="2.2">
                <TreeView.ItemText>2.2</TreeView.ItemText>
              </TreeView.Item>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </TreeView.Tree>
      </TreeView.RootProvider>
    </>
  )
}
