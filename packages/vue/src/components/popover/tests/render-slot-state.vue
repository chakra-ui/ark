<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger #render="ctx">
      <button v-bind="ctx.props">{{ ctx.state.open ? 'on' : 'off' }}</button>
    </Popover.Trigger>
  </Popover.Root>
</template>
