<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
import { ref } from 'vue'
import styles from 'styles/avatar.module.css'

const status = ref('loading...')
</script>

<template>
  <div class="vstack">
    <output>Status: {{ status }}</output>
    <Avatar.Root :class="styles.Root" @status-change="(e) => (status = e.status)">
      <Avatar.Fallback :class="styles.Fallback">PA</Avatar.Fallback>
      <Avatar.Image :class="styles.Image" src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
    </Avatar.Root>
  </div>
</template>
