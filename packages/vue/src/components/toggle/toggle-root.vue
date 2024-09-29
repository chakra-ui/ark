<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import { ark } from '../factory'
import type { RootEmits, RootProps } from './toggle.types'
import { useToggle } from './use-toggle'
import { ToggleProvider } from './use-toggle-context'

export interface ToggleRootBaseProps extends RootProps, PolymorphicProps {}
export interface ToggleRootProps
  extends ToggleRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled'> {}
export interface ToggleRootEmits extends RootEmits {}

const props = withDefaults(defineProps<ToggleRootProps>(), {
  disabled: undefined,
  defaultPressed: undefined,
  modelValue: undefined,
} satisfies BooleanDefaults<RootProps>)

const emit = defineEmits<ToggleRootEmits>()

const toggle = useToggle(props, emit)

ToggleProvider(toggle)
</script>

<template>
  <ark.button v-bind="toggle.getRootProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
