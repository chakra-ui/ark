<script setup lang="ts">
import { ref } from 'vue'
import { Toc } from '@ark-ui/vue/toc'
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'
import { loremIpsum } from 'lorem-ipsum'
import TocTreeNode, { type TocNode } from './toc-tree-node.vue'
import styles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

const p = loremIpsum({ count: 7, units: 'paragraphs' })

const sections: TocNode[] = [
  {
    id: 'guides',
    name: 'Guides',
    depth: 2,
    children: [
      { id: 'quick-start', name: 'Quick Start', depth: 3 },
      { id: 'manual-setup', name: 'Manual Setup', depth: 3 },
    ],
  },
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    depth: 2,
    children: [
      { id: 'props', name: 'Props', depth: 3 },
      { id: 'events', name: 'Events', depth: 3 },
      { id: 'context', name: 'Context', depth: 3 },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    depth: 2,
    children: [
      { id: 'root-provider', name: 'Root Provider', depth: 3 },
      { id: 'custom-rendering', name: 'Custom Rendering', depth: 3 },
    ],
  },
]

const collection = createTreeCollection<TocNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: 'ROOT', name: '', depth: 0, children: sections },
})

const allItems = sections.flatMap((section) => [
  { value: section.id, depth: section.depth },
  ...(section.children ?? []).map((child) => ({ value: child.id, depth: child.depth })),
])

const expandedValue = ref<string[]>([])

const handleActiveChange = ({ activeItems }: { activeItems: Array<{ value: string; depth: number }> }) => {
  const activeIds = new Set(activeItems.map((i) => i.value))
  const next = sections
    .filter((section) => activeIds.has(section.id) || (section.children ?? []).some((child) => activeIds.has(child.id)))
    .map((s) => s.id)
  expandedValue.value = next
}
</script>

<template>
  <Toc.Root :class="styles.Root" :items="allItems" @active-change="handleActiveChange">
    <Toc.Content :class="styles.Content">
      <section v-for="section in sections" :key="section.id">
        <h2 :id="section.id">{{ section.name }}</h2>
        <p>{{ p }}</p>
        <template v-if="section.children">
          <div v-for="child in section.children" :key="child.id">
            <h3 :id="child.id">{{ child.name }}</h3>
            <p>{{ p }}</p>
          </div>
        </template>
      </section>
    </Toc.Content>

    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <TreeView.Root
        :class="treeStyles.Root"
        :collection="collection"
        :expanded-value="expandedValue"
        @expanded-change="({ expandedValue: next }) => (expandedValue = next)"
      >
        <TreeView.Tree :class="treeStyles.Tree">
          <TocTreeNode v-for="(node, index) in sections" :key="node.id" :node="node" :index-path="[index]" />
        </TreeView.Tree>
      </TreeView.Root>
    </Toc.Nav>
  </Toc.Root>
</template>
