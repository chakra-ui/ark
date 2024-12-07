<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
</script>

<template>
  <Avatar.Root>
    <Avatar.Context v-slot="avatar">
      <Avatar.Fallback>
        {{ avatar.loaded ? 'PA' : 'Loading' }}
      </Avatar.Fallback>
    </Avatar.Context>
    <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" alt="avatar" />
  </Avatar.Root>
</template>
