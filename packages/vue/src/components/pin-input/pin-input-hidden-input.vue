<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps {}
export interface PinInputHiddenInputProps
  extends
    PinInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PinInputHiddenInputProps>()

const pinInput = usePinInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby" v-bind="pinInput.getHiddenInputProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
