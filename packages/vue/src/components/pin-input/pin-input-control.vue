<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PinInputControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputControlProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.div v-bind="pinInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
