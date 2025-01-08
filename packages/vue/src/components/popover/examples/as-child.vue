<script setup lang="ts">
// @ts-expect-error
import { Button } from '@acme/ui-lib'
import { Popover } from '@ark-ui/vue/popover' /* PartiallyEnd: #3632/scriptSetup.vue */
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button>Open</Button>
    </Popover.Trigger>
  </Popover.Root>
</template>
