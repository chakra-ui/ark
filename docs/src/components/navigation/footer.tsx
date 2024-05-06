import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Text } from '~/components/ui'
import type { Pages } from '.velite'

interface Props {
  prevPage?: Pages
  nextPage?: Pages
}

export const Footer = (props: Props) => {
  const { prevPage, nextPage } = props
  return (
    <Stack gap="6">
      <HStack justify="space-between">
        {prevPage && (
          <Stack gap="3">
            <Text color="fg.subtle" fontWeight="medium" textStyle="sm">
              Previous
            </Text>
            <a href={prevPage.href} className={button({ variant: 'link', size: 'lg' })}>
              <ArrowLeft /> {prevPage.title}
            </a>
          </Stack>
        )}
        {nextPage && (
          <Stack gap="3" style={{ marginLeft: 'auto' }}>
            <Text color="fg.subtle" fontWeight="medium" textStyle="sm">
              Next
            </Text>
            <a href={nextPage.href} className={button({ variant: 'link', size: 'lg' })}>
              {nextPage.title} <ArrowRight />
            </a>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
