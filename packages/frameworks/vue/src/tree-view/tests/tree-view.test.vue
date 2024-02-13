<script setup lang="ts">
import { TreeView } from '../'
</script>

<template>
  <TreeView.Root>
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      <TreeView.Item id="1.0">
        <TreeView.ItemIndicator>🌳</TreeView.ItemIndicator>
        <TreeView.ItemText>1.0</TreeView.ItemText>
      </TreeView.Item>
      <TreeView.Branch id="2.0">
        <TreeView.BranchControl>
          <TreeView.BranchTrigger>↕️</TreeView.BranchTrigger>
          <TreeView.BranchText>2.0</TreeView.BranchText>
          <TreeView.BranchIndicator>↕️</TreeView.BranchIndicator>
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
</template>
