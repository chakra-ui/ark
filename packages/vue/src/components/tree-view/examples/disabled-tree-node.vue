<script setup lang="ts">
import { TreeView } from '@ark-ui/vue/tree-view'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-vue-next'
import styles from 'styles/tree-view.module.css'

interface Node {
  id: string
  name: string
  disabled?: boolean
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
    <TreeView.NodeContext v-slot="nodeState">
      <TreeView.NodeGroup v-if="nodeState.isBranch" :class="styles.NodeGroup">
        <TreeView.Node :class="styles.Node">
          <TreeView.Cell :class="styles.Cell">
            <TreeView.NodeExpandTrigger :class="styles.NodeExpandTrigger">
              <TreeView.NodeIndicator type="expanded" :class="styles.NodeIndicator">
                <ChevronRight />
              </TreeView.NodeIndicator>
            </TreeView.NodeExpandTrigger>
            <TreeView.NodeText :class="styles.NodeText">
              <FolderOpen v-if="nodeState.expanded" />
              <Folder v-else />
              {{ node.name }}
            </TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent :class="styles.NodeGroupContent">
          <TreeView.IndentGuide :class="styles.IndentGuide" />
          <DisabledTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :index-path="[...indexPath, index]"
          />
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
      <TreeView.Node v-else :class="styles.Node">
        <TreeView.Cell :class="styles.Cell">
          <TreeView.NodeText :class="styles.NodeText">
            <File />
            {{ node.name }}
          </TreeView.NodeText>
        </TreeView.Cell>
      </TreeView.Node>
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DisabledTreeNode',
})
</script>
