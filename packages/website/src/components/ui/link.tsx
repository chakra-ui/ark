import { ark } from '@ark-ui/react/src'
import { styled } from '@ark-ui/styled-system/jsx'
import { link, type LinkVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type LinkProps = LinkVariantProps & ComponentPropsWithoutRef<typeof ark.a>
export const Link = styled(ark.a, link)
