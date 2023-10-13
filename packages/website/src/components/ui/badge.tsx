import { styled } from '@ark-ui/styled-system/jsx'
import { badge, type BadgeVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type BadgeProps = BadgeVariantProps & ComponentPropsWithoutRef<'div'>
export const Badge = styled('div', badge)
