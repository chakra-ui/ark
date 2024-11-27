import { nanoid } from 'nanoid/non-secure'

// TODO https://github.com/sveltejs/svelte/issues/7517
export const createId = () => nanoid(10)
