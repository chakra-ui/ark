import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { input, type InputVariantProps } from 'styled-system/recipes'

export type InputProps = InputVariantProps & ComponentPropsWithoutRef<typeof ark.input>
export const Input = styled(ark.input, input)
