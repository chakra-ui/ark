<script lang="ts">
import type { FocusTrapOptions } from '@zag-js/focus-trap'
import type { HTMLProps, PolymorphicProps } from '../factory'
import type { Assign } from '../../types'
import type { BaseProps, BaseEmits } from './focus-trap.types'

export interface FocusTrapBaseProps extends BaseProps, PolymorphicProps {}
export interface FocusTrapProps
  extends FocusTrapBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface FocusTrapEmits extends BaseEmits {}
</script>

<script setup lang="ts">
import { trapFocus } from '@zag-js/focus-trap'
import { watchEffect, ref, onWatcherCleanup, onBeforeUnmount } from 'vue'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { useForwardExpose, cleanProps } from '../../utils'

const props = withDefaults(defineProps<FocusTrapProps>(), {
  disabled: undefined,
  allowOutsideClick: undefined,
  returnFocusOnDeactivate: undefined,
  escapeDeactivates: undefined,
  clickOutsideDeactivates: undefined,
  preventScroll: undefined,
  delayInitialFocus: undefined,
  initialFocus: undefined,
  fallbackFocus: undefined,
  setReturnFocus: undefined,
  checkCanFocusTrap: undefined,
  checkCanReturnFocus: undefined,
  isKeyForward: undefined,
  isKeyBackward: undefined,
})
const emits = defineEmits<BaseEmits>()

const localRef = ref<HTMLDivElement>()
let cleanup: (() => void) | undefined

watchEffect(() => {
  if (props.disabled) return
  const node = localRef.value?.$el
  if (!node) return
  const autoFocusNode = node.querySelector<HTMLElement>('[autofocus], [data-autofocus]')

  const trapProps = cleanProps(props)
  trapProps.initialFocus ||= autoFocusNode ?? undefined

  cleanup = trapFocus(node, trapProps)
  onWatcherCleanup(() => cleanup?.())
})

onBeforeUnmount(() => {
  cleanup?.()
})

useForwardExpose()
</script>

<template>
  <ark.div ref="localRef" :as-child="asChild">
    <slot />
  </ark.div>
</template>
