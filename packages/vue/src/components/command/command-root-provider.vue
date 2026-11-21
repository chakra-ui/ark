<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseCommandReturn } from './use-command.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UnwrapRef<UseCommandReturn<T>>
}

export interface CommandRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps {}
export interface CommandRootProviderProps<T extends CollectionItem>
  extends
    CommandRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type CommandRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<CommandRootProviderProps<T>, P>,
) => any
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { CommandProvider } from './use-command-context.ts'

const props = defineProps<CommandRootProviderProps<T>>()

defineSlots<PolymorphicSlots>()

const command = computed(() => props.value)
const mergedProps = computed(() => mergeProps(command.value.getRootProps(), parts.root.attrs('')))

CommandProvider(command)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="mergedProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
