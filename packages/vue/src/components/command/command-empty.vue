<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandEmptyBaseProps extends PolymorphicProps {}
export interface CommandEmptyProps
  extends
    CommandEmptyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

defineProps<CommandEmptyProps>()
const command = useCommandContext()
const isEmpty = computed(() => command.value.collection.size === 0)
const mergedProps = computed(() => mergeProps(command.value.getEmptyProps(), parts.empty.attrs('')))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot v-if="isEmpty" />
    </template>
  </ark.div>
</template>
