<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTagsInputReturn } from './use-tags-input'

interface RootProviderProps {
  value: UnwrapRef<UseTagsInputReturn>
}

export interface TagsInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TagsInputRootProviderProps
  extends TagsInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { TagsInputProvider } from './use-tags-input-context'
const props = defineProps<TagsInputRootProviderProps>()
const tagsInput = computed(() => props.value)

TagsInputProvider(tagsInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
