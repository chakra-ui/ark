<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue/avatar'

const avatar = useAvatar({
  onStatusChange: (e) => console.log('status changed', e),
})
</script>

<template>
  <Avatar.RootProvider :value="avatar">
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.RootProvider>
</template>
