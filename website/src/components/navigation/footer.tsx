'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
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
  const params = useParams<{ framework: string }>()
  const basepath = `/docs/${params.framework}`

  return (
    <Stack gap="6">
      <HStack justify="space-between">
        {prevPage && (
          <Stack gap="3">
            <Text color="fg.subtle" fontWeight="medium" textStyle="sm">
              Previous
            </Text>
            <NextLink
              href={[basepath, prevPage.slug].join('/')}
              className={button({ variant: 'link', size: 'lg' })}
            >
              <ArrowLeft /> {prevPage.title}
            </NextLink>
          </Stack>
        )}
        {nextPage && (
          <Stack gap="3" style={{ marginLeft: 'auto' }}>
            <Text color="fg.subtle" fontWeight="medium" textStyle="sm">
              Next
            </Text>
            <NextLink
              href={[basepath, nextPage.slug].join('/')}
              className={button({ variant: 'link', size: 'lg' })}
            >
              {nextPage.title} <ArrowRight />
            </NextLink>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
