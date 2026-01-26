<script setup lang="ts">
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'
import styles from 'styles/toggle-group.module.css'
</script>

<template>
  <ToggleGroup.Root :defaultValue="['bold']" multiple :class="styles.Root">
    <ToggleGroup.Item value="bold" :class="styles.Item">
      <BoldIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="italic" :class="styles.Item">
      <ItalicIcon />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="underline" :class="styles.Item">
      <UnderlineIcon />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
