import { findDocumentByFrameWorkAndId } from '@/lib/contentlayer'
import { config } from '@/next-seo.config'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'

const Head = (props: any) => {
  const { params } = props
  const document = findDocumentByFrameWorkAndId(params.framework, params.document)
  const meta: NextSeoProps = {
    ...config,
    title: document?.name,
  }
  return <NextSeo {...meta} useAppDir />
}

export default Head
