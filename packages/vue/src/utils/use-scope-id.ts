import { hasProp, isString } from '@zag-js/utils'
import { getCurrentInstance, type ComponentInternalInstance } from 'vue'

function hasVnodeScopeId(
  vnode: ComponentInternalInstance['vnode'],
): vnode is ComponentInternalInstance['vnode'] & { scopeId: string } {
  if (vnode === null || typeof vnode !== 'object') return false
  const vnodeObj = vnode as unknown as Record<string, unknown>
  return hasProp(vnodeObj, 'scopeId') && isString(vnodeObj.scopeId)
}

function hasTypeScopeId(
  type: ComponentInternalInstance['type'],
): type is ComponentInternalInstance['type'] & { __scopeId: string } {
  if (type === null || typeof type !== 'object') return false
  const typeObj = type as unknown as Record<string, unknown>
  return hasProp(typeObj, '__scopeId') && isString(typeObj.__scopeId)
}

/**
 * Get scope ID from a component instance.
 */
function getScopeIdFromInstance(instance: ComponentInternalInstance): string | undefined {
  // Check vnode.scopeId first (Vue 3 stores it here)
  if (hasVnodeScopeId(instance.vnode)) return instance.vnode.scopeId
  // If not found, check type.__scopeId
  if (hasTypeScopeId(instance.type)) return instance.type.__scopeId
}

/**
 * Access scope ID for scoped styles from parent component.
 * We need to traverse up the component tree to find a parent with scoped styles.
 */
export function useScopeId(): string | undefined {
  const instance = getCurrentInstance()
  if (!instance) return

  // Check current instance first
  let scopeId = getScopeIdFromInstance(instance)

  // If still not found, check parent components
  if (!scopeId && instance.parent) {
    let parent: ComponentInternalInstance | null = instance.parent
    while (parent && !scopeId) {
      scopeId = getScopeIdFromInstance(parent)
      parent = parent.parent
    }
  }

  return scopeId
}
