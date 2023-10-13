import { ark } from '@ark-ui/react/src'
import { styled } from '@ark-ui/styled-system/jsx'
import { article, type ArticleVariantProps } from '@ark-ui/styled-system/recipes'
import type { ComponentPropsWithoutRef } from 'react'

export type ArticleProps = ArticleVariantProps & ComponentPropsWithoutRef<typeof ark.article>
export const Article = styled(ark.article, article)
