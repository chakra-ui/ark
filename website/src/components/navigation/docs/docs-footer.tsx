'use client'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { css, cva, cx } from 'styled-system/css'
import { HStack, Stack } from 'styled-system/jsx'
import { Icon } from '~/components/ui/icon'
import { Text } from '~/components/ui/text'
import { type Framework, docsHref } from '~/lib/frameworks'

export interface FooterNavItem {
  slug: string
  title: string
}

interface Props {
  prevPage?: FooterNavItem
  nextPage?: FooterNavItem
  framework: Framework
}

export const DocsFooter = (props: Props) => {
  const { prevPage, nextPage, framework } = props

  return (
    <Stack justify="space-between" gap="3" direction={{ base: 'column-reverse', sm: 'row' }}>
      {prevPage && (
        <NextLink href={docsHref(framework, prevPage.slug)} className={link}>
          <Text color="fg.muted" fontWeight="medium" textStyle="sm">
            Prev page
          </Text>
          <HStack gap="1">
            <Icon size="md">
              <ArrowLeftIcon />
            </Icon>
            <Text fontWeight="medium">{prevPage.title}</Text>
          </HStack>
        </NextLink>
      )}
      {nextPage && (
        <NextLink
          href={docsHref(framework, nextPage.slug)}
          className={cx(link, css({ marginLeft: 'auto', alignItems: 'flex-end' }))}
        >
          <Text color="fg.muted" fontWeight="medium" textStyle="sm">
            Next page
          </Text>
          <HStack gap="1">
            <Text fontWeight="medium">{nextPage.title}</Text>
            <Icon size="md">
              <ArrowRightIcon />
            </Icon>
          </HStack>
        </NextLink>
      )}
    </Stack>
  )
}

const link = cva({
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    display: 'flex',
    width: { base: 'full', sm: '50%' },
    flexDirection: 'column',
    gap: '1.5',
    p: '4',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    _hover: {
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
  },
})()
