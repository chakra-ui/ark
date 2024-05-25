import type { Assign, HTMLArkProps } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type IconButtonVariantProps, iconButton } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface IconButtonProps
  extends Assign<JsxStyleProps, HTMLArkProps<'button'>>,
    IconButtonVariantProps {}
export const IconButton = styled(ark.button, iconButton)
