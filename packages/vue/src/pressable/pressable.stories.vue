<script setup lang="ts">
import { Pressable } from '.'

const handlePress = () => console.log('onPress')
</script>
<template>
  <Pressable @press="handlePress">Pressable</Pressable>
</template>
