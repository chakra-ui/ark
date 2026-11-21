import type * as tree from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/vanilla'
import { definePart, type PartElement, type RootElement, wrapped, rootOf } from '../../utils/define.js'
import { itemCollapsible, stopItemCollapsible, withoutVisibility } from '../../utils/item-collapsible.js'
import { mountTemplate } from '../../utils/lazy.js'
import { ancestors, contentTag, groupTag, nodePropsOf, nodeTag, root, textTag } from './shared.js'

const nodeStateOf = (api: tree.Api, el: HTMLElement) => {
  const np = nodePropsOf(el)
  return np ? api.getNodeState(np) : undefined
}

interface NodePartOptions {
  target?: (el: HTMLElement) => HTMLElement | null
  attributes?: string[]
}

const nodePart = (
  tag: string,
  props: (api: tree.Api, nodeProps: tree.NodeProps, el: HTMLElement) => Record<string, any>,
  { target, attributes }: NodePartOptions = {},
) =>
  definePart<tree.Api, tree.NodeState | undefined>({
    tag,
    root,
    attributes,
    target,
    setup: (el) => () => ancestors.delete(el),
    props: (api, el) => {
      const nodeProps = nodePropsOf(el)
      return nodeProps ? props(api, nodeProps, el) : {}
    },
    state: nodeStateOf,
  })

function branchOf(group: HTMLElement, api: tree.Api, np: tree.NodeProps) {
  const rootEl = rootOf<RootElement<tree.Api>>(group, root)!
  return itemCollapsible(
    group,
    () => ({
      id: `${rootEl.machineId}:branch:${np.node.value}`,
      contentId: api.getNodeGroupContentProps(np).id,
      open: api.getNodeState(np).expanded,
    }),
    () => {
      if (!rootEl.api) return
      ;(group as PartElement<tree.Api>).update(rootEl.api)
      group.querySelector<PartElement<tree.Api>>(`:scope > ${contentTag}`)?.update(rootEl.api)
    },
  )
}

export const TreeViewLabel = definePart<tree.Api>({
  tag: 'ark-tree-view-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const TreeViewTree = definePart<tree.Api>({
  tag: 'ark-tree-view-tree',
  root,
  attributes: ['manual'],
  props: (api) => api.getTreeProps(),
})

export const TreeViewNodeGroup = definePart<tree.Api, tree.NodeState | undefined>({
  tag: groupTag,
  root,
  attributes: ['value', 'disabled'],
  setup: (el) => () => {
    stopItemCollapsible(el)
    ancestors.delete(el)
  },
  props: (api, el) => {
    const np = nodePropsOf(el)
    if (!np) return {}
    const branch = branchOf(el, api, np)
    branch.sync(api.getNodeState(np).expanded)
    return mergeProps(branch.api().getRootProps(), api.getNodeGroupProps(np))
  },
  state: nodeStateOf,
})

export const TreeViewNodeGroupContent = definePart<tree.Api, tree.NodeState | undefined>({
  tag: contentTag,
  root,
  setup: (el) => () => ancestors.delete(el),
  props: (api, el) => {
    const np = nodePropsOf(el)
    const group = el.closest<HTMLElement>(groupTag)
    if (!np || !group) return {}
    return mergeProps(
      branchOf(group, api, np).api().getContentProps(),
      withoutVisibility(api.getNodeGroupContentProps(np)),
    )
  },
  state: nodeStateOf,
  render: (api, el) => {
    const np = nodePropsOf(el)
    const group = el.closest<HTMLElement>(groupTag)
    if (!np || !group) return
    mountTemplate(el, branchOf(group, api, np).api().visible, !!rootOf(el, root)?.hasAttribute('unmount-on-exit'))
  },
})

export const TreeViewNode = nodePart(nodeTag, (api, np) => api.getNodeProps(np), {
  attributes: ['value', 'disabled'],
})

export const TreeViewCell = nodePart('ark-tree-view-cell', (api, np) => api.getNodeCellProps(np), {
  target: wrapped('a'),
})

export const TreeViewNodeText = nodePart(textTag, (api, np) => ({
  ...api.getNodeTextProps(np),
  hidden: api.getNodeState(np).renaming || undefined,
}))

export const TreeViewNodeIndicator = nodePart(
  'ark-tree-view-node-indicator',
  (api, np, el) =>
    api.getNodeIndicatorProps({
      ...np,
      type: (el.getAttribute('type') as tree.NodeIndicatorProps['type']) ?? 'expanded',
    }),
  { attributes: ['type'] },
)

export const TreeViewNodeCheckbox = nodePart('ark-tree-view-node-checkbox', (api, np) => api.getNodeCheckboxProps(np))

export const TreeViewNodeRenameInput = nodePart(
  'ark-tree-view-node-rename-input',
  (api, np) => api.getNodeRenameInputProps(np),
  { target: wrapped('input') },
)

export const TreeViewNodeExpandTrigger = nodePart('ark-tree-view-node-expand-trigger', (api, np) =>
  api.getNodeExpandTriggerProps(np),
)

export const TreeViewIndentGuide = nodePart('ark-tree-view-indent-guide', (api, np) => api.getIndentGuideProps(np))
