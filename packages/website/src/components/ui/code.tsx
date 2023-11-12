import { ark, type HTMLArkProps } from '@ark-ui/react'
import { styled } from 'styled-system/jsx'
import { code, type CodeVariantProps } from 'styled-system/recipes'

export type CodeProps = CodeVariantProps & HTMLArkProps<'code'>
export const Code = styled(ark.code, code)
