<script lang="ts">
import type { ItemGroupProps } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface CommandItemGroupProps
  extends
    CommandItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useId } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { CommandItemGroupPropsProvider } from './use-command-item-group-props-context.ts'

const props = defineProps<CommandItemGroupProps>()
const command = useCommandContext()

const uid = useId()
const id = props.id ?? uid

const mergedProps = computed(() => mergeProps(command.value.getItemGroupProps({ id }), parts.itemGroup.attrs('')))

CommandItemGroupPropsProvider({ id })
useForwardExpose()
</script>

<template>
  <ark.div v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
