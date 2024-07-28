import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { icon } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type IconProps = ComponentProps<typeof Icon>
export const Icon = styled(ark.svg, icon, {
  defaultProps: { asChild: true },
})
