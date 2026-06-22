<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, SquareCheckBig } from 'lucide-vue-next'
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

defineProps<Props>()
</script>

<template>
  <TreeView.NodeProvider :node="node" :index-path="indexPath">
    <TreeView.NodeGroup v-if="node.children" :class="styles.NodeGroup">
      <TreeView.Node :class="styles.Node">
        <TreeView.Cell :class="styles.Cell">
          <TreeView.NodeText :class="styles.NodeText">
            <Folder />
            {{ node.name }}
          </TreeView.NodeText>
          <TreeView.NodeExpandTrigger :class="styles.NodeExpandTrigger">
            <TreeView.NodeIndicator type="expanded" :class="styles.NodeIndicator">
              <ChevronRight />
            </TreeView.NodeIndicator>
          </TreeView.NodeExpandTrigger>
        </TreeView.Cell>
      </TreeView.Node>
      <TreeView.NodeGroupContent :class="styles.NodeGroupContent">
        <TreeView.IndentGuide :class="styles.IndentGuide" />
        <TreeNode
          v-for="(child, index) in node.children"
          :key="child.id"
          :node="child"
          :index-path="[...indexPath, index]"
        />
      </TreeView.NodeGroupContent>
    </TreeView.NodeGroup>
    <TreeView.Node v-else :class="styles.Node">
      <TreeView.Cell :class="styles.Cell">
        <TreeView.NodeIndicator type="selected" :class="styles.NodeIndicator">
          <SquareCheckBig />
        </TreeView.NodeIndicator>
        <TreeView.NodeText :class="styles.NodeText">
          <File />
          {{ node.name }}
        </TreeView.NodeText>
      </TreeView.Cell>
    </TreeView.Node>
  </TreeView.NodeProvider>
</template>
