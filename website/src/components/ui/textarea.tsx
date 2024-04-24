import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { textarea } from 'styled-system/recipes'

export const Textarea = styled(ark.textarea, textarea)
export interface TextareaProps extends ComponentProps<typeof Textarea> {}
