import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'
import { For, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeHastElement
  renderValue?: (node: JsonNodeHastElement) => JSX.Element
}

export const JsonTreeViewValueNode = (props: JsonTreeViewValueNodeProps): JSX.Element => {
  if (props.node.type === 'text') {
    return <>{props.renderValue?.(props.node) ?? props.node.value}</>
  }

  return (
    <Dynamic
      component={props.node.tagName}
      data-root={props.node.properties.root ? '' : undefined}
      data-type={props.node.properties.nodeType}
      data-kind={props.node.properties.kind}
    >
      <For each={props.node.children}>
        {(child) => <JsonTreeViewValueNode node={child} renderValue={props.renderValue} />}
      </For>
    </Dynamic>
  )
}
