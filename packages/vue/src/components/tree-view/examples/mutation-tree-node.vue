<script setup lang="ts">
import { TreeView, useTreeViewContext } from '@ark-ui/vue/tree-view'
import { ChevronRight, Plus, Trash } from 'lucide-vue-next'
import styles from 'styles/tree-view.module.css'

interface Node {
  id: string
  name: string
  children?: Node[]
}

interface Props {
  node: Node
  indexPath: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  remove: [props: { node: Node; indexPath: number[] }]
  add: [props: { node: Node; indexPath: number[] }]
}>()

const tree = useTreeViewContext()
const nodeState = tree.value.getNodeState(props)
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeGroup v-if="nodeState.isBranch" :class="styles.NodeGroup">
      <TreeView.Node :class="styles.Node">
        <TreeView.Cell :class="styles.Cell">
          <TreeView.NodeExpandTrigger :class="styles.NodeExpandTrigger">
            <TreeView.NodeIndicator type="expanded" :class="styles.NodeIndicator">
              <ChevronRight />
            </TreeView.NodeIndicator>
          </TreeView.NodeExpandTrigger>
          <TreeView.NodeText :class="styles.NodeText">{{ node.name }}</TreeView.NodeText>
          <div :class="styles.ActionGroup">
            <button :class="styles.Action" @click.stop="emit('remove', { node, indexPath })">
              <Trash />
            </button>
            <button
              :class="styles.Action"
              @click.stop="
                emit('add', { node, indexPath })
                tree.expand([node.id])
              "
            >
              <Plus />
            </button>
          </div>
        </TreeView.Cell>
      </TreeView.Node>
      <TreeView.NodeGroupContent :class="styles.NodeGroupContent">
        <TreeView.IndentGuide :class="styles.IndentGuide" />
        <MutationTreeNode
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, index]"
          @remove="emit('remove', $event)"
          @add="emit('add', $event)"
        />
      </TreeView.NodeGroupContent>
    </TreeView.NodeGroup>
    <TreeView.Node v-else :class="styles.Node">
      <TreeView.Cell :class="styles.Cell">
        <TreeView.NodeText :class="styles.NodeText">{{ node.name }}</TreeView.NodeText>
        <div :class="styles.ActionGroup">
          <button :class="styles.Action" @click.stop="emit('remove', { node, indexPath })">
            <Trash />
          </button>
        </div>
      </TreeView.Cell>
    </TreeView.Node>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MutationTreeNode',
})
</script>
