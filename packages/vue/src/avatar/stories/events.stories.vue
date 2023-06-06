<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '../'
import '../avatar.css'
</script>
<template>
  <Avatar @error="() => console.log('error')" @load="() => console.log('loaded')">
    <AvatarFallback>PA</AvatarFallback>
    <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
  </Avatar>
</template>
