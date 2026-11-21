'use client'

import { mergeProps } from '@zag-js/react'
import { type JSX, type Ref, type RefAttributes, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { type UseCommandProps, useCommand } from './use-command.ts'
import { CommandProvider } from './use-command-context.ts'

export interface CommandRootBaseProps<T extends CollectionItem> extends UseCommandProps<T>, PolymorphicProps {}
export interface CommandRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, CommandRootBaseProps<T>> {}

const CommandImpl = <T extends CollectionItem>(props: CommandRootProps<T>, ref: Ref<HTMLDivElement>) => {
  const [useCommandProps, localProps] = createSplitProps<UseCommandProps<T>>()(props, [
    'autoFocus',
    'collection',
    'defaultHighlightedValue',
    'defaultInputValue',
    'defaultPage',
    'disabled',
    'filter',
    'highlightedValue',
    'id',
    'ids',
    'inputValue',
    'loading',
    'loopFocus',
    'navigate',
    'onHighlightChange',
    'onInputValueChange',
    'onPageChange',
    'onSelect',
    'placeholder',
    'scrollToIndexFn',
    'translations',
  ])
  const command = useCommand(useCommandProps)
  const mergedProps = mergeProps(command.getRootProps(), parts.root.attrs(''), localProps)

  return (
    <CommandProvider value={command}>
      <ark.div {...mergedProps} ref={ref} />
    </CommandProvider>
  )
}

export type CommandRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  CommandRootProps<T>,
  P
> &
  RefAttributes<HTMLDivElement>

export type CommandRootComponent<P = {}> = <T extends CollectionItem>(
  props: CommandRootComponentProps<T, P>,
) => JSX.Element

export const CommandRoot = forwardRef(CommandImpl) as CommandRootComponent
