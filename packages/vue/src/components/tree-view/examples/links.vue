<script setup lang="ts">
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'
import TreeNodeWithLinks from './tree-node-with-links.vue'

interface Node {
  id: string
  name: string
  href?: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'docs',
        name: 'Documentation',
        children: [
          { id: 'docs/getting-started', name: 'Getting Started', href: '/docs/getting-started' },
          { id: 'docs/installation', name: 'Installation', href: '/docs/installation' },
          {
            id: 'docs/components',
            name: 'Components',
            children: [
              { id: 'docs/components/accordion', name: 'Accordion', href: '/docs/components/accordion' },
              { id: 'docs/components/dialog', name: 'Dialog', href: '/docs/components/dialog' },
              { id: 'docs/components/menu', name: 'Menu', href: '/docs/components/menu' },
            ],
          },
        ],
      },
      {
        id: 'examples',
        name: 'Examples',
        children: [
          { id: 'examples/react', name: 'React Examples', href: '/examples/react' },
          { id: 'examples/vue', name: 'Vue Examples', href: '/examples/vue' },
          { id: 'examples/solid', name: 'Solid Examples', href: '/examples/solid' },
        ],
      },
      {
        id: 'external',
        name: 'External Links',
        children: [
          { id: 'external/github', name: 'GitHub Repository', href: 'https://github.com/chakra-ui/zag' },
          { id: 'external/npm', name: 'NPM Package', href: 'https://www.npmjs.com/package/@zag-js/core' },
          { id: 'external/docs', name: 'Official Docs', href: 'https://zagjs.com' },
        ],
      },
      { id: 'readme.md', name: 'README.md', href: '/readme' },
      { id: 'license', name: 'LICENSE', href: '/license' },
    ],
  },
})
</script>

<template>
  <TreeView.Root :collection="collection">
    <TreeView.Label>Docs</TreeView.Label>
    <TreeView.Tree>
      <TreeNodeWithLinks
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :indexPath="[index]"
      />
    </TreeView.Tree>
  </TreeView.Root>
</template>
