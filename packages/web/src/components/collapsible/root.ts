import * as collapsible from '@zag-js/collapsible'
import { defineRoot } from '../../utils/define.js'
import { root, size } from './shared.js'

defineRoot<collapsible.Api>({
  properties: ['ids'],

  tag: root,
  machine: collapsible.machine,
  connect: collapsible.connect,
  attributes: ['open', 'default-open', 'disabled', 'collapsed-height', 'collapsed-width', 'hidden-until-found'],
  props: (el) => ({
    open: el.hasAttribute('open') ? true : undefined,
    defaultOpen: el.hasAttribute('default-open'),
    disabled: el.hasAttribute('disabled'),
    collapsedHeight: size(el.getAttribute('collapsed-height')),
    collapsedWidth: size(el.getAttribute('collapsed-width')),
    hiddenUntilFound: el.hasAttribute('hidden-until-found'),
  }),
  events: { onOpenChange: 'openchange', onExitComplete: 'exitcomplete' },
  rootProps: (api) => api.getRootProps(),
})
