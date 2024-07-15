<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { UseHighlightProps } from './use-highlight'

export interface HighlightBaseProps extends UseHighlightProps {}

export interface HighlightProps
  extends HighlightBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script lang="ts" setup>
import { useHighlight } from './use-highlight'

const props = defineProps<HighlightProps>()

if (typeof props.text !== 'string') {
  throw new Error('[ark-ui/highlight] text must be a string')
}

const chunks = useHighlight(props)
</script>

<template>
  <template v-for="chunk in chunks">
    <mark v-if="chunk.match">{{ chunk.text }}</mark>
    <template v-else>
      {{ chunk.text }}
    </template>
  </template>
</template>
