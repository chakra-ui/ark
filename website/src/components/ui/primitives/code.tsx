import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { code } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type CodeProps = ComponentProps<typeof Code>
export const Code = styled(ark.code, code)
