'use client'
import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { type AlertVariantProps, alert } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(alert)

export interface RootProps extends Assign<JsxStyleProps, HTMLArkProps<'div'>>, AlertVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(ark.div, 'root')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, HTMLArkProps<'div'>>>(
  ark.div,
  'content',
)

export const Description = withContext<HTMLDivElement, Assign<JsxStyleProps, HTMLArkProps<'div'>>>(
  ark.div,
  'description',
)

export const Icon = withContext<HTMLOrSVGElement, Assign<JsxStyleProps, HTMLArkProps<'svg'>>>(
  ark.svg,
  'icon',
)

export const Title = withContext<HTMLHeadingElement, Assign<JsxStyleProps, HTMLArkProps<'h5'>>>(
  ark.h5,
  'title',
)
