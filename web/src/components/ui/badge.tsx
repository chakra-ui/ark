import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { badge, type BadgeVariantProps } from 'styled-system/recipes'

export type BadgeProps = BadgeVariantProps & ComponentPropsWithoutRef<'div'>
export const Badge = styled('div', badge)
