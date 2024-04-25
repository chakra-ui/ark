<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface SwitchLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';
import { useSwitchContext } from './use-switch-context';

defineProps<SwitchLabelProps>()
const context = useSwitchContext()
</script>

<template>
  <ark.span v-bind="context.labelProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>