<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface SwitchThumbProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchThumbProps>()
const context = useSwitchContext()
</script>

<template>
  <ark.div v-bind="context.thumbProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
