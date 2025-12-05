import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Pagination } from '@ark-ui/react/pagination'

export const WithEdges = () => (
  <Pagination.Root count={5000} pageSize={20} siblingCount={2}>
    <Pagination.FirstTrigger>
      <ChevronsLeftIcon />
    </Pagination.FirstTrigger>

    <Pagination.PrevTrigger>
      <ChevronLeftIcon />
    </Pagination.PrevTrigger>

    <Pagination.Context>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === 'page' ? (
            <Pagination.Item key={index} {...page}>
              {page.value}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis key={index} index={index}>
              &#8230;
            </Pagination.Ellipsis>
          ),
        )
      }
    </Pagination.Context>

    <Pagination.NextTrigger>
      <ChevronRightIcon />
    </Pagination.NextTrigger>

    <Pagination.LastTrigger>
      <ChevronsRightIcon />
    </Pagination.LastTrigger>
  </Pagination.Root>
)
