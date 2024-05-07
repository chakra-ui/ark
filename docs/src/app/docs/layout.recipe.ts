import { sva } from 'styled-system/css'

export const layout = sva({
  slots: ['header', 'aside', 'main', 'logo', 'content', 'divider'],
  base: {
    header: {
      position: 'fixed',
      width: '100vw',
      top: '0',
      zIndex: 'sticky',
    },
    logo: {
      position: 'absolute',
      display: { base: 'none', md: 'flex' },
      alignItems: 'center',
      top: '0',
      left: '0',
      height: 'var(--ark-nav-height)',
      ps: 'var(--ark-sidebar-ps)',
      width: {
        base: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-sidebar-max-width)',
      },
      bg: 'bg.canvas',
      borderRightWidth: '1px',
    },
    content: {
      pe: 'calc((100vw - 1440px) / 2)',
      height: 'var(--ark-nav-height)',
      flexGrow: '1',
      flexShrink: '0',
      bg: 'bg.default',
    },
    aside: {
      pt: 'var(--ark-nav-height)',
      ps: 'var(--ark-sidebar-ps)',
      pe: '8',
      display: { base: 'none', md: 'block' },
      width: {
        base: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-sidebar-max-width)',
      },
      position: 'fixed',
      overflow: 'auto',
      top: '0',
      bottom: '0',
      left: '0',
      maxW: '100%',
      bg: 'bg.canvas',
      borderRightWidth: '1px',
    },
    main: {
      py: 'var(--ark-nav-height)',
      ps: {
        base: '0',
        md: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-main-ps)',
      },
      pe: 'var(--ark-main-pe)',
      background: { base: 'white', _dark: 'gray.2' },
      flex: '1',
    },
    divider: {
      ps: {
        base: '0',
        md: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-main-ps)',
      },
    },
  },
})
