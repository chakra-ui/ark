export { avatarAnatomy } from '@ark-ui/angular/avatar'
// Batch 2 components live under src/. Relative imports avoid ng-packagr resolving
// these secondary entry points as @ark-ui/angular/src/<name> during graph analysis.
export { collapsibleAnatomy } from './collapsible/collapsible.anatomy'
export { dialogAnatomy } from './dialog/dialog.anatomy'
export { drawerAnatomy } from './drawer/drawer.anatomy'
// Use a relative import so this aggregate stays form-isolation safe.
export { editableAnatomy } from '../editable/editable.anatomy'
export { fieldAnatomy } from '@ark-ui/angular/field'
export { fieldsetAnatomy } from '@ark-ui/angular/fieldset'
export { hoverCardAnatomy } from './hover-card/hover-card.anatomy'
export { menuAnatomy } from './menu/menu.anatomy'
export { navigationMenuAnatomy } from './navigation-menu/navigation-menu.anatomy'
export { popoverAnatomy } from './popover/popover.anatomy'
export { progressAnatomy } from '@ark-ui/angular/progress'
export { toggleAnatomy } from '@ark-ui/angular/toggle'
export { tooltipAnatomy } from './tooltip/tooltip.anatomy'
