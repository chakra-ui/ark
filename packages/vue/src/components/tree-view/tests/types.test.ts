import type { TreeView, UseTreeViewProps } from '../index.ts'

interface FileNode {
  id: string
  name: string
  size: number
}

describe('TreeView types', () => {
  it('should keep the node type in emitted details', () => {
    type Emits = TreeView.RootEmits<FileNode>
    expectTypeOf<Emits['selectionChange'][0]['selectedNodes']>().toEqualTypeOf<FileNode[]>()
    expectTypeOf<Emits['expandedChange'][0]['expandedNodes']>().toEqualTypeOf<FileNode[]>()
    expectTypeOf<Emits['focusChange'][0]['focusedNode']>().toEqualTypeOf<FileNode | null>()
  })

  it('should keep the node type in useTreeView callbacks', () => {
    type OnSelectionChange = NonNullable<UseTreeViewProps<FileNode>['onSelectionChange']>
    expectTypeOf<Parameters<OnSelectionChange>[0]['selectedNodes']>().toEqualTypeOf<FileNode[]>()
  })
})
