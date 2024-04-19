<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from '..'
</script>

<template>
  <AvatarRoot @status-change="e => console.log(e)">
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </AvatarRoot>
</template>