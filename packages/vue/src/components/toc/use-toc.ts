import * as toc from '@zag-js/toc'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './toc.types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTocApi extends toc.Api<PropTypes> {
  // TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
  getNavProps(): PropTypes['element']
}

export interface UseTocReturn extends ComputedRef<UseTocApi> {}

export const useToc = (props: MaybeRef<UseTocProps>, emits?: EmitFn<RootEmits>): UseTocReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<toc.Props>(() => {
    const localProps = toValue<UseTocProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onActiveChange: (details) => {
        emits?.('activeChange', details)
        localProps.onActiveChange?.(details)
      },
    }
  })

  const service = useMachine(toc.machine, context)
  return computed(() => withNavProps(toc.connect(service, normalizeProps)))
}

// TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
const withNavProps = (api: toc.Api<PropTypes>): UseTocApi => ({
  ...api,
  getRootProps() {
    const { 'aria-labelledby': _, ...rootProps } = api.getRootProps()
    return rootProps
  },
  getNavProps() {
    const { id, dir } = api.getRootProps()
    return {
      'data-scope': 'toc',
      'data-part': 'nav',
      id: `${id}:nav`,
      dir,
      'aria-labelledby': api.getTitleProps().id,
    } as PropTypes['element']
  },
})
