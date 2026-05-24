<script setup lang="ts">
import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type VNodeChild, computed } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ToastProvider } from './use-toast-context.ts'

interface ToastItemProps {
  value: toast.Options<VNodeChild>
  index: number
  parent: toast.GroupService
}

const props = defineProps<ToastItemProps>()

const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

const machineProps = computed(() => ({
  ...props.value,
  index: props.index,
  parent: props.parent,
  getRootNode: env?.value.getRootNode,
}))

const service = useMachine(toast.machine, machineProps)
const api = computed(() => toast.connect(service, normalizeProps))

ToastProvider(api)

useForwardExpose()
</script>

<template>
  <slot v-bind="props.value" />
</template>
