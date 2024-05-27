import type { PropsWithChildren } from 'react'
import { Stack } from 'styled-system/jsx'
import { Heading, Text } from '~/components/ui'

interface Props {
  subHeading: string
  heading: string
  description: string
}

export const PageHeader = (props: PropsWithChildren<Props>) => {
  const { subHeading, heading, description } = props
  return (
    <Stack gap={{ base: '4', md: '6' }} align="center" textAlign="center">
      <Stack gap="3">
        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium" color="accent.default">
          {subHeading}
        </Text>
        <Heading as="h1" textStyle={{ base: '4xl', md: '5xl' }}>
          {heading}
        </Heading>
      </Stack>
      <Text color="fg.muted" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
        {description}
      </Text>
      {props.children}
    </Stack>
  )
}
