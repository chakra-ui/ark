import { segmentGroupAnatomy, type AnatomyPart } from '@ark-ui/anatomy'

export const parts: Record<
  'root' | 'label' | 'item' | 'itemText' | 'itemControl' | 'indicator',
  AnatomyPart
> = segmentGroupAnatomy.build()
