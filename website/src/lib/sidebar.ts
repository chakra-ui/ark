import { type Pages, pages } from '.velite'

export const categories = ['overview', 'guides', 'ai', 'collections', 'components', 'utilities']

export const getSidebarGroups = (): Pages[][] => {
  const overviewPriority = ['introduction', 'getting-started', 'changelog', 'about']

  const sortedCategories = pages.reduce<Record<string, Pages[]>>((acc, page) => {
    let category = page.category
    if (categories.includes(category)) {
      acc[category] ||= []
      acc[category].push(page)
    }
    return acc
  }, {})

  // Sort pages within the 'overview' category by priority
  if (sortedCategories.overview) {
    sortedCategories.overview.sort((a, b) => overviewPriority.indexOf(a.id) - overviewPriority.indexOf(b.id))
  }

  return (
    categories
      // biome-ignore lint/suspicious/noPrototypeBuiltins: This line is safe as `categories` is predefined and not from external input
      .filter((category) => sortedCategories.hasOwnProperty(category))
      .map((category) => sortedCategories[category])
  )
}
