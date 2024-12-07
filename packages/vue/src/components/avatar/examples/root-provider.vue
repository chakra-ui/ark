<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue/avatar'

const avatar = useAvatar()
</script>

<template>
  <button @click="avatar.setSrc('https://new-source.com')">Change Source</button>

  <Avatar.RootProvider :value="avatar">
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" alt="avatar" />
  </Avatar.RootProvider>
</template>
