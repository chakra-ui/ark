import { Box } from '@/panda/jsx'
import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from '../shared/Button'

type Page = {
  route: string
  name: string
}

type FooterProps = {
  prevPage?: Page
  nextPage?: Page
}

export const Footer = (props: FooterProps) => {
  const { prevPage, nextPage } = props

  return (
    <Box display="flex" width="full">
      {prevPage && (
        <Link href={prevPage.route}>
          <Button variant="link" size="md" leftIcon={<FiChevronLeft />}>
            {prevPage.name}
          </Button>
        </Link>
      )}

      {nextPage && (
        <Link href={nextPage.route} style={{ marginLeft: 'auto' }}>
          <Button variant="link" size="md" rightIcon={<FiChevronRight />}>
            {nextPage.name}
          </Button>
        </Link>
      )}
    </Box>
  )
}
