<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandListBaseProps extends PolymorphicProps {}
export interface CommandListProps
  extends
    CommandListBaseProps,
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

defineProps<CommandListProps>()
const command = useCommandContext()

const keepInputFocus = (event: PointerEvent) => {
  if (event.button === 0) event.preventDefault()
}

const mergedProps = computed(() =>
  mergeProps(command.value.getListProps(), parts.list.attrs(''), { onPointerdown: keepInputFocus }),
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
