'use client'
import { useCascadeSelectContext } from '@ark-ui/react/cascade-select'
import { ChevronRightIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { forwardRef } from 'react'
import * as ArkCascadeSelect from './primitives/cascade-select'

export type RootProps = ArkCascadeSelect.RootProps & { label?: string; placeholder?: string }

export const CascadeSelect = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { collection, label, placeholder, ...rest } = props
  return (
    <ArkCascadeSelect.Root ref={ref} collection={collection} {...rest}>
      {label && <ArkCascadeSelect.Label>{label}</ArkCascadeSelect.Label>}
      <ArkCascadeSelect.Control>
        <ArkCascadeSelect.Trigger>
          <ArkCascadeSelect.ValueText placeholder={placeholder} />
          <ArkCascadeSelect.Indicator>
            <ChevronsUpDownIcon />
          </ArkCascadeSelect.Indicator>
        </ArkCascadeSelect.Trigger>
        <ArkCascadeSelect.ClearTrigger>
          <XIcon />
        </ArkCascadeSelect.ClearTrigger>
      </ArkCascadeSelect.Control>
      <ArkCascadeSelect.Positioner>
        <ArkCascadeSelect.Content>
          <TreeNode node={collection.rootNode} collection={collection} />
        </ArkCascadeSelect.Content>
      </ArkCascadeSelect.Positioner>
      <ArkCascadeSelect.HiddenInput />
    </ArkCascadeSelect.Root>
  )
})

CascadeSelect.displayName = 'CascadeSelect'

type AnyNode = { label?: string; name?: string; value?: string; children?: AnyNode[] }

const TreeNode = ({
  node,
  collection,
  indexPath = [],
  value = [],
}: {
  node: AnyNode
  collection: ArkCascadeSelect.RootProps['collection']
  indexPath?: number[]
  value?: string[]
}) => {
  const api = useCascadeSelectContext()
  const nodeState = api.getItemState({ item: node, indexPath, value })
  return (
    <>
      <ArkCascadeSelect.List item={node} indexPath={indexPath} value={value}>
        {collection.getNodeChildren(node).map((child, i) => (
          <ArkCascadeSelect.Item
            key={collection.getNodeValue(child)}
            item={child}
            indexPath={[...indexPath, i]}
            value={[...value, collection.getNodeValue(child)]}
          >
            <ArkCascadeSelect.ItemText>{collection.stringifyNode(child)}</ArkCascadeSelect.ItemText>
            {collection.isBranchNode(child) ? (
              <ChevronRightIcon
                style={{ width: '0.875rem', height: '0.875rem', flexShrink: 0, color: 'var(--colors-fg-subtle)' }}
              />
            ) : (
              <ArkCascadeSelect.ItemIndicator>✓</ArkCascadeSelect.ItemIndicator>
            )}
          </ArkCascadeSelect.Item>
        ))}
      </ArkCascadeSelect.List>
      {nodeState.highlightedChild && collection.isBranchNode(nodeState.highlightedChild) && (
        <TreeNode
          node={nodeState.highlightedChild as AnyNode}
          collection={collection}
          indexPath={[...indexPath, nodeState.highlightedIndex]}
          value={[...value, collection.getNodeValue(nodeState.highlightedChild)]}
        />
      )}
    </>
  )
}
