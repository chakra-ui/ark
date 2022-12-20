import { ChevronLeft, ChevronRight } from 'react-feather'
import { Box } from '../../../panda/jsx'
import { Button } from '../shared/Button'

type Page = {
  url: string
  title: string
}

type PaginationProps = {
  page: {
    next?: Page
    prev?: Page
    current: Page
  }
}

export const Pagination = (props: PaginationProps) => {
  const { page } = props
  return (
    <Box display="flex" my="12" width="full">
      {page.prev && (
        <Button as="a" href={page.prev.url} variant="link" size="md" leftIcon={<ChevronLeft />}>
          {page.prev.title}
        </Button>
      )}

      {page.next && (
        <Button
          as="a"
          variant="link"
          href={page.next?.url}
          size="md"
          rightIcon={<ChevronRight />}
          ml="auto"
        >
          {page.next?.title}
        </Button>
      )}
    </Box>
  )
}
