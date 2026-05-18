<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseToggleGroupReturn } from './use-toggle-group.ts'

interface RootProviderProps {
  value: UnwrapRef<UseToggleGroupReturn>
}

export interface ToggleGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ToggleGroupRootProviderProps
  extends
    ToggleGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ToggleGroupRootProviderProps>()
const toggleGroup = computed(() => props.value)

ToggleGroupProvider(toggleGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="toggleGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
