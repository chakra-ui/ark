<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './select.types'

export interface SelectRootProps
  extends RootProps,
    RenderStrategyProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SelectRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

const props = withDefaults(defineProps<SelectRootProps>(), {
  closeOnSelect: undefined,
  composite: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  invalid: undefined,
  loopFocus: undefined,
  multiple: undefined,
  open: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<SelectRootEmits>()

const select = useSelect(props, emits)
SelectProvider(select)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="select.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
