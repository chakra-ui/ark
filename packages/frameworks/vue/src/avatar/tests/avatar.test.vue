<script setup lang="ts">
import { Avatar } from '../'
</script>

<template>
  <Avatar.Root @loading-status-change="(details) => console.log(details)">
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.Root>
</template>
