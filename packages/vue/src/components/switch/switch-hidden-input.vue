<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps
  extends
    SwitchHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSwitchContext } from './use-switch-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SwitchHiddenInputProps>()

const context = useSwitchContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby" v-bind="context.getHiddenInputProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
