<script setup lang="ts">
import { Avatar } from '../'
import './avatar.css'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Basic">
      <Avatar.Root>
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
      </Avatar.Root>
    </Variant>

    <Variant title="Events">
      <Avatar @loading-status-change="(details) => console.log(details)">
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
      </Avatar>
    </Variant>
  </Story>
</template>
