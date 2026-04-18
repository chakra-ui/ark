<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view'
import { ChevronRight } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

type TocNode = {
  id: string
  name: string
  depth: number
  lines?: number
  children?: TocNode[]
}

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

const collection = createTreeCollection<TocNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: 'ROOT', name: '', depth: 0, children: sections },
})

const tocItems = [
  ...sections.map((section) => ({ value: section.id, depth: section.depth })),
  ...sections.flatMap((section) => (section.children ?? []).map((child) => ({ value: child.id, depth: child.depth }))),
]

const expandedValue = ref<string[]>([])
const contentEl = ref()
const getScrollEl = () => contentEl.value?.$el

const onActiveChange = ({ activeItems }: { activeItems: { value: string }[] }) => {
  const activeIds = new Set(activeItems.map((i) => i.value))
  expandedValue.value = sections
    .filter((section) => activeIds.has(section.id) || (section.children ?? []).some((child) => activeIds.has(child.id)))
    .map((s) => s.id)
}
</script>

<template>
  <Toc.Root :class="styles.Root" :items="tocItems" :getScrollEl="getScrollEl" @active-change="onActiveChange">
    <Toc.Content :class="styles.Content" ref="contentEl">
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
      <Toc.Context v-slot="{ getLinkProps }">
        <TreeView.Root
          :class="treeStyles.Root"
          :collection="collection"
          :expandedValue="expandedValue"
          @expanded-change="({ expandedValue: next }) => (expandedValue = next)"
        >
          <TreeView.Tree :class="treeStyles.Tree">
            <template v-for="(section, sectionIdx) in sections" :key="section.id">
              <TreeView.NodeProvider :node="section" :index-path="[sectionIdx]">
                <TreeView.Branch :class="treeStyles.Branch">
                  <TreeView.BranchControl :class="treeStyles.BranchControl">
                    <TreeView.BranchIndicator :class="treeStyles.BranchIndicator">
                      <ChevronRight />
                    </TreeView.BranchIndicator>
                    <TreeView.BranchText :class="treeStyles.BranchText">
                      <a
                        :class="styles.TreeLink"
                        v-bind="getLinkProps({ item: { value: section.id, depth: section.depth } })"
                      >
                        {{ section.name }}
                      </a>
                    </TreeView.BranchText>
                  </TreeView.BranchControl>
                  <TreeView.BranchContent :class="treeStyles.BranchContent">
                    <TreeView.BranchIndentGuide :class="treeStyles.BranchIndentGuide" />
                    <template v-for="(child, childIdx) in section.children" :key="child.id">
                      <TreeView.NodeProvider :node="child" :index-path="[sectionIdx, childIdx]">
                        <TreeView.Item :class="treeStyles.Item">
                          <TreeView.ItemText :class="treeStyles.ItemText">
                            <a
                              :class="styles.TreeLink"
                              v-bind="getLinkProps({ item: { value: child.id, depth: child.depth } })"
                            >
                              {{ child.name }}
                            </a>
                          </TreeView.ItemText>
                        </TreeView.Item>
                      </TreeView.NodeProvider>
                    </template>
                  </TreeView.BranchContent>
                </TreeView.Branch>
              </TreeView.NodeProvider>
            </template>
          </TreeView.Tree>
        </TreeView.Root>
      </Toc.Context>
    </Toc.Nav>
  </Toc.Root>
</template>
