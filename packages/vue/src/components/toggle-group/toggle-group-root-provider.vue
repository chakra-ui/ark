<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseToggleGroupReturn } from './use-toggle-group'

interface RootProviderProps {
  value: UnwrapRef<UseToggleGroupReturn>
}

export interface ToggleGroupRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { ToggleGroupProvider } from './use-toggle-group-context'

const props = defineProps<ToggleGroupRootProviderProps>()
const toggleGroup = computed(() => props.value)

ToggleGroupProvider(toggleGroup)
</script>

<template>
  <ark.div v-bind="toggleGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
