import type { PropsWithChildren } from 'react'
import { Stack } from 'styled-system/jsx'
import { Heading, Typography } from '~/components/ui/typography'
import { Breadcrumbs } from './breadcrumbs'

type PageHeaderProps = {
  heading?: string
  subHeading?: string
  supportingText?: string
}

export const PageHeader = (props: PropsWithChildren<PageHeaderProps>) => {
  const { heading, supportingText } = props
  return (
    <Stack gap={{ base: '3', md: '5' }}>
      <Stack gap="4">
        <Breadcrumbs display={{ base: 'none', lg: 'flex' }} />
        <Heading as="h1" textStyle={{ base: '2xl', md: '3xl' }}>
          {heading}
        </Heading>
      </Stack>
      <Typography color="fg.muted" textStyle={{ base: 'md', md: 'lg' }} lineHeight="relaxed">
        {supportingText}
      </Typography>
      {props.children}
    </Stack>
  )
}
