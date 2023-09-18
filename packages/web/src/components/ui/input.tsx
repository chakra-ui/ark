import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { input, type InputVariantProps } from 'styled-system/recipes'

export type InputProps = InputVariantProps & ComponentPropsWithoutRef<'input'>
export const Input = styled('input', input)
