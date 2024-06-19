<script setup lang="ts">
import { TreeView } from '../..'
</script>

<template>
  <TreeView.Root :defaultSelectedValue="['1.0']">
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      <TreeView.Item value="1.0">
        <TreeView.ItemText>1.0</TreeView.ItemText>
      </TreeView.Item>
      <TreeView.Branch value="2.0">
        <TreeView.BranchControl>
          <TreeView.BranchIndicator>↕️</TreeView.BranchIndicator>
          <TreeView.BranchText>2.0</TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.Item value="2.1">
            <TreeView.ItemText>2.2</TreeView.ItemText>
          </TreeView.Item>
          <TreeView.Item value="2.2">
            <TreeView.ItemText>2.2</TreeView.ItemText>
          </TreeView.Item>
        </TreeView.BranchContent>
      </TreeView.Branch>
    </TreeView.Tree>
  </TreeView.Root>
</template>
