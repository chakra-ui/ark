<script setup lang="ts">
import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type HTMLAttributes, type SlotsType, type VNodeChild, computed, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { type PolymorphicProps, ark } from '../factory'
import type { CreateToasterReturn } from './create-toaster'
import ToasterItem from './toaster-item.vue'

export interface ToasterBaseProps extends PolymorphicProps {
  toaster: CreateToasterReturn
}

export interface ToasterProps
  extends ToasterBaseProps,
    /** @vue-ignore */
    HTMLAttributes,
    /** @vue-ignore */
    SlotsType<{
      default: toast.Options<VNodeChild>
    }> {}

const props = defineProps<ToasterProps>()

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
  <ark.div v-bind="api.getGroupProps()">
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
  </ark.div>
</template>
