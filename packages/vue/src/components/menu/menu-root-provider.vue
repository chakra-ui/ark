<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UseMenuReturn } from './use-menu'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps {
  value: UseMenuReturn
}

export interface MenuRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface MenuRootProviderProps extends MenuRootProviderBaseProps {}
export interface MenuRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

const props = defineProps<MenuRootProviderProps>()
const emits = defineEmits<MenuRootProviderEmits>()

const {
  value: { machine, api },
} = props

const presence = usePresence(
  computed(() => ({
    present: api.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

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
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
