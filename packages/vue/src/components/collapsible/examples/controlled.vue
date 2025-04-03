<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Collapsible.Root v-model:open="open">
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
</template>
