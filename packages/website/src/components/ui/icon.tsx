import { ark } from '@ark-ui/react'
import { styled, type HTMLStyledProps } from '@ark-ui/styled-system/jsx'
import { icon, type IconVariantProps } from '@ark-ui/styled-system/recipes'
import type { ReactElement } from 'react'

export interface IconProps extends IconVariantProps, HTMLStyledProps<'svg'> {
  children: ReactElement
}

const StyledIcon = styled(ark.svg, icon)

export const Icon = (props: IconProps) => {
  return <StyledIcon asChild {...props} />
}
