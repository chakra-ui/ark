<script setup lang="ts">
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import styles from 'styles/toggle-group.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

const items = [
  { value: 'bold', label: 'Bold', icon: BoldIcon },
  { value: 'italic', label: 'Italic', icon: ItalicIcon },
  { value: 'underline', label: 'Underline', icon: UnderlineIcon },
]

const getTriggerId = (value?: string) => `toggle-item:${value}`

const tooltip = useTooltip({ ids: { trigger: getTriggerId } })
const activeLabel = computed(() => items.find((item) => item.value === tooltip.value.triggerValue)?.label)
</script>

<template>
  <Tooltip.RootProvider :value="tooltip">
    <ToggleGroup.Root :defaultValue="['bold']" :ids="{ item: getTriggerId }" :class="styles.Root">
      <ToggleGroup.Item
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :aria-label="item.label"
        :class="styles.Item"
        asChild
      >
        <Tooltip.Trigger :value="item.value">
          <component :is="item.icon" />
        </Tooltip.Trigger>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="tooltipStyles.Content">{{ activeLabel }}</Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.RootProvider>
</template>
