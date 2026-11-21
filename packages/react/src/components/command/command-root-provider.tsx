'use client'

import { mergeProps } from '@zag-js/react'
import { type JSX, type Ref, type RefAttributes, forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { CollectionItem } from '../collection/index.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import type { UseCommandReturn } from './use-command.ts'
import { CommandProvider } from './use-command-context.ts'

interface RootProviderProps<T extends CollectionItem> {
  value: UseCommandReturn<T>
}

export interface CommandRootProviderBaseProps<T extends CollectionItem>
  extends RootProviderProps<T>, PolymorphicProps {}
export interface CommandRootProviderProps<T extends CollectionItem>
  extends HTMLProps<'div'>, CommandRootProviderBaseProps<T> {}

const CommandImpl = <T extends CollectionItem>(props: CommandRootProviderProps<T>, ref: Ref<HTMLDivElement>) => {
  const [{ value: command }, localProps] = createSplitProps<RootProviderProps<T>>()(props, ['value'])
  const mergedProps = mergeProps(command.getRootProps(), parts.root.attrs(''), localProps)

  return (
    <CommandProvider value={command}>
      <ark.div {...mergedProps} ref={ref} />
    </CommandProvider>
  )
}

export type CommandRootProviderComponent<P = {}> = <T extends CollectionItem>(
  props: Assign<CommandRootProviderProps<T>, P> & RefAttributes<HTMLDivElement>,
) => JSX.Element

export const CommandRootProvider = forwardRef(CommandImpl) as CommandRootProviderComponent
