<script lang="ts">
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseMenuReturn } from './use-menu'

interface RootProviderProps {
  value: UseMenuReturn
}

export interface MenuRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface MenuRootProviderProps extends MenuRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

const props = defineProps<MenuRootProviderProps>()
const {
  value: { machine, api },
} = props

const parentApi = useMenuContext()
const parentMachine = useMenuMachineContext()

onMounted(() => {
  if (!parentMachine) return
  parentApi.value.setChild(machine)
  api.value.setParent(parentMachine)
})

MenuTriggerItemProvider(computed(() => parentApi.value.getTriggerItemProps(api.value)))
MenuMachineProvider(machine)
MenuProvider(api)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <slot />
</template>
