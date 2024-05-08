import * as runtime from 'react/jsx-runtime'
import { Anatomy } from './components/anatomy'
import { Example } from './components/component-example'
import { ComponentPreview } from './components/component-preview'
import { ComponentTypes } from './components/component-types'
import { Faq } from './components/faq'
import { Pre } from './components/pre'
import { Quickstart } from './components/quickstart'
import { Story } from './components/story'
import { Step, Steps } from './components/ui/stepper'

const sharedComponents = {
  Anatomy,
  ComponentPreview,
  ComponentTypes,
  Example,
  Faq,
  pre: Pre,
  Quickstart,
  Steps,
  Step,
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
