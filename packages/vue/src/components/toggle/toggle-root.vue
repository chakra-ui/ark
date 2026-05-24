<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import type { PolymorphicProps } from '../factory.ts'
import { ark } from '../factory.ts'
import type { RootEmits, RootProps } from './toggle.types.ts'
import { useToggle } from './use-toggle.ts'
import { ToggleProvider } from './use-toggle-context.ts'

export interface ToggleRootBaseProps extends RootProps, PolymorphicProps {}
export interface ToggleRootProps
  extends
    ToggleRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled'> {}
export interface ToggleRootEmits extends RootEmits {}

const props = withDefaults(defineProps<ToggleRootProps>(), {
  disabled: undefined,
  defaultPressed: undefined,
  pressed: undefined,
} satisfies BooleanDefaults<RootProps>)

const emit = defineEmits<ToggleRootEmits>()

const toggle = useToggle(props, emit)

ToggleProvider(toggle)

useForwardExpose()
</script>

<template>
  <ark.button v-bind="toggle.getRootProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
