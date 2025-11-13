import { createMDXSource } from 'fumadocs-mdx/runtime/next'
import { loader, type InferPageType } from 'fumadocs-core/source'
import { blogPosts, pages } from '@/.source'

export const blogSource = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
})

export const pageSource = loader({
  baseUrl: '/',
  source: createMDXSource(pages),
})

export type Blog = InferPageType<typeof blogSource>
export type Page = InferPageType<typeof pageSource>
