<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue/avatar'
import styles from 'styles/avatar.module.css'

const avatar = useAvatar({
  onStatusChange: (e) => console.log('status changed', e),
})
</script>

<template>
  <Avatar.RootProvider :class="styles.Root" :value="avatar">
    <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
    <Avatar.Image :class="styles.Image" src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.RootProvider>
</template>
