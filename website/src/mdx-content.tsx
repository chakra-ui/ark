import * as runtime from 'react/jsx-runtime'
import { Code } from '~/components/ui/code'
import { Kbd } from '~/components/ui/kbd'
import { Link } from '~/components/ui/link'
import { Step, Steps } from '~/components/ui/stepper'
import { Anatomy } from './components/anatomy'
import { ComponentLivePreview } from './components/component-live-preview'
import { ComponentPreview } from './components/component-preview'
import { ComponentTypes } from './components/component-types'
import { Example } from './components/example'
import { Faq } from './components/faq'
import { InstallCmd } from './components/install-cmd'
import { KeyBindingsTable } from './components/key-bindings-table'
import { Pre } from './components/pre'
import { Quickstart } from './components/quickstart'
import { ThemeImage } from './components/theme-image'

const sharedComponents = {
  a: Link,
  Anatomy,
  code: Code,
  ComponentPreview,
  ComponentTypes,
  ComponentLivePreview,
  Example,
  Faq,
  InstallCmd,
  kbd: Kbd,
  KeyBindingsTable,
  pre: Pre,
  Quickstart,
  Step,
  Steps,
  ThemeImage,
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
