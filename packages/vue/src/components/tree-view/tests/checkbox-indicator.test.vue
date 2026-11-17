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
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/a', name: 'a' },
          { id: 'src/b', name: 'b' },
        ],
      },
    ],
  },
})

const branch = collection.rootNode.children![0]
</script>

<template>
  <TreeView.Root :collection="collection" :default-expanded-value="['src']" :default-checked-value="[]">
    <TreeView.Tree>
      <TreeView.NodeProvider :node="branch" :index-path="[0]">
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.NodeCheckbox data-testid="checkbox-src">
              <TreeView.NodeCheckboxIndicator>
                checked
                <template #indeterminate>partial</template>
                <template #fallback>empty</template>
              </TreeView.NodeCheckboxIndicator>
            </TreeView.NodeCheckbox>
            <TreeView.BranchText>src</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.NodeProvider
              v-for="(child, index) in branch.children"
              :key="child.id"
              :node="child"
              :index-path="[0, index]"
            >
              <TreeView.Item>
                <TreeView.NodeCheckbox :data-testid="`checkbox-${child.id}`">
                  <TreeView.NodeCheckboxIndicator>
                    checked
                    <template #indeterminate>partial</template>
                    <template #fallback>empty</template>
                  </TreeView.NodeCheckboxIndicator>
                </TreeView.NodeCheckbox>
                <TreeView.ItemText>{{ child.name }}</TreeView.ItemText>
              </TreeView.Item>
            </TreeView.NodeProvider>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </TreeView.NodeProvider>
    </TreeView.Tree>
  </TreeView.Root>
</template>
