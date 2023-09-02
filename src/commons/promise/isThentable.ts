const isThentable = (arg: unknown): arg is Promise<unknown> => {
  return typeof arg === 'object' && !!arg && typeof (arg as Promise<unknown>).then === 'function'
}

export default isThentable
