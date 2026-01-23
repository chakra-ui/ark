<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue/avatar'
import styles from 'styles/avatar.module.css'

const avatar = useAvatar()
</script>

<template>
  <button @click="avatar.setSrc('https://new-source.com')">Change Source</button>

  <Avatar.RootProvider :class="styles.Root" :value="avatar">
    <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
    <Avatar.Image :class="styles.Image" src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
  </Avatar.RootProvider>
</template>
