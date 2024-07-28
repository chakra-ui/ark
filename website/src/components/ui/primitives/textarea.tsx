import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { textarea } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type TextareaProps = ComponentProps<typeof Textarea>
export const Textarea = styled(ark.textarea, textarea)
