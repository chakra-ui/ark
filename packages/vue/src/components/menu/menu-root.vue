<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './menu.types.ts'

export interface MenuRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface MenuRootProps extends MenuRootBaseProps {}
export interface MenuRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useMenu } from './use-menu.ts'
import { MenuProvider, useMenuContext } from './use-menu-context.ts'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context.ts'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context.ts'

const props = withDefaults(defineProps<MenuRootProps>(), {
  closeOnSelect: undefined,
  composite: undefined,
  defaultOpen: undefined,
  loopFocus: undefined,
  open: undefined,
  typeahead: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<MenuRootEmits>()

const { api, machine } = useMenu(props, emits)

const presence = usePresence(
  computed(() => ({
    present: api.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
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
