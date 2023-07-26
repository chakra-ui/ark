import type { connect } from '@zag-js/tags-input'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseTagsInputReturn } from './use-tags-input'

export const [TagsInputProvider, useTagsInputContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('TagsInputContext')

export type TagsInputContext = UseTagsInputReturn
