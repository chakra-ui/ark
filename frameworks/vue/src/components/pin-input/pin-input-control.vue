<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PinInputControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputControlProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.div v-bind="pinInput.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
