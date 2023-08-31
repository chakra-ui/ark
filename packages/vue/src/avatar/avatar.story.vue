<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from './'
import './avatar.css'
</script>

<template>
  <Story>
    <Avatar @load="() => console.log('loaded')">
      <AvatarFallback>PA</AvatarFallback>
      <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
    </Avatar>
  </Story>
</template>
