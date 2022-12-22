import { Box } from '@/panda/jsx'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Button } from './shared/Button'

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
        <Button as="a" href={prevPage.url} variant="link" size="md" leftIcon={<ChevronLeft />}>
          {prevPage.title}
        </Button>
      )}

      {nextPage && (
        <Button
          as="a"
          variant="link"
          href={nextPage.url}
          size="md"
          rightIcon={<ChevronRight />}
          ml="auto"
        >
          {nextPage.title}
        </Button>
      )}
    </Box>
  )
}
