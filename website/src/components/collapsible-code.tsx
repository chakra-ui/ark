'use client'

import { Collapsible, useCollapsibleContext } from '@ark-ui/react/collapsible'
import { CodeIcon } from 'lucide-react'
import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'
import { Button } from './ui/primitives/button'
import { Icon } from './ui/icon'

interface Props {
  children: React.ReactNode
}

const showCodeButtonStyles = css({
  width: 'full',
  borderTopRadius: '0',
  borderTopWidth: '0',
  bg: 'bg.default',
  color: 'fg.muted',
  fontWeight: 'medium',
  fontSize: 'xs',
  gap: '1.5',
  _hover: {
    bg: 'gray.2',
    color: 'fg.default',
  },
})

const hideCodeButtonStyles = css({
  width: 'full',
  bg: 'gray.dark.2',
  color: 'gray.dark.11',
  fontWeight: 'medium',
  fontSize: 'xs',
  height: '9',
  borderTopWidth: '1px',
  borderTopColor: 'gray.dark.5',
  borderBottomRadius: 'lg',
  mt: '-1px',
  position: 'sticky',
  bottom: '-1px',
  zIndex: '1',
  _hover: {
    bg: 'gray.dark.3',
    color: 'white',
  },
})

const ShowCodeTrigger = () => (
  <Collapsible.Trigger asChild>
    <Button size="xs" variant="outline" borderColor="inherit" color="fg.default" className={showCodeButtonStyles}>
      <Icon size="sm">
        <CodeIcon />
      </Icon>
      Show Code
    </Button>
  </Collapsible.Trigger>
)

const HideCodeTrigger = () => <Collapsible.Trigger className={hideCodeButtonStyles}>Hide Code</Collapsible.Trigger>

const CollapsibleCodeContent = (props: Props) => {
  const { children } = props
  const collapsible = useCollapsibleContext()

  return (
    <>
      {!collapsible.open && <ShowCodeTrigger />}
      <Collapsible.Content>
        <Box className={css({ '& > [data-scope="tabs"]': { borderRadius: '0' } })}>
          {children}
          <HideCodeTrigger />
        </Box>
      </Collapsible.Content>
    </>
  )
}

export const CollapsibleCode = (props: Props) => {
  return (
    <Collapsible.Root lazyMount unmountOnExit>
      <CollapsibleCodeContent {...props} />
    </Collapsible.Root>
  )
}
