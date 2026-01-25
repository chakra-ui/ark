import { useMemo } from 'react'
import * as runtime from 'react/jsx-runtime'
import { styled } from 'styled-system/jsx'
import { BlogCardGroup } from '~/components/blog-card'
import { Kbd } from '~/components/ui/kbd'
import { Link } from '~/components/ui/link'
import { Step, Steps } from '~/components/ui/stepper'
import { Anatomy } from './components/anatomy'
import { ComponentPreview } from './components/component-preview'
import { ComponentTypes } from './components/component-types'
import { ContextType } from './components/context-type'
import { Example, ExampleCode } from './components/example'
import { Faq } from './components/faq'
import { InstallCmd } from './components/install-cmd'
import { KeyBindingsTable } from './components/key-bindings-table'
import { Quickstart } from './components/quickstart'
import { ThemeImage } from './components/theme-image'

const P = styled('p', {
  base: {
    marginTop: '1.25em',
    marginBottom: '1.25em',
    color: 'var(--colors-prose-body)',
    '& a': {
      textDecoration: 'underline',
      fontWeight: '500',
    },
  },
})

const Blockquote = styled('blockquote', {
  base: {
    marginTop: '1.6em',
    marginBottom: '1.6em',
    paddingInlineStart: '1em',
    fontWeight: '500',
    fontStyle: 'italic',
    borderInlineStartWidth: '0.25rem',
    borderColor: 'var(--colors-prose-quote-border)',
  },
})

const H1 = styled('h1', {
  base: {
    fontSize: '2.25em',
    marginTop: '0',
    marginBottom: '0.8888889em',
    lineHeight: '1.1111111',
    fontWeight: '800',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '900',
      color: 'inherit',
    },
  },
})

const H2 = styled('h2', {
  base: {
    fontSize: '1.5em',
    marginTop: '2em',
    marginBottom: '1em',
    lineHeight: '1.3333333',
    fontWeight: '700',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '800',
      color: 'inherit',
    },
    '& code': {
      fontSize: '0.875em',
    },
    '& + *': {
      marginTop: '0',
    },
  },
})

const H3 = styled('h3', {
  base: {
    fontSize: '1.25em',
    lineHeight: '1.6',
    marginTop: '1.6em',
    marginBottom: '0.6em',
    fontWeight: '600',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '700',
      color: 'inherit',
    },
    '& code': {
      fontSize: '0.9em',
    },
    '& + *': {
      marginTop: '0',
    },
  },
})

const H4 = styled('h4', {
  base: {
    marginTop: '1.5em',
    marginBottom: '0.5em',
    lineHeight: '1.5',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '700',
      color: 'inherit',
    },
    '& + *': {
      marginTop: '0',
    },
  },
})

const H5 = styled('h5', {
  base: {
    fontSize: '1em',
    marginTop: '1.25em',
    marginBottom: '0.5em',
    lineHeight: '1.5',
    fontWeight: '600',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '700',
      color: 'inherit',
    },
    '& code': {
      fontSize: '0.9em',
    },
    '& + *': {
      marginTop: '0',
    },
  },
})

const H6 = styled('h6', {
  base: {
    fontSize: '0.875em',
    marginTop: '1.25em',
    marginBottom: '0.5em',
    lineHeight: '1.5',
    fontWeight: '600',
    color: 'var(--colors-prose-heading)',
    '& strong': {
      fontWeight: '700',
      color: 'inherit',
    },
    '& code': {
      fontSize: '0.9em',
    },
    '& + *': {
      marginTop: '0',
    },
  },
})

const Mark = styled('mark', {
  base: {
    backgroundColor: 'yellow.100',
    color: 'yellow.900',
    padding: '0.125em 0.25em',
    borderRadius: '0.125em',
  },
})

const Img = styled('img', {
  base: {
    marginTop: '2em',
    marginBottom: '2em',
  },
})

const Picture = styled('picture', {
  base: {
    display: 'block',
    marginTop: '2em',
    marginBottom: '2em',
    '& > img': {
      marginTop: '0',
      marginBottom: '0',
    },
  },
})

const Video = styled('video', {
  base: {
    marginTop: '2em',
    marginBottom: '2em',
  },
})

const Pre = styled('pre', {
  base: {
    fontSize: '0.875em',
    lineHeight: '1.7142857',
    marginTop: '1.7142857em',
    marginBottom: '1.7142857em',
    borderRadius: '0.375rem',
    padding: '4',
    colorScheme: 'dark',

    '& code': {
      backgroundColor: 'transparent',
      borderWidth: '0',
      borderRadius: '0',
      padding: '0',
      fontWeight: 'inherit',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
    },
  },
})

const Ol = styled('ol', {
  base: {
    marginTop: '1.25em',
    marginBottom: '1.25em',
    paddingInlineStart: '1.625em',
    '& > li': {
      paddingInlineStart: '0.375em',
      '&::marker': {
        color: 'fg.subtle',
      },
    },
    '& > li > p:first-child': {
      marginTop: '1.25em',
    },
    '& > li > p:last-child': {
      marginBottom: '1.25em',
    },
    '& ul, & ol': {
      marginTop: '0.75em',
      marginBottom: '0.75em',
    },
  },
})

