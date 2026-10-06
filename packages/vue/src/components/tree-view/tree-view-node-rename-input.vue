<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps {}
export interface TreeViewNodeRenameInputProps
  extends
    TreeViewNodeRenameInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

defineProps<TreeViewNodeRenameInputProps>()
const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

const { forwardRef, currentElement } = useForwardExpose()

const renaming = computed(() => treeView.value.getNodeState(nodeProps).renaming)

const focusInput = () => {
  const inputEl = currentElement.value as HTMLInputElement | undefined
  if (!renaming.value || !inputEl) return
  inputEl.value = treeView.value.collection.stringifyNode(nodeProps.node)
  inputEl.focus()
  inputEl.select()
}

onMounted(focusInput)
watch(renaming, focusInput, { flush: 'post' })
</script>

<template>
  <ark.input :ref="forwardRef" v-bind="treeView.getNodeRenameInputProps(nodeProps)" :as-child="asChild">
    <slot />
  </ark.input>
</template>
