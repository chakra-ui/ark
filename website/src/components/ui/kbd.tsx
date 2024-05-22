import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type KbdVariantProps, kbd } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface KbdProps extends Assign<JsxStyleProps, HTMLArkProps<'kbd'>>, KbdVariantProps {}
export const Kbd = styled(ark.kbd, kbd)
