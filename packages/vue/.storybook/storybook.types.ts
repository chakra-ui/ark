// Convert Vue emit tuple format to function format for Storybook
// example: from `statusChange: [details: avatar.StatusChangeDetails]`
// to `statusChanged: (details: avatar.StatusChangeDetails) => void`
export type EmitHandlers<T> = {
  [K in keyof T]: T[K] extends readonly [infer P] ? (param: P) => void : never
}
