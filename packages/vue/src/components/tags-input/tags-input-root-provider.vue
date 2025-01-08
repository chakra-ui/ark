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
import { computed } from 'vue'
import { ark } from '../factory'
import { TagsInputProvider } from './use-tags-input-context'
import { useForwardExpose } from '../../utils'

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
