<script setup lang="ts">
// @ts-expect-error
import { Button } from '@acme/ui-lib'
import { Popover } from '../..'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button>Open</Button>
    </Popover.Trigger>
  </Popover.Root>
</template>
