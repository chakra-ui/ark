'use client'
import type { Assign } from '@ark-ui/react'
import { SignaturePad } from '@ark-ui/react/signature-pad'
import { type SignaturePadVariantProps, signaturePad } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(signaturePad)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, SignaturePad.RootProviderBaseProps>,
    SignaturePadVariantProps
  >
>(SignaturePad.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, SignaturePad.RootBaseProps>, SignaturePadVariantProps>
>(SignaturePad.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, SignaturePad.ClearTriggerBaseProps>
>(SignaturePad.ClearTrigger, 'clearTrigger')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, SignaturePad.ControlBaseProps>
>(SignaturePad.Control, 'control')

export const Guide = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, SignaturePad.GuideBaseProps>
>(SignaturePad.Guide, 'guide')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, SignaturePad.LabelBaseProps>
>(SignaturePad.Label, 'label')

export const Segment = withContext<
  SVGSVGElement,
  Assign<HTMLStyledProps<'svg'>, SignaturePad.SegmentBaseProps>
>(SignaturePad.Segment, 'segment')

export {
  SignaturePadContext as Context,
  SignaturePadHiddenInput as HiddenInput,
} from '@ark-ui/react/signature-pad'
