<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface SelectControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';
import { useSelectContext } from './use-select-context';

defineProps<SelectControlProps>()
const select = useSelectContext()

</script>

<template>
  <ark.div v-bind="select.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
