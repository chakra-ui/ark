import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type CodeVariantProps, code } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface CodeProps extends Assign<JsxStyleProps, HTMLArkProps<'code'>>, CodeVariantProps {}
export const Code = styled(ark.code, code)
