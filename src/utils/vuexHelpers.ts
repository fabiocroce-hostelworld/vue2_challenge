interface VuexTypes {
  [method: string]: {
    [name: string]: string
  }
}

// This function adds a prefix for the namespace
export const addNamespacePrefix = (types: VuexTypes, prefix: string) => {
  const prefixedTypes = {} as VuexTypes

  Object.keys(types).forEach((key: string) => {
    prefixedTypes[key] = {}
    Object.keys(types[key]).forEach((name: string) => {
      prefixedTypes[key][name] = `${prefix}/${types[key][name]}`
    })
  })

  return prefixedTypes
}
