<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SwitchHiddenInputProps
  extends PolymorphicProps,
    /* @vue-ignore */ InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

defineProps<SwitchHiddenInputProps>()
const context = useSwitchContext()
</script>

<template>
  <ark.input v-bind="context.hiddenInputProps" :as-child="asChild" />
</template>
