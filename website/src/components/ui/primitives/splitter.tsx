'use client'
import type { Assign } from '@ark-ui/react'
import { Splitter } from '@ark-ui/react/splitter'
import { type SplitterVariantProps, splitter } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(splitter)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Splitter.RootProviderBaseProps>, SplitterVariantProps>
>(Splitter.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Splitter.RootBaseProps>, SplitterVariantProps>
>(Splitter.Root, 'root')

export const Panel = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Splitter.PanelBaseProps>
>(Splitter.Panel, 'panel')

export const ResizeTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Splitter.ResizeTriggerBaseProps>
>(Splitter.ResizeTrigger, 'resizeTrigger')

export { SplitterContext as Context } from '@ark-ui/react/splitter'
