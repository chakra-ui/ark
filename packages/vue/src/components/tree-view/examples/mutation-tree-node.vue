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
  <TreeView.NodeProvider :node="node" :indexPath="indexPath">
    <template v-if="nodeState.isBranch">
      <TreeView.Branch :class="styles.Branch">
        <TreeView.BranchControl :class="styles.BranchControl">
          <TreeView.BranchIndicator :class="styles.BranchIndicator">
            <ChevronRight />
          </TreeView.BranchIndicator>
          <TreeView.BranchText :class="styles.BranchText">{{ node.name }}</TreeView.BranchText>
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
        </TreeView.BranchControl>
        <TreeView.BranchContent :class="styles.BranchContent">
          <TreeView.BranchIndentGuide :class="styles.BranchIndentGuide" />
          <MutationTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :indexPath="[...indexPath, index]"
            @remove="emit('remove', $event)"
            @add="emit('add', $event)"
          />
        </TreeView.BranchContent>
      </TreeView.Branch>
    </template>
    <template v-else>
      <TreeView.Item :class="styles.Item">
        <TreeView.ItemText :class="styles.ItemText">{{ node.name }}</TreeView.ItemText>
        <div :class="styles.ActionGroup">
          <button :class="styles.Action" @click.stop="emit('remove', { node, indexPath })">
            <Trash />
          </button>
        </div>
      </TreeView.Item>
    </template>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MutationTreeNode',
})
</script>
