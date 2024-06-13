<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { GroupEmits, GroupProps } from './checkbox-group.types.ts'

export interface CheckboxGroupProps
  extends GroupProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface CheckboxGroupEmits extends GroupEmits {}
</script>

<script setup lang="ts">
import { checkboxAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'
import { useCheckboxGroup } from './use-checkbox-group'
import { CheckboxGroupProvider } from './use-checkbox-group-context'

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  disabled: undefined,
  readOnly: undefined,
} satisfies BooleanDefaults<GroupProps>)

const emits = defineEmits<CheckboxGroupEmits>()

const checkboxGroup = useCheckboxGroup(props, emits)
CheckboxGroupProvider(checkboxGroup)
</script>

<template>
  <ark.div role="group" v-bind="{ ...checkboxAnatomy.build().group.attrs }" :as-child="asChild">
    <slot />
  </ark.div>
</template>