const Ul = styled('ul', {
  base: {
    marginTop: '1.25em',
    marginBottom: '1.25em',
    paddingInlineStart: '1.625em',
    listStyleType: 'disc',
    '& > li': {
      paddingInlineStart: '0.375em',
      '&::marker': {
        color: 'fg.subtle',
      },
    },
    '& > li p': {
      marginTop: '0.75em',
      marginBottom: '0.75em',
    },
    '& > li > p:first-child': {
      marginTop: '1.25em',
    },
    '& > li > p:last-child': {
      marginBottom: '1.25em',
    },
    '& ul, & ol': {
      marginTop: '0.75em',
      marginBottom: '0.75em',
    },
  },
})

const Li = styled('li', {
  base: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
})

const Dl = styled('dl', {
  base: {
    marginTop: '1.25em',
    marginBottom: '1.25em',
  },
})

const Dt = styled('dt', {
  base: {
    marginTop: '1.25em',
  },
})

const Dd = styled('dd', {
  base: {
    marginTop: '0.5em',
    paddingInlineStart: '1.625em',
  },
})

const Figure = styled('figure', {
  base: {
    marginTop: '2em',
    marginBottom: '2em',
    '& > *': {
      marginTop: '0',
      marginBottom: '0',
    },
  },
})

const Figcaption = styled('figcaption', {
  base: {
    fontSize: '0.875em',
    lineHeight: '1.4285714',
    marginTop: '0.8571429em',
  },
})

const Table = styled('table', {
  base: {
    fontSize: '0.875em',
    lineHeight: '1.7142857',
    width: '100%',
    tableLayout: 'auto',
    marginTop: '2em',
    marginBottom: '2em',
  },
})

const Thead = styled('thead', {
  base: {
    borderBottomWidth: '1px',
    '& th': {
      paddingInlineEnd: '0.5714286em',
      paddingBottom: '0.5714286em',
      paddingInlineStart: '0.5714286em',
      fontWeight: '600',
      verticalAlign: 'bottom',
    },
    '& th:first-child': {
      paddingInlineStart: '0',
    },
    '& th:last-child': {
      paddingInlineEnd: '0',
    },
  },
})

const Tbody = styled('tbody', {
  base: {
    '& tr': {
      borderBottomWidth: '1px',
    },
    '& tr:last-child': {
      borderBottomWidth: '0',
    },
    '& td': {
      verticalAlign: 'baseline',
      paddingTop: '0.5714286em',
      paddingInlineEnd: '0.5714286em',
      paddingBottom: '0.5714286em',
      paddingInlineStart: '0.5714286em',
    },
    '& td:first-child': {
      paddingInlineStart: '0',
    },
    '& td:last-child': {
      paddingInlineEnd: '0',
    },
  },
})

const Tfoot = styled('tfoot', {
  base: {
    borderTopWidth: '1px',
    '& td': {
      verticalAlign: 'top',
      paddingTop: '0.5714286em',
      paddingInlineEnd: '0.5714286em',
      paddingBottom: '0.5714286em',
      paddingInlineStart: '0.5714286em',
    },
    '& td:first-child': {
      paddingInlineStart: '0',
    },
    '& td:last-child': {
      paddingInlineEnd: '0',
    },
  },
})

const Code = styled('code', {
  base: {
    color: 'var(--colors-prose-code)',
    fontWeight: '600',
    borderWidth: '1px',
    fontSize: '0.875em',
    padding: '0.125em 0.25em',
    borderRadius: '0.25em',
    backgroundColor: 'gray.a2',
  },
})

const Hr = styled('hr', {
  base: {
    borderColor: 'var(--colors-prose-hr-border)',
    borderTopWidth: '1px',
    marginTop: '3em',
    marginBottom: '3em',
    '& + *': {
      marginTop: '0',
    },
  },
})

const Strong = styled('strong', {
  base: {
    color: 'var(--colors-prose-bold)',
    fontWeight: '600',
  },
})

const Em = styled('em', {
  base: {
    fontStyle: 'italic',
  },
})

const sharedComponents = {
  a: Link,
  Anatomy,
  code: Code,
  ComponentPreview,
  ComponentTypes,
  ContextType,
  Example,
  ExampleCode,
  Faq,
  InstallCmd,
  kbd: Kbd,
  KeyBindingsTable,
  pre: Pre,
  Quickstart,
  Step,
  Steps,
  ThemeImage,
  BlogCardGroup,
  p: P,
  blockquote: Blockquote,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  mark: Mark,
  img: Img,
  picture: Picture,
  video: Video,
  ol: Ol,
  ul: Ul,
  li: Li,
  dl: Dl,
  dt: Dt,
  dd: Dd,
  figure: Figure,
  figcaption: Figcaption,
  thead: Thead,
  table: Table,
  tbody: Tbody,
  hr: Hr,
  tfoot: Tfoot,
  strong: Strong,
  em: Em,
}

const compileMDX = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMemo(() => compileMDX(code), [code])
  const mergedComponents = useMemo(() => ({ ...sharedComponents, ...components }), [components])
  return <Component components={mergedComponents} />
}
