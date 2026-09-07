<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger #render="ctx">
      <a href="#" v-bind="ctx.props" data-testid="t">Open</a>
    </Popover.Trigger>
  </Popover.Root>
</template>
