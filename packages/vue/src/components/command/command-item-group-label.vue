<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandItemGroupLabelBaseProps extends PolymorphicProps {}
export interface CommandItemGroupLabelProps
  extends
    CommandItemGroupLabelBaseProps,
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
import { useCommandItemGroupPropsContext } from './use-command-item-group-props-context.ts'

defineProps<CommandItemGroupLabelProps>()
const command = useCommandContext()
const itemGroupProps = useCommandItemGroupPropsContext()
const mergedProps = computed(() =>
  mergeProps(command.value.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }), parts.itemGroupLabel.attrs('')),
)

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
