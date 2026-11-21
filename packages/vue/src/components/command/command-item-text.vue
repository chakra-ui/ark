<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandItemTextBaseProps extends PolymorphicProps {}
export interface CommandItemTextProps
  extends
    CommandItemTextBaseProps,
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
import { useCommandItemPropsContext } from './use-command-item-props-context.ts'

defineProps<CommandItemTextProps>()
const command = useCommandContext()
const itemProps = useCommandItemPropsContext()
const mergedProps = computed(() => mergeProps(command.value.getItemTextProps(itemProps), parts.itemText.attrs('')))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
