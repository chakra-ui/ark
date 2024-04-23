<script setup lang="ts">
import AvatarFallback from '../avatar-fallback.vue'
import AvatarImage from '../avatar-image.vue'
import AvatarRoot from '../avatar-root.vue'
</script>

<template>
  <AvatarRoot dir="rtl" @status-change="e => console.log(e.status)">
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
  </AvatarRoot>
</template>
