<script lang="ts">
import type { InputProps } from '@zag-js/pin-input'
import type { PolymorphicProps } from '../factory'

export interface PinInputInputProps extends PolymorphicProps, InputProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

const props = defineProps<PinInputInputProps>()
const pinInput = usePinInputContext()
</script>

<template>
  <ark.input v-bind="pinInput.getInputProps(props)" :as-child="asChild" />
</template>
