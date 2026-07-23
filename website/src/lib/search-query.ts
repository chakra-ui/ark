import { matchSorter } from 'match-sorter'

export interface SearchItem {
  label: string
  value: string
  group: string
  description?: string
  parents?: string[]
}

export interface SearchData {
  defaults: Record<string, SearchItem[]>
  items: SearchItem[]
}

const GROUP_ORDER = ['Overview', 'Guides', 'Components', 'Sections', 'Examples', 'Utilities', 'Collections', 'AI']

export const SEARCH_MAX_PER_GROUP = 5

export const groupSearchResults = (
  items: SearchItem[],
  maxPerGroup = Number.POSITIVE_INFINITY,
): Record<string, SearchItem[]> => {
  const grouped: Record<string, SearchItem[]> = {}
  for (const item of items) {
    grouped[item.group] ??= []
    if (grouped[item.group].length >= maxPerGroup) continue
    grouped[item.group].push(item)
  }

  return Object.fromEntries(
    GROUP_ORDER.filter((group) => grouped[group]?.length).map((group) => [group, grouped[group]]),
  )
}

export const querySearch = (data: SearchData, query: string): Record<string, SearchItem[]> => {
  const value = query.trim()
  if (!value) return data.defaults

  const results = matchSorter(data.items, value, {
    keys: ['label', 'description', (item) => item.parents?.join(' ') ?? ''],
  })

  return groupSearchResults(results, SEARCH_MAX_PER_GROUP)
}

const fetchSearchData = async (): Promise<SearchData> => {
  const response = await fetch('/api/search')
  if (!response.ok) throw new Error('Failed to load search data')
  return response.json() as Promise<SearchData>
}

let searchDataPromise: Promise<SearchData> | null = null

export const loadSearchData = () => {
  searchDataPromise ??= retry(fetchSearchData).catch((error) => {
    searchDataPromise = null
    throw error
  })

  return searchDataPromise
}

export const preloadSearchData = () => {
  void loadSearchData().catch(() => {})
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface RetryOptions {
  attempts?: number
  delayMs?: number
}

const retry = async <T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> => {
  const { attempts = 3, delayMs = 300 } = opts

  let lastError: unknown

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt === attempts - 1) break
      await wait(delayMs * 2 ** attempt)
    }
  }

  throw lastError
}
