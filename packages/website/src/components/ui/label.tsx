import { styled } from '@ark-ui/styled-system/jsx'
import { label, type LabelVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type LabelProps = LabelVariantProps & ComponentPropsWithoutRef<'label'>
export const Label = styled('label', label)
