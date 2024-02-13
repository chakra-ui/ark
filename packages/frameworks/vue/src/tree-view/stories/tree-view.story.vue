<script setup lang="ts">
import { TreeView } from '../'
</script>

<template>
  <Story title="Tree View">
    <Variant title="Basic">
      <TreeView.Root>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Item id="1.0">
          <TreeView.ItemText>1.0</TreeView.ItemText>
        </TreeView.Item>
        <TreeView.Branch id="2.0">
          <TreeView.BranchControl>
            <TreeView.BranchTrigger>
              <TreeView.BranchText>2.0</TreeView.BranchText>
              <TreeView.BranchIndicator>↕️</TreeView.BranchIndicator>
            </TreeView.BranchTrigger>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.Item id="2.1">
              <TreeView.ItemText>2.2</TreeView.ItemText>
            </TreeView.Item>
            <TreeView.Item id="2.2">
              <TreeView.ItemText>2.2</TreeView.ItemText>
            </TreeView.Item>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </TreeView.Tree>
    </TreeView.Root>
    </Variant>
  </Story>
</template>
