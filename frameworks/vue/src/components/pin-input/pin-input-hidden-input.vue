<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface PinInputHiddenInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputHiddenInputProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.input v-bind="pinInput.hiddenInputProps" :as-child="asChild" />
</template>
