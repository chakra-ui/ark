import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Example } from '~/components/example'
import { Pre } from '~/components/pre'
import { MDXContent } from '~/mdx-content'
import { pages } from '.velite'

interface Props {
  params: { slug: string[] }
}

export default function Page(props: Props) {
  const page = getPageBySlug(props.params.slug)

  if (page) {
    return <MDXContent code={page.code} components={{ Example, pre: Pre }} />
  }
  return notFound()
}

export const generateMetadata = (props: Props): Metadata => {
  const page = getPageBySlug(props.params.slug)

  if (page) {
    return { title: page.title, description: page.description }
  }
  return {}
}

export const generateStaticParams = () => pages.map((page) => ({ slug: page.slug.split('/') }))

const getPageBySlug = (slug: string[]) => pages.find((page) => page.slug === slug.join('/'))
