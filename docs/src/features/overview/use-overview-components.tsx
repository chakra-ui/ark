import { useCurrentSidebarCategory } from '@docusaurus/theme-common'
import { useMemo } from 'react'
import { isImageExisting } from './is-image-existing'

type OverviewComponent = {
  title: string
  url: string
  imageUrl?: string
}

export function useGetOverviewComponents() {
  const { items } = useCurrentSidebarCategory()

  return useMemo(
    () =>
      items
        .map<OverviewComponent>(
          (sidebarItem) => {
            if (!('href' in sidebarItem)) {
              return null
            }

            const { label, href } = sidebarItem
            const imageUrl = `components/${href.split('/')[href.split('/').length - 2]}.svg`

            return {
              title: label,
              url: href,
              imageUrl: isImageExisting(imageUrl)
                ? require(`@site/static/img/${imageUrl}`).default
                : undefined,
            }
          },
          // if the component has no overview image, filter it out
        )
        .filter(Boolean),
    [items],
  )
}
