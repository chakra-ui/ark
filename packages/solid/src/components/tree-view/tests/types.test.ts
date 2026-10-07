import type { UseTreeViewProps } from '../index.tsx'

interface FileNode {
  id: string
  name: string
  size: number
}

describe('TreeView types', () => {
  it('should keep the node type in useTreeView callbacks', () => {
    type Props = UseTreeViewProps<FileNode>
    type SelectionDetails = Parameters<NonNullable<Props['onSelectionChange']>>[0]
    type ExpandedDetails = Parameters<NonNullable<Props['onExpandedChange']>>[0]
    type FocusDetails = Parameters<NonNullable<Props['onFocusChange']>>[0]
    expectTypeOf<SelectionDetails['selectedNodes']>().toEqualTypeOf<FileNode[]>()
    expectTypeOf<ExpandedDetails['expandedNodes']>().toEqualTypeOf<FileNode[]>()
    expectTypeOf<FocusDetails['focusedNode']>().toEqualTypeOf<FileNode | null>()
  })
})
