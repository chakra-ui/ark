<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
</script>

<template>
  <Avatar.Root>
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image as-child>
      <img data-testid="image" src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.Image>
  </Avatar.Root>
</template>
