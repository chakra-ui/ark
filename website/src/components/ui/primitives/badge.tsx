import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { badge } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type BadgeProps = ComponentProps<typeof Badge>
export const Badge = styled(ark.div, badge)
