import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-solid'
import { Pagination } from '@ark-ui/solid/pagination'
import { For } from 'solid-js'

export const WithEdges = () => (
  <Pagination.Root count={5000} pageSize={20} siblingCount={2}>
    <Pagination.FirstTrigger>
      <ChevronsLeftIcon />
    </Pagination.FirstTrigger>

    <Pagination.PrevTrigger>
      <ChevronLeftIcon />
    </Pagination.PrevTrigger>

    <Pagination.Context>
      {(pagination) => (
        <For each={pagination().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <Pagination.Item {...page}>{page.value}</Pagination.Item>
            ) : (
              <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
            )
          }
        </For>
      )}
    </Pagination.Context>

    <Pagination.NextTrigger>
      <ChevronRightIcon />
    </Pagination.NextTrigger>

    <Pagination.LastTrigger>
      <ChevronsRightIcon />
    </Pagination.LastTrigger>
  </Pagination.Root>
)
