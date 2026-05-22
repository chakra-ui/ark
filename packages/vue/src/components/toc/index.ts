export type { ActiveChangeDetails as TocActiveChangeDetails, TocItem as TocItemData } from '@zag-js/toc'
export { default as TocContent, type TocContentBaseProps, type TocContentProps } from './toc-content.vue'
export { default as TocContext, type TocContextProps } from './toc-context.vue'
export { default as TocIndicator, type TocIndicatorBaseProps, type TocIndicatorProps } from './toc-indicator.vue'
export { default as TocItem, type TocItemBaseProps, type TocItemProps } from './toc-item.vue'
export { default as TocLink, type TocLinkBaseProps, type TocLinkProps } from './toc-link.vue'
export { default as TocList, type TocListBaseProps, type TocListProps } from './toc-list.vue'
export { default as TocNav, type TocNavBaseProps, type TocNavProps } from './toc-nav.vue'
export { default as TocRoot, type TocRootBaseProps, type TocRootEmits, type TocRootProps } from './toc-root.vue'
export {
  default as TocRootProvider,
  type TocRootProviderBaseProps,
  type TocRootProviderProps,
} from './toc-root-provider.vue'
export { default as TocTitle, type TocTitleBaseProps, type TocTitleProps } from './toc-title.vue'
export { tocAnatomy } from './toc.anatomy'
export { useToc, type UseTocProps, type UseTocReturn } from './use-toc'
export { useTocContext, type UseTocContext } from './use-toc-context'

export * as Toc from './toc'
