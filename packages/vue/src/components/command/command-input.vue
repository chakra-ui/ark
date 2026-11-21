<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CommandInputBaseProps extends PolymorphicProps {}
export interface CommandInputProps
  extends
    CommandInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

defineProps<CommandInputProps>()
const command = useCommandContext()
const mergedProps = computed(() => mergeProps(command.value.getInputProps(), parts.input.attrs('')))

useForwardExpose()
</script>

<template>
  <ark.input v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
