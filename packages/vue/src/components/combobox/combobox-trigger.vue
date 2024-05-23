<script lang="ts">
import type { TriggerProps } from '@zag-js/combobox'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxTriggerProps
  extends TriggerProps,
    PolymorphicProps,
    /* @vue-ignore */ ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

const props = defineProps<ComboboxTriggerProps>()
const combobox = useComboboxContext()
</script>

<template>
  <ark.button v-bind="combobox.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
