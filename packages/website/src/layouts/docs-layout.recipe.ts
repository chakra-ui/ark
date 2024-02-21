import { sva } from 'styled-system/css'

export const layout = sva({
  slots: ['header', 'nav', 'main', 'footer'],
  base: {
    header: {
      background: 'bg.default',
      display: 'flex',
      flexDirection: 'column',
      left: '0',
      position: 'fixed',
      right: '0',
      top: '0',
      zIndex: 'sticky',
    },
    nav: {
      background: 'bg.default',
      borderEndWidth: '1px',
      bottom: '0',
      display: { base: 'none', md: 'flex' },
      flexDirection: 'column',
      left: '0',
      overflow: 'auto',
      position: 'fixed',
      px: '4',
      py: '6',
      top: '18',
      width: '72',
      zIndex: '1',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      pt: { base: '110px', md: '16' },
      ps: { base: '0', md: '64' },
      bg: 'bg.default',
    },
  },
})
