import { type PropsWithChildren } from 'react'
import { Box, type BoxProps } from 'styled-system/jsx'
import { CopyToClipboardButton } from './copy-to-clipboard-button'

interface Props extends BoxProps {
  code: string
}

export const CodePreview = (props: PropsWithChildren<Props>) => {
  const { children, code, ...rest } = props
  return (
    <Box bg="grayPalette.900" position="relative" {...rest}>
      <Box position="absolute" top="1" right="1" className="dark">
        <CopyToClipboardButton content={code} dark />
      </Box>
      <Box maxH="xl" overflow="auto" p="4">
        {children}
      </Box>
    </Box>
  )
}
