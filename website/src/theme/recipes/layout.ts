import { defineSlotRecipe } from '@pandacss/dev'

const belowBars = 'calc(var(--navbar-height) + var(--banner-height) + var(--tabbar-height))'

export const layout = defineSlotRecipe({
  className: 'layout',
  slots: ['aside', 'main'],
  base: {
    aside: {
      display: { base: 'none', md: 'block' },
      position: 'sticky',
      top: belowBars,
      height: `calc(100vh - ${belowBars})`,
      flexShrink: '0',
      width: '15rem',
      ps: '6',
      pe: '4',
      pt: '8',
      pb: '10',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      scrollPaddingBlock: '6rem',
    },
    main: {
      minWidth: '0',
      flex: '1',
    },
  },
})
