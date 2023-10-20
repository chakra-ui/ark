import { ark } from '@ark-ui/react/src'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { link, type LinkVariantProps } from 'styled-system/recipes'

export type LinkProps = LinkVariantProps & ComponentPropsWithoutRef<typeof ark.a>
export const Link = styled(ark.a, link)
