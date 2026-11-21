<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Assign, BooleanDefaults } from '../../types.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './command.types.ts'

export interface CommandRootBaseProps<T extends CollectionItem> extends RootProps<T>, PolymorphicProps {}

export interface CommandRootProps<T extends CollectionItem>
  extends
    CommandRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}

export type CommandRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  CommandRootProps<T>,
  P
>

export type CommandRootComponent<P = {}> = <T extends CollectionItem>(props: CommandRootComponentProps<T, P>) => any

export type { RootEmits as CommandRootEmits } from './command.types.ts'
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommand } from './use-command.ts'
import { CommandProvider } from './use-command-context.ts'

const props = withDefaults(defineProps<CommandRootProps<T>>(), {
  autoFocus: undefined,
  disabled: undefined,
  loading: undefined,
  loopFocus: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

defineSlots<PolymorphicSlots>()

const emits = defineEmits<RootEmits<T>>()

const command = useCommand(props, emits)
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
