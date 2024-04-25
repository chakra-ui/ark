<script lang="ts">
import type { ItemProps } from '@zag-js/toggle-group'
import type { PolimoprhicProps } from '../factory'

export interface ToggleGroupItemProps extends PolimoprhicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useToggleGroupContext } from './use-toggle-group-context'

const props = defineProps<ToggleGroupItemProps>()
const toggleGroup = useToggleGroupContext()
</script>

<template>
  <ark.button v-bind="toggleGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
