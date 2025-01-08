<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './radio-group.types'

export interface RadioGroupRootBaseProps extends RootProps, PolymorphicProps {}
export interface RadioGroupRootProps
  extends RadioGroupRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface RadioGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRadioGroup } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<RadioGroupRootEmits>()

const radioGroup = useRadioGroup(props, emits)
RadioGroupProvider(radioGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="radioGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
