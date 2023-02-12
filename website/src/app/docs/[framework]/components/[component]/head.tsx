import { findComponentDocumentByFrameworkAndId } from '@/lib/contentlayer'
import { config } from '@/next-seo.config'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'

const Head = (props: any) => {
  const { params } = props
  const document = findComponentDocumentByFrameworkAndId(params.framework, params.component)
  const meta: NextSeoProps = {
    ...config,
    title: document?.name,
    description: document?.description,
  }
  return <NextSeo {...meta} useAppDir />
}

export default Head
