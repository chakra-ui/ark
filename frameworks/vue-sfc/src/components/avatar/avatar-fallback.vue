<script setup lang="ts">
import { useAvatarContext } from './use-avatar-context'

const avatar = useAvatarContext()
</script>

<template>
  <span v-bind="avatar.fallbackProps">
  <slot></slot>
  </span>
</template>