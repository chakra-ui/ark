<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from './'
import './avatar.css'
</script>

<template>
  <Story>
    <Variant title="Basic">
      <Avatar>
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
      </Avatar>
    </Variant>
    <Variant title="Events">
      <Avatar @load="() => console.log('loaded')" @error="() => console.log('error')">
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
      </Avatar>
    </Variant>
  </Story>
</template>
