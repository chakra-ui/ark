import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type InputVariantProps, input } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface InputProps
  extends Assign<Assign<JsxStyleProps, HTMLArkProps<'input'>>, InputVariantProps> {}
export const Input = styled(ark.input, input)
