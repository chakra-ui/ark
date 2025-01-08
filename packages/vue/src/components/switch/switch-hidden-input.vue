<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps
  extends SwitchHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchHiddenInputProps>()

const context = useSwitchContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="context.getHiddenInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
