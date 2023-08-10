import NextLink from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { HStack, Stack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { findNextDocument, findPrevDocument } from '~/lib/contentlayer'
import { Typography } from '../ui/typography'

type FooterProps = {
  currentPageTitle: string
}

export const DocsFooter = (props: FooterProps) => {
  const { currentPageTitle } = props

  const prevPage = findPrevDocument(currentPageTitle)
  const nextPage = findNextDocument(currentPageTitle)

  return (
    <Stack width="full" gap="6">
      <HStack justify="space-between" width="full">
        {prevPage && (
          <Stack gap="3">
            <Typography color="fg.subtle" fontWeight="semibold" textStyle="sm">
              Previous
            </Typography>
            <NextLink href={prevPage.href} className={button({ variant: 'link', size: 'lg' })}>
              <FiArrowLeft />
              {prevPage.title}
            </NextLink>
          </Stack>
        )}

        {nextPage && (
          <Stack gap="3" style={{ marginLeft: 'auto' }}>
            <Typography color="fg.subtle" fontWeight="semibold" textStyle="sm">
              Next
            </Typography>
            <NextLink href={nextPage.href} className={button({ variant: 'link', size: 'lg' })}>
              {nextPage.title}
              <FiArrowRight />
            </NextLink>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
