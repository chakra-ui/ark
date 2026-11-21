<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/combobox'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface CommandItemState extends ItemState {}
export interface CommandItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CommandItemProps
  extends
    CommandItemBaseProps,
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
import { CommandItemProvider } from './use-command-item-context.ts'
import { CommandItemPropsProvider } from './use-command-item-props-context.ts'

const props = withDefaults(defineProps<CommandItemProps>(), {
  persistFocus: true,
})

defineSlots<PolymorphicSlots<CommandItemState>>()

const command = useCommandContext()
const itemState = computed(() => command.value.getItemState(props))
const mergedProps = computed(() =>
  mergeProps(command.value.getItemProps(props), parts.item.attrs(''), {
    hidden: !command.value.collection.has(itemState.value.value),
  }),
)

CommandItemPropsProvider(props)
CommandItemProvider(itemState)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="mergedProps" :state="itemState" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
