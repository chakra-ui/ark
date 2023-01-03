import { Box } from '@/panda/jsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PageButton } from './PageButton'

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
    <Box display="flex" my="12" width="full">
      {prevPage && (
        <PageButton href={prevPage.route} variant="link" size="md" leftIcon={<FiChevronLeft />}>
          {prevPage.name}
        </PageButton>
      )}

      {nextPage && (
        <PageButton
          variant="link"
          href={nextPage.route}
          size="md"
          rightIcon={<FiChevronRight />}
          ml="auto"
        >
          {nextPage.name}
        </PageButton>
      )}
    </Box>
  )
}
