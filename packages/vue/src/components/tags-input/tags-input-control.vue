<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputControlProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.div v-bind="tagsInput.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
