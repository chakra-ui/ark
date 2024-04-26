<script setup lang="ts">
import { computed, ref } from 'vue'
import { EnvironmentProvider } from './use-environment-context'

export interface EnvironmentProps {
  value?: ShadowRoot | Document | Node
}

const elRef = ref<HTMLSpanElement>()
const props = defineProps<EnvironmentProps>()

const environment = computed(() => ({
  getRootNode: () => props.value ?? elRef.value?.ownerDocument ?? document,
}))
EnvironmentProvider(environment)
</script>

<template>
  <slot></slot>
  <span hidden ref="{elRef}" v-if="!props.value"></span>
</template>
