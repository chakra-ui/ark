import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { label, type LabelVariantProps } from 'styled-system/recipes'

export type LabelProps = LabelVariantProps & ComponentPropsWithoutRef<typeof ark.label>
export const Label = styled(ark.label, label)
