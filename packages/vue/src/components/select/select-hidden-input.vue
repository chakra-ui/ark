<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectHiddenInputBaseProps extends PolymorphicProps {}
export interface SelectHiddenInputProps
  extends
    SelectHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed, useAttrs } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

defineOptions({ inheritAttrs: false })
defineProps<SelectHiddenInputProps>()

const select = useSelectContext()
const attrs = useAttrs()

const values = computed(() => (select.value.value.length > 0 ? select.value.value : select.value.multiple ? [] : ['']))

const hiddenProps = computed(() => {
  const { name, form, disabled } = select.value.getHiddenSelectProps()
  return { type: 'hidden', name, form, disabled }
})

useForwardExpose()
</script>

<template>
  <ark.input v-for="value in values" :key="value" v-bind="mergeProps({ ...hiddenProps, value }, attrs)" />
</template>
