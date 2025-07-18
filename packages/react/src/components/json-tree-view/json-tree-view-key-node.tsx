import type { JsonNode } from '@zag-js/json-tree-utils'

interface JsonTreeViewKeyNodeProps {
  node: JsonNode
}
export const JsonTreeViewKeyNode = (props: JsonTreeViewKeyNodeProps): React.ReactNode => {
  const { node } = props
  return (
    <>
      <span data-kind="key" data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
        {node.key}
      </span>
      <span data-kind="colon">: </span>
    </>
  )
}
