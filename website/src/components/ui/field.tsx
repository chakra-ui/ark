import type { Assign } from '@ark-ui/react'
import { Field } from '@ark-ui/react/field'
import { field } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(field)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Field.RootProviderBaseProps>
>(Field.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Field.RootBaseProps>
>(Field.Root, 'root')

export type FallbackProps = ComponentProps<typeof Fallback>
export const Fallback = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Field.FallbackBaseProps>
>(Field.Fallback, 'fallback')

export type ImageProps = ComponentProps<typeof Image>
export const Image = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<'img'>, Field.ImageBaseProps>
>(Field.Image, 'image')

export {
  FieldContext as Context,
  type FieldContextProps as ContextProps,
} from '@ark-ui/react/field'
