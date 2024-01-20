<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from '../'
import Avatar from './Avatar.vue'
import './avatar.css'
</script>

<template>
  <Story title="Avatar">
    <Variant title="Basic">
      <AvatarRoot>
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
      </AvatarRoot>
    </Variant>

    <Variant title="Events">
      <AvatarRoot @loading-status-change="(details) => console.log(details)">
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
      </AvatarRoot>
    </Variant>

    <Variant title="Closed">
      <Avatar
        name="Christian Schröter"
        src="https://avatars.githubusercontent.com/u/1846056?v=4"
        @loading-status-change="(details) => console.log(details)"
      />
      <Avatar name="Christian Schröter" />
    </Variant>
  </Story>
</template>
