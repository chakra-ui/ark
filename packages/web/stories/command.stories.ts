import { renderExample } from '../.storybook/render-example.js'
import type { Meta, StoryObj } from '@storybook/html-vite'
import { mount as AsyncExample } from '../examples/command/async.js'
import { mount as BasicExample } from '../examples/command/basic.js'
import { mount as DialogExample } from '../examples/command/dialog.js'
import { mount as EmptyStateExample } from '../examples/command/empty-state.js'
import { mount as FromJsonExample } from '../examples/command/from-json.js'
import { mount as GroupsExample } from '../examples/command/groups.js'
import { mount as KeywordsExample } from '../examples/command/keywords.js'
import { mount as PagesExample } from '../examples/command/pages.js'

const meta: Meta = { title: 'Components / Command' }
export default meta

export const Async: StoryObj = { name: 'Async', render: renderExample(AsyncExample) }

export const Basic: StoryObj = { name: 'Basic', render: renderExample(BasicExample) }

export const Dialog: StoryObj = { name: 'Dialog', render: renderExample(DialogExample) }

export const EmptyState: StoryObj = { name: 'Empty State', render: renderExample(EmptyStateExample) }

export const FromJson: StoryObj = { name: 'From Json', render: renderExample(FromJsonExample) }

export const Groups: StoryObj = { name: 'Groups', render: renderExample(GroupsExample) }

export const Keywords: StoryObj = { name: 'Keywords', render: renderExample(KeywordsExample) }

export const Pages: StoryObj = { name: 'Pages', render: renderExample(PagesExample) }
