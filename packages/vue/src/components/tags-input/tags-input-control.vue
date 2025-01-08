<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputControlBaseProps extends PolymorphicProps {}
export interface TagsInputControlProps
  extends TagsInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputControlProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
