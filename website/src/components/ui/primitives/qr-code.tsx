'use client'
import type { Assign } from '@ark-ui/react'
import { QrCode } from '@ark-ui/react/qr-code'
import { type QrCodeVariantProps, qrCode } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(qrCode)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, QrCode.RootProviderBaseProps>, QrCodeVariantProps>
>(QrCode.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, QrCode.RootBaseProps>, QrCodeVariantProps>
>(QrCode.Root, 'root')

export const Frame = withContext<
  SVGSVGElement,
  Assign<HTMLStyledProps<'svg'>, QrCode.FrameBaseProps>
>(QrCode.Frame, 'frame')

export const Overlay = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, QrCode.OverlayBaseProps>
>(QrCode.Overlay, 'overlay')

export const Pattern = withContext<
  SVGPathElement,
  Assign<HTMLStyledProps<'path'>, QrCode.PatternBaseProps>
>(QrCode.Pattern, 'pattern')

export { QrCodeContext as Context } from '@ark-ui/react/qr-code'
