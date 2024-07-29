'use client'
import { forwardRef } from 'react'
import * as ArkTreeView from './primitives/tree-view'

interface Child {
  value: string
  name: string
  children?: Child[]
}

export interface TreeViewData {
  label: string
  children: Child[]
}

export interface TreeViewProps extends ArkTreeView.RootProps {
  data: TreeViewData
}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>((props, ref) => {
  const { data, ...rootProps } = props

  const renderChild = (child: Child) => (
    <ArkTreeView.Branch key={child.value} value={child.value}>
      <ArkTreeView.BranchControl>
        <ArkTreeView.BranchIndicator>
          <ChevronRightIcon />
        </ArkTreeView.BranchIndicator>
        <ArkTreeView.BranchText>{child.name}</ArkTreeView.BranchText>
      </ArkTreeView.BranchControl>
      <ArkTreeView.BranchContent>
        {child.children?.map((child) =>
          child.children ? (
            renderChild(child)
          ) : (
            <ArkTreeView.Item key={child.value} value={child.value}>
              <ArkTreeView.ItemText>{child.name}</ArkTreeView.ItemText>
            </ArkTreeView.Item>
          ),
        )}
      </ArkTreeView.BranchContent>
    </ArkTreeView.Branch>
  )

  return (
    <ArkTreeView.Root ref={ref} aria-label={data.label} {...rootProps}>
      <ArkTreeView.Tree>{data.children.map(renderChild)}</ArkTreeView.Tree>
    </ArkTreeView.Root>
  )
})

TreeView.displayName = 'TreeView'

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Right Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 18l6-6l-6-6"
    />
  </svg>
)
