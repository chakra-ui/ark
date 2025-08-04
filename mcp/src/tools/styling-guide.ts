import { z } from 'zod'
import { fetchComponentList, getComponentDataAttributes } from '../lib/fetch.js'
import type { Tool } from '../lib/types.js'

export const stylingGuideTool: Tool<{ componentList: string[] }> = {
  name: 'styling_guide',
  description:
    'This tool retrieves the data attributes for a specific component in Ark UI, which can be used for styling and customization.',
  ctx: async () => {
    const componentList = await fetchComponentList('react') // Default to 'react' for initial context
    return { componentList }
  },
  async exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe('The name of the component to retrieve data attributes for.'),
      },
      async ({ component }) => {
        const attributes = await getComponentDataAttributes(component)
        const extraGuide = customGuides[component] || ''

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(attributes, null, 2),
            },
            {
              type: 'text',
              text: extraGuide ? `Extra styling notes:\n\n${extraGuide}` : '',
            },
          ],
        }
      },
    )
  },
}

const collapseKeyframes =
  '@keyframes slideDown{from{opacity:0.01;height:0}to{opacity:1;height:var(--height)}} @keyframes slideUp{from{opacity:1;height:var(--height)}to{opacity:0.01;height:0}}'

const circularProgressKeyframes = `
@keyframes spin-progress{0%{stroke-dasharray:1,400;stroke-dashoffset:0}100%{stroke-dasharray:400,400;stroke-dashoffset:-140}}
`

const linearProgressKeyframes = `
@keyframes progress-animation{0%{transform:scaleX(1)translateX(var(--translate-x))}100%{transform:scaleX(0)translateX(var(--translate-x))}}
`

const popperStyleGuide = `
  Arrow: Set the --arrow-size and --arrow-background css variables to style the arrow.
  
  Content:The z-index should be set on this part.
  --reference-width: style the content based on the width of the reference element.
  --available-width and --available-height: available width and height on the viewport.
  --transform-origin: the calculated transform origin based on the placement (use to make origin aware animations)
  
  Positioner: The positioner reads the z-index from the content part and sets it on itself as --z-index css variable.
  `

const dismissibleStyleGuide = `
  Content: --layer-index is the index of the content in the layer stack.
`

const dialogStyleGuide = `
 Backdrop: We expose the content z-index as --z-index css variable (to manage stacking order)
`

const collapsibleStyleGuide = `
Content: We expose --height and --width css variables to animate the height/width.
Here's a sample animation: ${collapseKeyframes}
`

const indicatorStyleGuide = `
Indicator: We expose --width and --height css variables that matches the width and height of the active trigger
`

const customGuides: Record<string, string> = {
  collapsible: collapsibleStyleGuide,
  accordion: collapsibleStyleGuide,

  'angle-slider': `
Root: --value and --angle css variables.
Thumb: has 'rotate: var(--angle)'
Marker: --marker-value css variable, and 'rotate: calc(var(--marker-value) * 1deg)' style
  `,

  toast: `
Root: --x, --y, --scale, --z-index, --height, --opacity, --gap css variables
Root styling MUST include these styles to work correctly:

[data-scope=toast][data-part=root] {
  translate: var(--x) var(--y);
  scale: var(--scale);
  z-index: var(--z-index);
  height: var(--height);
  opacity: var(--opacity);
  will-change: translate, opacity, scale;
  transition:
    translate 400ms,
    scale 400ms,
    opacity 400ms,
    height 400ms,
    box-shadow 200ms;
  transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);

  &[data-state='closed'] {
    transition:
      translate 400ms,
      scale 400ms,
      opacity 200ms;
    transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
  }
}

You can also style the toast based on the type of toast:
data-type: error, info, warning, success
  `,

  'tree-view': `
  Item, BranchControl: --depth css variable.
  Consider applying a padding similar to
  
  --padding-inline: 16px;
  padding-inline-start: calc(var(--depth) * var(--padding-inline));
  padding-inline-end: var(--padding-inline);

  --------

  BranchIndentGuide: --depth css variable. Consider applying a translate similar to
  translate: calc(var(--depth) * 1.25rem);

  --------

  BranchContent: --height css variable

  To animate the height of the branch content, apply the following keyframes when data-state is open or closed: ${collapseKeyframes}
  `,

  tabs: indicatorStyleGuide,
  'radio-group': indicatorStyleGuide,

  slider: `
  Root: Use variables like --slider-thumb-width, --slider-thumb-height, --slider-track-height css variables.
  `,

  tooltip: popperStyleGuide,
  tour: `${popperStyleGuide}
  
  Tour can have different types: floating or dialog.
  - Style floating: has a [data-type='placement'] attribute to the positioner.
  - Style dialog: [data-type='dialog'] attribute to the positioner.

  Make sure the body has position: relative;
  `,

  select: [popperStyleGuide, dismissibleStyleGuide].join('\n'),
  popover: [popperStyleGuide, dismissibleStyleGuide].join('\n'),
  menu: [popperStyleGuide, dismissibleStyleGuide].join('\n'),
  'hover-card': [popperStyleGuide, dismissibleStyleGuide].join('\n'),
  combobox: [popperStyleGuide, dismissibleStyleGuide].join('\n'),

  dialog: [dismissibleStyleGuide, dialogStyleGuide].join('\n'),

  'qr-code': `
  Root: We expose --qrcode-pixel-size, --qrcode-width, --qrcode-height css variables.
  `,

  progress: `
  If it's a circular progress:
  - use the --size, --thickness css variables to style the circle.
  - When [data-state='indeterminate'], consider animating the stroke-dasharray and stroke-dashoffset. Similar to this animation: ${circularProgressKeyframes}

  For linear progress:
  - When [data-state='indeterminate'], consider animating the width. Similar to this animation: ${linearProgressKeyframes}.
  `,
}
