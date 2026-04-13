export type { ActiveChangeDetails as TocActiveChangeDetails, TocItem as TocItemData } from '@zag-js/toc'
export { default as TocContent, type TocContentBaseProps, type TocContentProps } from './toc-content.svelte'
export { default as TocContext, type TocContextProps } from './toc-context.svelte'
export { default as TocIndicator, type TocIndicatorBaseProps, type TocIndicatorProps } from './toc-indicator.svelte'
export { default as TocItem, type TocItemBaseProps, type TocItemProps } from './toc-item.svelte'
export { default as TocLink, type TocLinkBaseProps, type TocLinkProps } from './toc-link.svelte'
export { default as TocList, type TocListBaseProps, type TocListProps } from './toc-list.svelte'
export { default as TocNav, type TocNavBaseProps, type TocNavProps } from './toc-nav.svelte'
export { default as TocRoot, type TocRootBaseProps, type TocRootProps } from './toc-root.svelte'
export {
  default as TocRootProvider,
  type TocRootProviderBaseProps,
  type TocRootProviderProps,
} from './toc-root-provider.svelte'
export { default as TocTitle, type TocTitleBaseProps, type TocTitleProps } from './toc-title.svelte'
export { tocAnatomy } from './toc.anatomy'
export { useToc, type UseTocProps, type UseTocReturn } from './use-toc.svelte'
export { useTocContext, type UseTocContext } from './use-toc-context'
export * as Toc from './toc'
