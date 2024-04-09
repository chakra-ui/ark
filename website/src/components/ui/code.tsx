import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { code } from 'styled-system/recipes'

export const Code = styled(ark.code, code)
export interface CodeProps extends ComponentProps<typeof Code> {}
