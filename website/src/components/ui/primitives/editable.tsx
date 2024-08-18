'use client'
import type { Assign } from '@ark-ui/react'
import { Editable } from '@ark-ui/react/editable'
import { type EditableVariantProps, editable } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(editable)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Editable.RootProviderBaseProps>, EditableVariantProps>
>(Editable.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Editable.RootBaseProps>, EditableVariantProps>
>(Editable.Root, 'root')

export const Area = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Editable.AreaBaseProps>
>(Editable.Area, 'area')

export const CancelTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Editable.CancelTriggerBaseProps>
>(Editable.CancelTrigger, 'cancelTrigger')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Editable.ControlBaseProps>
>(Editable.Control, 'control')

export const EditTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Editable.EditTriggerBaseProps>
>(Editable.EditTrigger, 'editTrigger')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, Editable.InputBaseProps>
>(Editable.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Editable.LabelBaseProps>
>(Editable.Label, 'label')

export const Preview = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Editable.PreviewBaseProps>
>(Editable.Preview, 'preview')

export const SubmitTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Editable.SubmitTriggerBaseProps>
>(Editable.SubmitTrigger, 'submitTrigger')

export { EditableContext as Context } from '@ark-ui/react/editable'
