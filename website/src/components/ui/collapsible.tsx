'use client'
import type { Assign } from '@ark-ui/react'
import { Collapsible } from '@ark-ui/react/collapsible'
import { type CollapsibleVariantProps, collapsible } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(collapsible)

export interface RootProps
  extends Assign<JsxStyleProps, Collapsible.RootProps>,
    CollapsibleVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Collapsible.Root, 'root')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Collapsible.ContentProps>>(
  Collapsible.Content,
  'content',
)

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Collapsible.TriggerProps>
>(Collapsible.Trigger, 'trigger')

export {
  CollapsibleContext as Context,
  type CollapsibleContextProps as ContextProps,
} from '@ark-ui/react/collapsible'
