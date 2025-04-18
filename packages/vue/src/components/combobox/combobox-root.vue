<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './combobox.types'

export interface ComboboxRootBaseProps<T extends CollectionItem>
  extends RootProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface ComboboxRootProps<T extends CollectionItem>
  extends ComboboxRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}
export type { RootEmits as ComboboxRootEmits } from './combobox.types'
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useCombobox } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

const props = withDefaults(defineProps<ComboboxRootProps<T>>(), {
  allowCustomValue: undefined,
  autoFocus: undefined,
  closeOnSelect: undefined,
  composite: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  disableLayer: undefined,
  invalid: undefined,
  loopFocus: undefined,
  multiple: undefined,
  open: undefined,
  openOnChange: undefined,
  openOnClick: undefined,
  openOnKeyPress: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

const emits = defineEmits<RootEmits<T>>()

const combobox = useCombobox(props, emits)
ComboboxProvider(combobox)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="combobox.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
