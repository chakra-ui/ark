'use client'
import NextLink from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { HStack, Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import type { DocumentTypes } from '~/contentlayer'
import { findNextDocument, findPrevDocument } from '~/lib/contentlayer'
import { Typography } from '../ui/typography'

type FooterProps = {
  doc: DocumentTypes
}

export const DocsFooter = (props: FooterProps) => {
  const { doc } = props

  const prevPage = findPrevDocument(doc)
  const nextPage = findNextDocument(doc)

  return (
    <Stack width="full" gap="6">
      <HStack justify="space-between" width="full">
        {prevPage && (
          <Stack gap="3">
            <Typography color="fg.subtle" fontWeight="semibold" textStyle="sm">
              Previous
            </Typography>
            <Button variant="link" size="lg" asChild>
              <NextLink href={prevPage.route}>
                <FiArrowLeft />
                {prevPage.name}
              </NextLink>
            </Button>
          </Stack>
        )}

        {nextPage && (
          <Stack gap="3" style={{ marginLeft: 'auto' }}>
            <Typography color="fg.subtle" fontWeight="semibold" textStyle="sm">
              Next
            </Typography>
            <Button variant="link" size="lg" asChild>
              <NextLink href={nextPage.route}>
                {nextPage.name} <FiArrowRight />
              </NextLink>
            </Button>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
