<script setup lang="ts">
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'
import { useId } from 'vue'
import ContextMenuTreeNode from './context-menu-tree-node.vue'
import styles from 'styles/tree-view.module.css'

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

const uid = useId()
const getNodeId = (node: string) => `${uid}/${node}`

const collection = createTreeCollection<TreeNode>({
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
  <TreeView.Root :class="styles.Root" :collection="collection" :ids="{ node: getNodeId }">
    <TreeView.Label :class="styles.Label">Tree</TreeView.Label>
    <TreeView.Tree :class="styles.Tree">
      <ContextMenuTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :indexPath="[index]"
        :triggerId="getNodeId(node.id)"
      />
    </TreeView.Tree>
  </TreeView.Root>
</template>
