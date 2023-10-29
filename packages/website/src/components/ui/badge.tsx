import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { badge, type BadgeVariantProps } from 'styled-system/recipes'

export type BadgeProps = BadgeVariantProps & ComponentPropsWithoutRef<typeof ark.div>
export const Badge = styled(ark.div, badge)
