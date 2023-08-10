'use client'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Box, HStack, type HstackProps } from 'styled-system/jsx'
import { Typography } from '../ui/typography'

export const Breadcrumbs = (props: HstackProps) => {
  const pathName = usePathname()
  const crumbs = pathName
    ?.split('/')
    .filter(Boolean)
    .filter((path) => !['docs'].includes(path))
    .map((path) => path.replace(/-/g, ' '))
  return (
    <HStack gap="1" {...props}>
      {crumbs?.map((crumb, index, arr) => (
        <Fragment key={index}>
          <Typography
            as="span"
            textStyle="sm"
            color="fg.subtle"
            fontWeight="medium"
            textTransform="capitalize"
            _last={{ color: 'fg.emphasized' }}
          >
            {crumb}
          </Typography>
          {arr.length - 1 !== index && (
            <Box color="fg.subtle" alignSelf="end">
              <FiChevronRight />
            </Box>
          )}
        </Fragment>
      ))}
    </HStack>
  )
}
