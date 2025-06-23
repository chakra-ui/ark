<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { CheckSquareIcon, ChevronRightIcon, MinusSquareIcon, SquareIcon } from 'lucide-vue-next'

interface Node {
  id: string
  name: string
  children?: Node[] | undefined
}

interface Props {
  node: Node
  indexPath: number[]
}

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.Branch v-if="node.children">
      <TreeView.BranchControl>
        <TreeView.NodeCheckbox>
          <TreeView.NodeCheckboxIndicator>
            <CheckSquareIcon />
            <template #indeterminate>
              <MinusSquareIcon />
            </template>
            <template #fallback>
              <SquareIcon />
            </template>
          </TreeView.NodeCheckboxIndicator>
        </TreeView.NodeCheckbox>
        <TreeView.BranchText>{{ node.name }}</TreeView.BranchText>
        <TreeView.BranchIndicator>
          <ChevronRightIcon />
        </TreeView.BranchIndicator>
      </TreeView.BranchControl>
      <TreeView.BranchContent>
        <TreeView.BranchIndentGuide />
        <TreeNodeCheckbox
          v-for="(child, childIndex) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, childIndex]"
        />
      </TreeView.BranchContent>
    </TreeView.Branch>
    <TreeView.Item v-else>
      <TreeView.NodeCheckbox>
        <TreeView.NodeCheckboxIndicator>
          <CheckSquareIcon />
          <template #indeterminate>
            <MinusSquareIcon />
          </template>
          <template #fallback>
            <SquareIcon />
          </template>
        </TreeView.NodeCheckboxIndicator>
      </TreeView.NodeCheckbox>
      <TreeView.ItemText>{{ node.name }}</TreeView.ItemText>
    </TreeView.Item>
  </TreeView.NodeProvider>
</template>
