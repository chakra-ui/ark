<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/tooltip.module.css'

interface Tool {
  id: string
  label: string
  shortcut: string
  icon: unknown
}

const tools: Tool[] = [
  { id: 'bold', label: 'Bold', shortcut: '⌘+B', icon: BoldIcon },
  { id: 'italic', label: 'Italic', shortcut: '⌘+I', icon: ItalicIcon },
  { id: 'underline', label: 'Underline', shortcut: '⌘+U', icon: UnderlineIcon },
  { id: 'strikethrough', label: 'Strikethrough', shortcut: '⌘+⇧+X', icon: StrikethroughIcon },
]

const triggerValue = ref<string | null>(null)
const activeTool = computed(() => tools.find((t) => t.id === triggerValue.value) ?? null)
</script>

<template>
  <Tooltip.Root v-model:trigger-value="triggerValue">
    <div :class="styles.Toolbar">
      <Tooltip.Trigger v-for="tool in tools" :key="tool.id" :value="tool.id" :class="styles.ToolbarButton">
        <component :is="tool.icon" />
      </Tooltip.Trigger>
    </div>
    <Teleport to="body">
      <Tooltip.Positioner>
        <Tooltip.Content :class="styles.Content">
          <template v-if="activeTool">
            {{ activeTool.label }}
            <span :class="styles.Shortcut">{{ activeTool.shortcut }}</span>
          </template>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
