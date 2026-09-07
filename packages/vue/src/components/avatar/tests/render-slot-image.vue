<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
</script>

<template>
  <Avatar.Root>
    <Avatar.Image src="x.png" #render="ctx">
      <img v-bind="ctx.props" data-testid="i" alt="" />
    </Avatar.Image>
  </Avatar.Root>
</template>
