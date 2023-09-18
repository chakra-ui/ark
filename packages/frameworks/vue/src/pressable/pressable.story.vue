<script setup lang="ts">
import { Pressable } from '.'

const handlePress = () => console.log('onPress')
</script>
<template>
  <Story title="Pressable">
    <Variant title="Basic">
      <Pressable @press="handlePress">Pressable</Pressable>
    </Variant>
  </Story>
</template>
