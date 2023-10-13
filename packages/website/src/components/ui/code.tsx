import { ark } from '@ark-ui/react/src'
import { styled } from '@ark-ui/styled-system/jsx'
import { code, type CodeVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type CodeProps = CodeVariantProps & ComponentPropsWithoutRef<typeof ark.code>
export const Code = styled(ark.div, code)
