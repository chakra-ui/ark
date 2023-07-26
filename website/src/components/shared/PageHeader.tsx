import { styled } from 'panda/jsx/factory'
import { Stack } from 'panda/jsx/stack'
import { Text } from './Text'

type PageHeaderProps = {
  heading?: string
  subHeading?: string
  supportingText?: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { heading, subHeading, supportingText } = props
  return (
    <Stack gap="5">
      <Stack gap="3">
        <Text color="accent.muted" fontWeight="semibold" textStyle="sm">
          {subHeading}
        </Text>
        <styled.h1 textStyle="3xl" fontWeight="semibold">
          {heading}
        </styled.h1>
      </Stack>
      <Text color="fg.muted" textStyle="md" lineHeight="relaxed">
        {supportingText}
      </Text>
    </Stack>
  )
}
