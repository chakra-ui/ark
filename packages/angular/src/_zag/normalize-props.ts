import { createNormalizer, type PropTypes as ZagPropTypes } from '@zag-js/types'

export type PropTypes = ZagPropTypes<Record<string, unknown>>

export const normalizeProps = createNormalizer<PropTypes>((props) => props)
