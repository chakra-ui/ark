import { mergeProps } from '@zag-js/solid'
import type { JSX } from '@solidjs/web'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.tsx'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import type { UseCommandReturn } from './use-command.ts'
import { CommandProvider } from './use-command-context.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UseCommandReturn<T>
}

export interface CommandRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps<'div'> {}
export interface CommandRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, CommandRootProviderBaseProps<T> {}

export const CommandRootProvider = <T extends CollectionItem>(props: CommandRootProviderProps<T>) => {
  const [{ value: command }, localProps] = createSplitProps<RootProviderProps<T>>()(props, ['value'])
  const mergedProps = mergeProps(() => command().getRootProps(), parts.root.attrs(''), localProps)

  return (
    <CommandProvider value={command}>
      <ark.div {...mergedProps} />
    </CommandProvider>
  )
}

export type CommandRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<CommandRootProviderProps<T>, P>,
) => JSX.Element
