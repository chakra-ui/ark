import type { Assign } from '@ark-ui/react'
import { TreeView as ArkTreeView, type TreeViewRootProps } from '@ark-ui/react/tree-view'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { treeView } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

interface Child {
  value: string
  name: string
  children?: Child[]
}

export interface TreeViewData {
  label: string
  children: Child[]
}

export interface TreeViewProps extends Assign<JsxStyleProps, TreeViewRootProps> {
  data: TreeViewData
}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>((props, ref) => {
  const [cssProps, localProps] = splitCssProps(props)
  const { data, className, ...rootProps } = localProps
  const styles = treeView()

  const renderChild = (child: Child) => (
    <ArkTreeView.Branch key={child.value} value={child.value} className={styles.branch}>
      <ArkTreeView.BranchControl className={styles.branchControl}>
        <ArkTreeView.BranchIndicator className={styles.branchIndicator}>
          <ChevronRightIcon />
        </ArkTreeView.BranchIndicator>
        <ArkTreeView.BranchText className={styles.branchText}>{child.name}</ArkTreeView.BranchText>
      </ArkTreeView.BranchControl>
      <ArkTreeView.BranchContent className={styles.branchContent}>
        {child.children?.map((child) =>
          child.children ? (
            renderChild(child)
          ) : (
            <ArkTreeView.Item key={child.value} value={child.value} className={styles.item}>
              <ArkTreeView.ItemText className={styles.itemText}>{child.name}</ArkTreeView.ItemText>
            </ArkTreeView.Item>
          ),
        )}
      </ArkTreeView.BranchContent>
    </ArkTreeView.Branch>
  )

  return (
    <ArkTreeView.Root
      ref={ref}
      aria-label={data.label}
      className={cx(styles.root, css(cssProps), className)}
      {...rootProps}
    >
      <ArkTreeView.Tree className={styles.tree}>{data.children.map(renderChild)}</ArkTreeView.Tree>
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
