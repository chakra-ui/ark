<script setup lang="ts">
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'
import { ref } from 'vue'
import TreeNode from './tree-node.vue'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const expandedValue = ref<string[]>(['node_modules'])

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'node_modules',
        name: 'node_modules',
        children: [
          { id: 'node_modules/zag-js', name: 'zag-js' },
          { id: 'node_modules/pandacss', name: 'panda' },
          {
            id: 'node_modules/@types',
            name: '@types',
            children: [
              { id: 'node_modules/@types/react', name: 'react' },
              { id: 'node_modules/@types/react-dom', name: 'react-dom' },
            ],
          },
        ],
      },
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/app.tsx', name: 'app.tsx' },
          { id: 'src/index.ts', name: 'index.ts' },
        ],
      },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
</script>

<template>
  <TreeView.Root :collection="collection" v-model:expanded-value="expandedValue">
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      <TreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :indexPath="[index]"
      />
    </TreeView.Tree>
  </TreeView.Root>
</template>
