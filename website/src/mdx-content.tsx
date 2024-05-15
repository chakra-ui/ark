import * as runtime from 'react/jsx-runtime'
import { Anatomy } from './components/anatomy'
import { ComponentPreview } from './components/component-preview'
import { ComponentTypes } from './components/component-types'
import { Example } from './components/example'
import { Faq } from './components/faq'
import { KeyBindingsTable } from './components/key-bindings-table'
import { Pre } from './components/pre'
import { Quickstart } from './components/quickstart'
import { Story } from './components/story'
import { Code, InfoBanner, Kbd, Link } from './components/ui'
import { Step, Steps } from './components/ui/stepper'

const sharedComponents = {
  a: Link,
  Anatomy,
  code: Code,
  ComponentPreview,
  ComponentTypes,
  Example,
  Faq,
  InfoBanner,
  kbd: Kbd,
  KeyBindingsTable,
  pre: Pre,
  Quickstart,
  Step,
  Steps,
  Story,
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
