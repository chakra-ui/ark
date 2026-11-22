import { renderExample } from '../../../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as BasicExample } from './examples/basic.js'
import { mount as InheritStylesExample } from './examples/inherit-styles.js'
import { mount as ScriptExample } from './examples/script.js'
import { mount as SrcDocExample } from './examples/src-doc.js'

const meta: Meta = { title: 'Utilities / Frame' }
export default meta

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Script: StoryObj = { name: 'Script', render: renderExample(ScriptExample) }

export const SrcDoc: StoryObj = { name: 'Src Doc', render: renderExample(SrcDocExample) }

export const InheritStyles: StoryObj = { name: 'Inherit Styles', render: renderExample(InheritStylesExample) }
