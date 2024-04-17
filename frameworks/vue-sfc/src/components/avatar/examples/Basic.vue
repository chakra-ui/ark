<script setup lang="ts">
import AvatarFallback from '../avatar-fallback.vue'
import AvatarImage from '../avatar-image.vue'
import AvatarRoot from '../avatar-root.vue'
</script>

<template>
  <AvatarRoot>
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </AvatarRoot>
</template>