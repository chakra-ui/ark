<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from '..'
</script>

<template>
  <AvatarRoot id="123">
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </AvatarRoot>
</template>