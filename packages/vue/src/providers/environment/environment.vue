<script setup lang="ts">
import { getDocument, getWindow } from '@zag-js/dom-query'
import { computed, ref } from 'vue'
import { runIfFn } from '../../utils'
import { EnvironmentProvider, type RootNode } from './use-environment-context'

export interface EnvironmentProps {
  value?: RootNode | (() => RootNode)
}

const props = defineProps<EnvironmentProps>()
const spanRef = ref<HTMLSpanElement | null>(null)

const getRootNode = () => runIfFn(props.value) ?? spanRef.value?.ownerDocument ?? document

const environment = computed(() => ({
  getRootNode,
  getDocument: () => getDocument(getRootNode()),
  getWindow: () => getWindow(getRootNode()),
}))

EnvironmentProvider(environment)
</script>

<template>
  <slot></slot>
  <span v-if="!props.value" hidden ref="spanRef"></span>
</template>
