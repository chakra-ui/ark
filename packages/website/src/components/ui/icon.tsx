import { ark } from '@ark-ui/react'
import type { ReactElement } from 'react'
import { styled, type HTMLStyledProps } from 'styled-system/jsx'
import { icon, type IconVariantProps } from 'styled-system/recipes'

export interface IconProps extends IconVariantProps, HTMLStyledProps<'svg'> {
  children: ReactElement
}

const StyledIcon = styled(ark.svg, icon)

export const Icon = (props: IconProps) => {
  return <StyledIcon asChild {...props} />
}
