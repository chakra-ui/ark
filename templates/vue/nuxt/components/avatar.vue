<script setup lang="ts">
import { Avatar } from '@ark-ui/vue'
import './avatar.css'

const id = useId()
</script>

<template>
  <Avatar.Root :id="id">
    <Avatar.Fallback>CS</Avatar.Fallback>
    <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?s=400&u=bc2821d6154517e6f62795b11ffe0e8e001764a5&v=4" alt="avatar" />
  </Avatar.Root>
</template>
