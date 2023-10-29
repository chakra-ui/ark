import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { textarea, type TextareaVariantProps } from 'styled-system/recipes'

export type TextareaProps = TextareaVariantProps & ComponentPropsWithoutRef<typeof ark.textarea>
export const Textarea = styled(ark.textarea, textarea)
