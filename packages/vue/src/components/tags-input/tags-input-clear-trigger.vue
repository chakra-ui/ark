<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputClearTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputClearTriggerProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.button v-bind="tagsInput.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
