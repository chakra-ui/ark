import type { Meta } from 'storybook-solidjs-vite'
import Basic from './examples/basic'
import Grouped from './examples/grouped'
import Nested from './examples/nested'
import CustomScrollBehavior from './examples/custom-scroll-behavior'
import RootProvider from './examples/root-provider'
import WithIndicator from './examples/with-indicator'
import WithTreeView from './examples/with-tree-view'
import WithCollapsible from './examples/with-collapsible'
import WithHover from './examples/with-hover'
import WithNumbers from './examples/with-numbers'

const meta: Meta = {
  title: 'Components / Toc',
}

export default meta

export const BasicExample = () => <Basic />
export const GroupedExample = () => <Grouped />
export const NestedExample = () => <Nested />
export const CustomScrollBehaviorExample = () => <CustomScrollBehavior />
export const RootProviderExample = () => <RootProvider />
export const WithIndicatorExample = () => <WithIndicator />
export const WithTreeViewExample = () => <WithTreeView />
export const WithCollapsibleExample = () => <WithCollapsible />
export const WithHoverExample = () => <WithHover />
export const WithNumbersExample = () => <WithNumbers />
