import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { article, type ArticleVariantProps } from 'styled-system/recipes'

export type ArticleProps = ArticleVariantProps & ComponentPropsWithoutRef<typeof ark.article>
export const Article = styled(ark.article, article)
