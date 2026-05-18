<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { GroupEmits, GroupProps } from './checkbox-group.types.ts'

export interface CheckboxGroupBaseProps extends GroupProps, PolymorphicProps {}
export interface CheckboxGroupProps
  extends
    CheckboxGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface CheckboxGroupEmits extends GroupEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { checkboxAnatomy } from './checkbox.anatomy.ts'
import { useCheckboxGroup } from './use-checkbox-group.ts'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context.tsx'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  disabled: undefined,
  readOnly: undefined,
  invalid: undefined,
} satisfies BooleanDefaults<GroupProps>)

const emits = defineEmits<CheckboxGroupEmits>()

const checkboxGroup = useCheckboxGroup(props, emits)
CheckboxGroupContextProvider(checkboxGroup)

useForwardExpose()
</script>

<template>
  <ark.div role="group" v-bind="{ ...checkboxAnatomy.build().group.attrs }" :as-child="asChild">
    <slot />
  </ark.div>
</template>
