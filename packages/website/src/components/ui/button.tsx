import { ark } from '@ark-ui/react/src'
import { styled } from '@ark-ui/styled-system/jsx'
import { button, type ButtonVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type ButtonProps = ButtonVariantProps & ComponentPropsWithoutRef<typeof ark.button>
export const Button = styled(ark.button, button)
