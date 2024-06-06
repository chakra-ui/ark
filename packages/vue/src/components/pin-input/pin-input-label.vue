<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PinInputLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputLabelProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.label v-bind="pinInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
