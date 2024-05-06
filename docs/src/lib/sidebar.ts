import { type Pages, pages } from '.velite'

export const getSidebarGroups = (): Pages[][] => {
  const categories = ['overview', 'guides', 'components', 'providers', 'changelogs']
  const overviewPriority = ['introduction', 'getting-started']

  const sortedCategories = pages.reduce<Record<string, Pages[]>>((acc, page) => {
    const category = page.category
    if (categories.includes(category)) {
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(page)
    }
    return acc
  }, {})

  // Sort pages within the 'overview' category by priority
  if (sortedCategories.overview) {
    sortedCategories.overview.sort(
      (a, b) => overviewPriority.indexOf(a.id) - overviewPriority.indexOf(b.id),
    )
  }

  return (
    categories
      // biome-ignore lint/suspicious/noPrototypeBuiltins: This line is safe as `categories` is predefined and not from external input
      .filter((category) => sortedCategories.hasOwnProperty(category))
      .map((category) => sortedCategories[category])
  )
}
