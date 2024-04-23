<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

const avatar = useAvatarContext()
</script>

<template>
  <img v-bind="avatar.imageProps" />
</template>