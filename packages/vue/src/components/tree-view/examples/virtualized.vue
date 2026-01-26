<script setup lang="ts">
import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/vue/tree-view'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { ChevronRight, File, Folder } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/tree-view.module.css'
import { computed, nextTick, ref } from 'vue'

interface Node {
  id: string
  name: string
  children?: Node[]
}

function generateLargeTree(): Node {
  const folders: Node[] = []
  for (let i = 0; i < 50; i++) {
    const children: Node[] = []
    for (let j = 0; j < 20; j++) {
      children.push({ id: `folder-${i}/file-${i}-${j}.ts`, name: `file-${i}-${j}.ts` })
    }
    folders.push({ id: `folder-${i}`, name: `folder-${i}`, children })
  }
  return {
    id: 'ROOT',
    name: '',
    children: folders,
  }
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: generateLargeTree(),
})

const ROW_HEIGHT = 32

const treeRef = ref<HTMLDivElement | null>(null)

const tree = useTreeView({
  collection,
  scrollToIndexFn(details) {
    nextTick(() => {
      virtualizer.value?.scrollToIndex(details.index, { align: 'auto' })
    })
  },
})

const visibleNodes = computed(() => tree.value.getVisibleNodes())

const virtualizer = useVirtualizer(
  computed(() => ({
    count: visibleNodes.value.length,
    getScrollElement: () => treeRef.value,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  })),
)
</script>

<template>
  <TreeView.RootProvider :class="styles.Root" :value="tree">
    <TreeView.Label :class="styles.Label">Virtualized Tree ({{ visibleNodes.length }} visible nodes)</TreeView.Label>
    <div class="hstack">
      <button :class="button.Root" @click="tree.collapse()">Collapse all</button>
      <button :class="button.Root" @click="tree.expand()">Expand all</button>
    </div>
    <TreeView.Tree ref="treeRef" :class="styles.Tree" :style="{ height: '400px', overflow: 'auto' }">
      <div
        :style="{
          minHeight: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }"
      >
        <div
          v-for="virtualItem in virtualizer.getVirtualItems()"
          :key="visibleNodes[virtualItem.index].node.id"
          :data-index="virtualItem.index"
          @pointerdown="
            (e) => {
              if (e.button !== 0) return
              tree.focus(visibleNodes[virtualItem.index].node.id)
            }
          "
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
          }"
        >
          <TreeView.NodeProvider
            :node="visibleNodes[virtualItem.index].node"
            :indexPath="visibleNodes[virtualItem.index].indexPath"
          >
            <TreeView.NodeContext v-slot="nodeState">
              <template v-if="nodeState.isBranch">
                <TreeView.BranchControl
                  :class="styles.BranchControl"
                  :style="{ paddingLeft: `${nodeState.depth * 22}px` }"
                >
                  <TreeView.BranchIndicator :class="styles.BranchIndicator">
                    <ChevronRight />
                  </TreeView.BranchIndicator>
                  <TreeView.BranchText :class="styles.BranchText">
                    <Folder />
                    {{ visibleNodes[virtualItem.index].node.name }}
                  </TreeView.BranchText>
                </TreeView.BranchControl>
              </template>
              <template v-else>
                <TreeView.Item :class="styles.Item" :style="{ paddingLeft: `${nodeState.depth * 22}px` }">
                  <TreeView.ItemText :class="styles.ItemText">
                    <File />
                    {{ visibleNodes[virtualItem.index].node.name }}
                  </TreeView.ItemText>
                </TreeView.Item>
              </template>
            </TreeView.NodeContext>
          </TreeView.NodeProvider>
        </div>
      </div>
    </TreeView.Tree>
  </TreeView.RootProvider>
</template>
