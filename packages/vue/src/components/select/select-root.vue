<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Assign, BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { CollectionItem } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './select.types'

export interface SelectRootBaseProps<T extends CollectionItem>
  extends RootProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface SelectRootProps<T extends CollectionItem>
  extends SelectRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}

export type SelectRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<SelectRootProps<T>, P>

export type SelectRootComponent<P = {}> = <T extends CollectionItem>(props: SelectRootComponentProps<T, P>) => any

export type { RootEmits as SelectRootEmits } from './select.types'
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

const props = withDefaults(defineProps<SelectRootProps<T>>(), {
  closeOnSelect: undefined,
  composite: undefined,
  defaultOpen: undefined,
  deselectable: undefined,
  disabled: undefined,
  invalid: undefined,
  loopFocus: undefined,
  multiple: undefined,
  open: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

const emits = defineEmits<RootEmits<T>>()

const select = useSelect(props, emits)
SelectProvider(select)

RenderStrategyPropsProvider(
  computed(() => ({
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="select.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
