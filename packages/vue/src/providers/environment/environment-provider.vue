<script setup lang="ts">
import { getDocument, getWindow } from '@zag-js/dom-query'
import { computed, ref } from 'vue'
import { runIfFn } from '../../utils'
import { EnvironmentContextProvider, type RootNode } from './use-environment-context'

export interface EnvironmentProviderProps {
  value?: RootNode | (() => RootNode)
}

const props = defineProps<EnvironmentProviderProps>()
const spanRef = ref<HTMLSpanElement | null>(null)

const getRootNode = () => runIfFn(props.value) ?? spanRef.value?.ownerDocument ?? document

const environment = computed(() => ({
  getRootNode,
  getDocument: () => getDocument(getRootNode()),
  getWindow: () => getWindow(getRootNode()),
}))

EnvironmentContextProvider(environment)
</script>

<template>
  <slot></slot>
  <span v-if="!props.value" hidden ref="spanRef"></span>
</template>
