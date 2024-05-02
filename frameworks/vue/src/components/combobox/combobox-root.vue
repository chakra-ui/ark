<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './combobox.types'

export interface ComboboxRootProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface ComboboxRootEmits extends RootEmits {}
interface BooleanProps extends BooleanDefaults<RootProps> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { useCombobox } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  allowCustomValue: undefined,
  autoFocus: undefined,
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  dismissable: undefined,
  invalid: undefined,
  loopFocus: undefined,
  multiple: undefined,
  open: undefined,
  openOnChange: undefined,
  openOnClick: undefined,
  openOnKeyPress: undefined,
  readOnly: undefined,
} satisfies BooleanProps)

const emits = defineEmits<ComboboxRootEmits>()

const combobox = useCombobox(props, emits)
ComboboxProvider(combobox)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="combobox.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
