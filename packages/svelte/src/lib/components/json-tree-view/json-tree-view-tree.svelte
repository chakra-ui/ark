<script lang="ts">
  import { createSplitProps } from '../../utils/create-split-props'
  import { TreeView, useTreeViewContext, type TreeViewTreeProps } from '../tree-view'
  import JsonTreeViewNode, { type JsonTreeViewNodeBaseProps } from './json-tree-view-node.svelte'

  export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

  export interface JsonTreeViewTreeProps extends TreeViewTreeProps, JsonTreeViewTreeBaseProps {}

  const props: JsonTreeViewTreeProps = $props()

  const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()
  const [nodeProps, treeProps] = splitTreeNodeProps(props, ['arrow', 'indentGuide', 'renderValue'])

  const tree = useTreeViewContext()
  const children = $derived(tree().collection.getNodeChildren(tree().collection.rootNode))
</script>

<TreeView.Tree data-scope="json-tree-view" {...treeProps}>
  {#each children as child, index (index)}
    <JsonTreeViewNode node={child} indexPath={[index]} {...nodeProps} />
  {/each}
</TreeView.Tree>
