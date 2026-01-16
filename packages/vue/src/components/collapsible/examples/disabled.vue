<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/collapsible.module.css'
</script>

<template>
  <Collapsible.Root :class="styles.Root" disabled>
    <Collapsible.Trigger :class="styles.Trigger">
      System Requirements
      <Collapsible.Indicator :class="styles.Indicator">
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content :class="styles.Content">
      <div :class="styles.Body">This section is currently unavailable.</div>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
