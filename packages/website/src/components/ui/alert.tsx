import { styled } from '@ark-ui/styled-system/jsx'
import { alert, type AlertVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type AlertProps = AlertVariantProps & ComponentPropsWithoutRef<'div'>
export const Alert = styled('div', alert)
