import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { label, type LabelVariantProps } from 'styled-system/recipes'

export type LabelProps = LabelVariantProps & ComponentPropsWithoutRef<'label'>
export const Label = styled('label', label)
