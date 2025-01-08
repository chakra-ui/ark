<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './menu.types'

export interface MenuRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface MenuRootProps extends MenuRootBaseProps {}
export interface MenuRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { computed,onMounted } from 'vue'
import { RenderStrategyPropsProvider,useForwardExpose } from '../../utils'
import { useMenu } from './use-menu'
import { MenuProvider,useMenuContext } from './use-menu-context'
import { MenuMachineProvider,useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'
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
