<script setup lang="ts">
import TocTreeNode, { type TocNode } from './toc-tree-node.vue'
import styles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

const sections: TocNode[] = [
  {
    id: 'guides',
    name: 'Guides',
    depth: 2,
    lines: 10,
    children: [
      { id: 'quick-start', name: 'Quick Start', depth: 3, lines: 6 },
      { id: 'manual-setup', name: 'Manual Setup', depth: 3, lines: 7 },
    ],
  },
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    depth: 2,
    lines: 12,
    children: [
      { id: 'props', name: 'Props', depth: 3, lines: 8 },
      { id: 'events', name: 'Events', depth: 3, lines: 7 },
      { id: 'context', name: 'Context', depth: 3, lines: 6 },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    depth: 2,
    lines: 14,
    children: [
      { id: 'root-provider', name: 'Root Provider', depth: 3, lines: 8 },
      { id: 'custom-rendering', name: 'Custom Rendering', depth: 3, lines: 7 },
    ],
  },
]

import { createTreeCollection } from '@ark-ui/vue/tree-view'

defineExpose({
  tocItems: [
    ...sections.map((section) => ({ value: section.id, depth: section.depth })),
    ...sections.flatMap((section) =>
      (section.children ?? []).map((child) => ({ value: child.id, depth: child.depth })),
    ),
  ],
  collection: createTreeCollection<TocNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: 'ROOT', name: '', depth: 0, children: sections },
  }),
})
</script>

const tocItems = [ ...sections.map((section) => ({ value: section.id, depth: section.depth })),
...sections.flatMap((section) => (section.children ?? []).map((child) => ({ value: child.id, depth: child.depth })) ), ]

<template>
  <Toc.Root :class="styles.Root" :items="tocItems">
    <Toc.Content :class="styles.Content">
      <section v-for="section in sections" :key="section.id">
        <h2 :id="section.id">{{ section.name }}</h2>
        <div :class="styles.DummyText">
          <div v-for="i in section.lines" :key="i" :class="styles.DummyLine" />
        </div>
        <template v-if="section.children">
          <div v-for="child in section.children" :key="child.id">
            <h3 :id="child.id">{{ child.name }}</h3>
            <div :class="styles.DummyText">
              <div v-for="i in child.lines" :key="i" :class="styles.DummyLine" />
            </div>
          </div>
        </template>
      </section>
    </Toc.Content>

    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <TreeView.Root :class="treeStyles.Root" :collection="collection">
        <TreeView.Tree :class="treeStyles.Tree">
          <TocTreeNode v-for="(node, index) in sections" :key="node.id" :node="node" :index-path="[index]" />
        </TreeView.Tree>
      </TreeView.Root>
    </Toc.Nav>
  </Toc.Root>
</template>
