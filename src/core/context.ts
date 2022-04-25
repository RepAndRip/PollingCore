export interface Context {
  get: (key: string) => Promise<any> | any
  set: (key: string, value: any) => Promise<void> | void
  isset: (key: string) => Promise<boolean> | boolean
  unset: (key: string) => Promise<void> | void
}
