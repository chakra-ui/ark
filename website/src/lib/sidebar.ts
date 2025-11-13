import { pageSource, type Page } from './source'

export const categories = ['overview', 'guides', 'ai', 'collections', 'components', 'utilities']

export const getSidebarGroups = (): Page[][] => {
  const overviewPriority = ['introduction', 'getting-started', 'changelog', 'about']

  const sortedCategories = pageSource.getPages().reduce<Record<string, Page[]>>((acc, page) => {
    let category = page.data.category
    if (categories.includes(category)) {
      acc[category] ||= []
      acc[category].push(page)
    }
    return acc
  }, {})

  // Sort pages within the 'overview' category by priority
  if (sortedCategories.overview) {
    sortedCategories.overview.sort((a, b) => overviewPriority.indexOf(a.data.id) - overviewPriority.indexOf(b.data.id))
  }

  return (
    categories
      // biome-ignore lint/suspicious/noPrototypeBuiltins: This line is safe as `categories` is predefined and not from external input
      .filter((category) => sortedCategories.hasOwnProperty(category))
      .map((category) => sortedCategories[category])
  )
}
