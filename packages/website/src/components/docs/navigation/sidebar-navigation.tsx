import { TreeView as ArkTreeView, type TreeViewRootProps } from '@ark-ui/react/src/tree-view'
import { navigate } from 'astro:transitions/client'
import { ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css, cx } from 'styled-system/css'
import { HStack, splitCssProps } from 'styled-system/jsx'
import { treeView } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'
import { Badge } from '~/components/ui'

interface Child {
  id: string
  href: string
  title: string
  label?: string
  children?: Child[]
}

export interface TreeViewData {
  label: string
  children: Child[]
}

export interface SidebarNavigationProps extends Assign<JsxStyleProps, TreeViewRootProps> {
  data: TreeViewData
}

export const SidebarNavigation = (props: SidebarNavigationProps) => {
  const [cssProps, localProps] = splitCssProps(props)
  const { data, className, ...rootProps } = localProps
  const styles = treeView()

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  useEffect(() => {
    setSelectedIds([window.location.pathname])
    setExpandedIds([window.location.pathname.split('/')[2]])
    document.addEventListener('astro:after-swap', () => {
      setSelectedIds([window.location.pathname])
    })
  }, [])

  const renderChild = (child: Child) =>
    child.children ? (
      <ArkTreeView.Branch key={child.href} id={child.id} className={styles.branch}>
        <ArkTreeView.BranchControl className={styles.branchControl}>
          <ArkTreeView.BranchIndicator
            className={cx(
              styles.branchIndicator,
              css({ _expanded: { transform: 'rotate(90deg)' } }),
            )}
          >
            <ChevronRightIcon />
          </ArkTreeView.BranchIndicator>
          <ArkTreeView.BranchText className={styles.branchText}>
            {child.title}
          </ArkTreeView.BranchText>
        </ArkTreeView.BranchControl>
        <ArkTreeView.BranchContent className={styles.branchContent}>
          {child.children.map(renderChild)}
        </ArkTreeView.BranchContent>
      </ArkTreeView.Branch>
    ) : (
      <ArkTreeView.Item key={child.href} id={child.href} className={styles.item}>
        <HStack justifyContent="space-between" alignItems="center" me="1">
          <ArkTreeView.ItemText
            className={cx(styles.itemText, css({ textTransform: 'capitalize' }))}
          >
            {child.title}
          </ArkTreeView.ItemText>
          {child.label && (
            <Badge size="sm" textTransform="capitalize">
              {child.label}
            </Badge>
          )}
        </HStack>
      </ArkTreeView.Item>
    )

  return (
    <ArkTreeView.Root
      aria-label="Site navigation"
      className={cx(styles.root, css(cssProps), className)}
      expandedIds={expandedIds}
      onExpandedChange={(ids) => setExpandedIds(ids.expandedIds)}
      selectedIds={selectedIds}
      onSelectionChange={(ids) =>
        ids.selectedIds[0].match(/\/.*\/.*\/.*/) && navigate(ids.selectedIds[0])
      }
      {...rootProps}
    >
      <ArkTreeView.Tree className={styles.tree}>{data.children.map(renderChild)}</ArkTreeView.Tree>
    </ArkTreeView.Root>
  )
}
