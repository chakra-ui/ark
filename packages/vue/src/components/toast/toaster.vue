<script setup lang="ts">
import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type HTMLAttributes, type VNodeChild, computed, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import type { CreateToasterReturn } from './create-toaster.ts'
import ToasterItem from './toaster-item.vue'

export type ToastOptions = toast.Options<VNodeChild>

export interface ToasterBaseProps {
  toaster: CreateToasterReturn<any>
}

export interface ToasterProps
  extends
    ToasterBaseProps,
    /** @vue-ignore */
    HTMLAttributes {}

export interface ToasterSlots {
  default: (toast: ToastOptions) => VNodeChild
}

const props = defineProps<ToasterProps>()
defineSlots<ToasterSlots>()

const locale = useLocaleContext(DEFAULT_LOCALE)
const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

const service = useMachine(toast.group.machine, {
  store: props.toaster,
  id: useId(),
  dir: locale?.value.dir,
  getRootNode: env?.value.getRootNode,
})

const api = computed(() => toast.group.connect(service, normalizeProps))

useForwardExpose()
</script>

<template>
  <div v-bind="api.getGroupProps()">
    <ToasterItem
      v-for="(toastItem, index) in api.getToasts()"
      :key="toastItem.id"
      :value="toastItem"
      :parent="service"
      :index="index"
    >
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </ToasterItem>
  </div>
</template>
