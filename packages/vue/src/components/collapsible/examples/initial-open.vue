<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronRightIcon } from 'lucide-vue-next'
import styles from 'styles/collapsible.module.css'
</script>

<template>
  <Collapsible.Root :class="styles.Root" :default-open="true">
    <Collapsible.Trigger :class="styles.Trigger">
      Welcome Message
      <Collapsible.Indicator :class="styles.Indicator">
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content :class="styles.Content">
      <div :class="styles.Body">This content is visible by default when the component first renders.</div>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
