import { NextSeo } from 'next-seo'

import { config } from '@/next-seo.config'
import type { NextSeoProps } from 'next-seo'

const Head = () => {
  const meta: NextSeoProps = {
    ...config,
    title: 'Homepage',
  }
  return <NextSeo {...meta} useAppDir />
}

export default Head
