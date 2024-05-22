'use client'
import type { Assign } from '@ark-ui/react'
import { Clipboard } from '@ark-ui/react/clipboard'
import { type ClipboardVariantProps, clipboard } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(clipboard)

export interface RootProps
  extends Assign<JsxStyleProps, Clipboard.RootProps>,
    ClipboardVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Clipboard.Root, 'root')

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, Clipboard.ControlProps>>(
  Clipboard.Control,
  'control',
)

export const Indicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Clipboard.IndicatorProps>
>(Clipboard.Indicator, 'indicator')

export const Input = withContext<HTMLInputElement, Assign<JsxStyleProps, Clipboard.InputProps>>(
  Clipboard.Input,
  'input',
)

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, Clipboard.LabelProps>>(
  Clipboard.Label,
  'label',
)

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Clipboard.TriggerProps>
>(Clipboard.Trigger, 'trigger')

export {
  ClipboardContext as Context,
  type ClipboardContextProps as ContextProps,
} from '@ark-ui/react/clipboard'
