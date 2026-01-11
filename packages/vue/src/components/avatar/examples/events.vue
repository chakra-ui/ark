<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
import styles from 'styles/avatar.module.css'
</script>

<template>
  <Avatar.Root :class="styles.Root" @status-change="(e) => console.log(e.status)">
    <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
    <Avatar.Image :class="styles.Image" src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.Root>
</template>
