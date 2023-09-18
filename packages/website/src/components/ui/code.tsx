import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { code, type CodeVariantProps } from 'styled-system/recipes'

export type CodeProps = CodeVariantProps & ComponentPropsWithoutRef<typeof ark.code>
export const Code = styled(ark.div, code)
