<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTagsInputReturn } from './use-tags-input'

interface RootProviderProps {
  value: UnwrapRef<UseTagsInputReturn>
}

export interface TagsInputRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { TagsInputProvider } from './use-tags-input-context'

const props = defineProps<TagsInputRootProviderProps>()
const tagsInput = computed(() => props.value)

TagsInputProvider(tagsInput)
</script>

<template>
  <ark.div v-bind="tagsInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
