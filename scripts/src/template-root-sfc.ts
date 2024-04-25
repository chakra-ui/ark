export const rootTemplate = `<script lang="ts">
import type { RootEmits, RootProps } from './{{ CamelCaseComponent }}.types'

export interface {{ PascalCaseComponent }}RootProps extends RootProps, PolymorphicProps {}
export interface {{ PascalCaseComponent }}RootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { use{{ PascalCaseComponent }} } from './use-{{ CamelCaseComponent }}'
import { {{ PascalCaseComponent }}Provider } from './use-{{ CamelCaseComponent }}-context'

const props = defineProps<{{ PascalCaseComponent }}RootProps>()
const emits = defineEmits<{{ PascalCaseComponent }}RootEmits>()

const {{ CamelCaseComponent }} = use{{ PascalCaseComponent }}(props, emits)
{{ PascalCaseComponent }}Provider({{ CamelCaseComponent }})
</script>

<template>
  <ark.div v-bind="{{ CamelCaseComponent }}.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

`
