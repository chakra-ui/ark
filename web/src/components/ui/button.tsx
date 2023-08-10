import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { button, type ButtonVariantProps } from 'styled-system/recipes'

export type ButtonProps = ButtonVariantProps & ComponentPropsWithoutRef<'button'>
export const Button = styled('button', button)
