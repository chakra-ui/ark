<script setup lang="ts">
import { Pressable } from '.'

const handlePress = () => alert('onPress')
</script>
<template>
  <Story title="Pressable - Basic">
    <Pressable @press="handlePress">Pressable</Pressable>
  </Story>
</template>
