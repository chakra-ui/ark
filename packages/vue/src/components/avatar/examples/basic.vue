<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
import styles from 'styles/avatar.module.css'
</script>

<template>
  <Avatar.Root :class="styles.Root">
    <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
    <Avatar.Image :class="styles.Image" src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.Root>
</template>
