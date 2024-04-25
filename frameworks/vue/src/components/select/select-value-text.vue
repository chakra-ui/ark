<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { selectAnatomy } from '@ark-ui/anatomy'

defineProps<SelectValueTextProps>()
const select = useSelectContext()
</script>

<template>
  <ark.span v-bind="selectAnatomy.build().valueText.attrs" :as-child="asChild">
    <!-- TODO -->
    <!-- {slots.default?.() || api.value.valueAsString || props.placeholder} -->
    {{ select.valueAsString }}
  </ark.span>
</template>
