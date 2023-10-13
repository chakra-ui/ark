import { styled } from '@ark-ui/styled-system/jsx'
import { input, type InputVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type InputProps = InputVariantProps & ComponentPropsWithoutRef<'input'>
export const Input = styled('input', input)
