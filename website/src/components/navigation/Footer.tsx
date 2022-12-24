import { Box } from '@/panda/jsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PageButton } from './PageButton'

type Page = {
  url: string
  title: string
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
        <PageButton href={prevPage.url} variant="link" size="md" leftIcon={<FiChevronLeft />}>
          {prevPage.title}
        </PageButton>
      )}

      {nextPage && (
        <PageButton
          variant="link"
          href={nextPage.url}
          size="md"
          rightIcon={<FiChevronRight />}
          ml="auto"
        >
          {nextPage.title}
        </PageButton>
      )}
    </Box>
  )
}
