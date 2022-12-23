import { Box } from '@/panda/jsx'
import { ChevronLeft, ChevronRight } from 'react-feather'
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
        <PageButton href={prevPage.url} variant="link" size="md" leftIcon={<ChevronLeft />}>
          {prevPage.title}
        </PageButton>
      )}

      {nextPage && (
        <PageButton
          variant="link"
          href={nextPage.url}
          size="md"
          rightIcon={<ChevronRight />}
          ml="auto"
        >
          {nextPage.title}
        </PageButton>
      )}
    </Box>
  )
}
