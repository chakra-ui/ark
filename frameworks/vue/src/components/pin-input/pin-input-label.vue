<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PinInputLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputLabelProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.label v-bind="pinInput.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
