import { ark } from '@ark-ui/react'
import { styled } from 'styled-system/jsx'
import { iconButton } from 'styled-system/recipes'

export type IconButtonProps = typeof IconButton & { 'aria-label': string }
export const IconButton = styled(ark.button, iconButton)
