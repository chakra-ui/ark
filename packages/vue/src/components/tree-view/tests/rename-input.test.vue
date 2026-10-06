<script setup lang="ts">
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'package.json', name: 'package.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
</script>

<template>
  <TreeView.Root :collection="collection" :can-rename="() => true">
    <TreeView.Tree>
      <TreeView.NodeProvider
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      >
        <TreeView.Item>
          <TreeView.ItemText>{{ node.name }}</TreeView.ItemText>
          <TreeView.NodeRenameInput as-child>
            <input aria-label="File name" />
          </TreeView.NodeRenameInput>
        </TreeView.Item>
      </TreeView.NodeProvider>
    </TreeView.Tree>
  </TreeView.Root>
</template>
