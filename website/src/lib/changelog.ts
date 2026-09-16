import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Framework } from '~/lib/frameworks'
import type { PageMeta } from './source'

export const CHANGELOG_META: PageMeta = {
  id: 'changelog',
  title: 'Changelog',
  description: 'All notable changes will be documented in this file.',
  status: undefined,
  framework: '*',
  slug: 'overview/changelog',
  category: 'overview',
  url: '/docs/overview/changelog',
}

export const isChangelogSlug = (slug: string) => slug === CHANGELOG_META.slug

export const getChangelogContent = (framework: Framework): string => {
  const path = join(process.cwd(), '..', 'packages', framework, 'CHANGELOG.md')
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return ''
  }
}
