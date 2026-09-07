<script lang="ts">
import type { RootState } from '@zag-js/tags-input'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseTagsInputReturn } from './use-tags-input.ts'

interface RootProviderProps {
  value: UnwrapRef<UseTagsInputReturn>
}

export interface TagsInputRootProviderState extends RootState {}
export interface TagsInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TagsInputRootProviderProps
  extends
    TagsInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { TagsInputProvider } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TagsInputRootProviderProps>()

defineSlots<PolymorphicSlots<TagsInputRootProviderState>>()
const tagsInput = computed(() => props.value)

TagsInputProvider(tagsInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getRootProps()" :state="tagsInput.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
