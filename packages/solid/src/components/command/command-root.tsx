import { mergeProps } from '@zag-js/solid'
import type { JSX } from '@solidjs/web'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.tsx'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { type UseCommandProps, useCommand } from './use-command.ts'
import { CommandProvider } from './use-command-context.ts'

export interface CommandRootBaseProps<T extends CollectionItem> extends UseCommandProps<T>, PolymorphicProps<'div'> {}
export interface CommandRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, CommandRootBaseProps<T>> {}

export const CommandRoot = <T extends CollectionItem>(props: CommandRootProps<T>) => {
  const [useCommandProps, localProps] = createSplitProps<UseCommandProps<T>>()(props, [
    'autoFocus',
    'collection',
    'defaultHighlightedValue',
    'defaultInputValue',
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
  const mergedProps = mergeProps(() => command().getRootProps(), parts.root.attrs(''), localProps)

  return (
    <CommandProvider value={command}>
      <ark.div {...mergedProps} />
    </CommandProvider>
  )
}

export type CommandRootComponentProps<T extends CollectionItem = CollectionItem, P = {}> = Assign<
  CommandRootProps<T>,
  P
>

export type CommandRootComponent<P = {}> = <T extends CollectionItem>(
  props: CommandRootComponentProps<T, P>,
) => JSX.Element
