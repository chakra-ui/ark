'use client'
import type { Assign } from '@ark-ui/react'
import { Avatar } from '@ark-ui/react/avatar'
import { type AvatarVariantProps, avatar } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(avatar)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Avatar.RootProviderBaseProps>, AvatarVariantProps>
>(Avatar.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Avatar.RootBaseProps>, AvatarVariantProps>
>(Avatar.Root, 'root')

export const Fallback = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Avatar.FallbackBaseProps>
>(Avatar.Fallback, 'fallback')

export const Image = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<'img'>, Avatar.ImageBaseProps>
>(Avatar.Image, 'image')

export { AvatarContext as Context } from '@ark-ui/react/avatar'
export type { AvatarStatusChangeDetails as StatusChangeDetails } from '@ark-ui/react/avatar'
