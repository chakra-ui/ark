import { ark, type HTMLArkProps } from '@ark-ui/react'
import { styled } from 'styled-system/jsx'
import { alert, type AlertVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(alert)

export type AlertProps = AlertVariantProps & HTMLArkProps<'div'>

const AlertRoot = withProvider(styled(ark.div), 'root')
export const AlertContent = withContext(styled(ark.div), 'content')
export const AlertDescription = withContext(styled(ark.p), 'description')
export const AlertIcon = withContext(styled(ark.svg), 'icon')
export const AlertTitle = withContext(styled(ark.h5), 'title')

export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Content: AlertContent,
  Description: AlertDescription,
  Icon: AlertIcon,
  Title: AlertTitle,
})
