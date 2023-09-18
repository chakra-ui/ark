import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { alert, type AlertVariantProps } from 'styled-system/recipes'

export type AlertProps = AlertVariantProps & ComponentPropsWithoutRef<'div'>
export const Alert = styled('div', alert)
