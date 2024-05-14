import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { input } from 'styled-system/recipes'

export const Input = styled(ark.input, input)
export interface InputProps extends ComponentProps<typeof Input> {}
