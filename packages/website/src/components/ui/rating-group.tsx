import * as Ark from '@ark-ui/react/src/rating-group'
import { styled } from 'styled-system/jsx'
import { ratingGroup, type RatingGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(ratingGroup)

export * from '@ark-ui/react/src/rating-group'
export type RatingGroupProps = Ark.RatingGroupRootProps & RatingGroupVariantProps

const RatingGroupRoot = withProvider(styled(Ark.RatingGroup.Root), 'root')
export const RatingGroupControl = withContext(styled(Ark.RatingGroup.Control), 'control')
export const RatingGroupLabel = withContext(styled(Ark.RatingGroup.Label), 'label')
export const RatingGroupItem = withContext(styled(Ark.RatingGroup.Item), 'item')

export const RatingGroup = Object.assign(RatingGroupRoot, {
  Root: RatingGroupRoot,
  Control: RatingGroupControl,
  Label: RatingGroupLabel,
  Item: RatingGroupItem,
})
