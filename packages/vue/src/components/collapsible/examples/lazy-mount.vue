<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/collapsible.module.css'
</script>

<template>
  <Collapsible.Root :class="styles.Root" lazy-mount unmount-on-exit>
    <Collapsible.Trigger :class="styles.Trigger">
      Session Details
      <Collapsible.Indicator :class="styles.Indicator">
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content :class="styles.Content">
      <div :class="styles.Body">
        This content is lazily mounted when first opened and removed from the DOM when collapsed.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
