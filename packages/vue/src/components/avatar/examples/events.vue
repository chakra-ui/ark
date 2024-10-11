<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
</script>

<template>
  <Avatar.Root @status-change="(e) => console.log(e.status)">
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.Root>
</template>
