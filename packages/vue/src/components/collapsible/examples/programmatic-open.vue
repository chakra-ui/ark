<script setup lang="ts">
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { ChevronRightIcon } from 'lucide-vue-next'

const collapsible = useCollapsible()
</script>

<template>
  <div>
    <p>
      Open:
      <strong>{{ String(collapsible.open) }}</strong>
    </p>
    <p>
      Visible:
      <strong>{{ String(collapsible.visible) }}</strong>
    </p>
  </div>

  <div style="display: flex; gap: 8px; margin-top: 8px">
    <button type="button" @click="collapsible.setOpen(true)">Open</button>
    <button type="button" @click="collapsible.setOpen(false)">Close</button>
  </div>

  <Collapsible.RootProvider :value="collapsible">
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.RootProvider>
</template>
