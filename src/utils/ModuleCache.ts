interface Type<T> extends Function {
  new (...args: Array<any>): T
}

// Instantiate classes when needed
export class ModuleCache {
  #cache = new Map()

  loadInstance<T>(Service: Type<T>, ...args: Array<unknown>) {
    if (this.#cache.has(Service)) {
      return this.#cache.get(Service)
    }

    let service
    try {
      service = new Service(...args)
    } catch (err) {
      throw new Error("Could not instantiate this class.")
    }
    this.#cache.set(Service, service)

    return service
  }
}
