import { useId as vueUseId } from 'vue'

export function useId(id?: string) {
	return id ?? vueUseId()
}
