export type {
  OpenChangeDetails as DrawerOpenChangeDetails,
  SnapPointChangeDetails as DrawerSnapPointChangeDetails,
} from '@zag-js/drawer'
export {
  default as DrawerBackdrop,
  type DrawerBackdropBaseProps,
  type DrawerBackdropProps,
} from './drawer-backdrop.vue'
export {
  default as DrawerCloseTrigger,
  type DrawerCloseTriggerBaseProps,
  type DrawerCloseTriggerProps,
} from './drawer-close-trigger.vue'
export { default as DrawerContent, type DrawerContentBaseProps, type DrawerContentProps } from './drawer-content.vue'
export { default as DrawerContext, type DrawerContextProps } from './drawer-context.vue'
export {
  default as DrawerPositioner,
  type DrawerPositionerBaseProps,
  type DrawerPositionerProps,
} from './drawer-positioner.vue'
export { default as DrawerGrabber, type DrawerGrabberBaseProps, type DrawerGrabberProps } from './drawer-grabber.vue'
export {
  default as DrawerGrabberIndicator,
  type DrawerGrabberIndicatorBaseProps,
  type DrawerGrabberIndicatorProps,
} from './drawer-grabber-indicator.vue'
export { default as DrawerIndent, type DrawerIndentBaseProps, type DrawerIndentProps } from './drawer-indent.vue'
export {
  default as DrawerIndentBackground,
  type DrawerIndentBackgroundBaseProps,
  type DrawerIndentBackgroundProps,
} from './drawer-indent-background.vue'
export { default as DrawerRoot, type DrawerRootBaseProps, type DrawerRootProps } from './drawer-root.vue'
export {
  default as DrawerRootProvider,
  type DrawerRootProviderBaseProps,
  type DrawerRootProviderProps,
} from './drawer-root-provider.vue'
export { default as DrawerStack, type DrawerStackProps } from './drawer-stack.vue'
export { default as DrawerTitle, type DrawerTitleBaseProps, type DrawerTitleProps } from './drawer-title.vue'
export { default as DrawerTrigger, type DrawerTriggerBaseProps, type DrawerTriggerProps } from './drawer-trigger.vue'
export { drawerAnatomy } from './drawer.anatomy'
export { useDrawer, type UseDrawerProps, type UseDrawerReturn } from './use-drawer'
export { useDrawerContext, type UseDrawerContext } from './use-drawer-context'
export { useDrawerStackContext, type UseDrawerStackContext } from './use-drawer-stack-context'

export * as Drawer from './drawer'
