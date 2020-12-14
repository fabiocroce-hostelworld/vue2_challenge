import { ModuleCache } from "@/utils/ModuleCache"

class Client {
  property = "test"
}

describe("LazyImporter", () => {
  it("test instance creation", async () => {
    const moduleCache = new ModuleCache()

    expect(moduleCache.loadInstance(Client)).toBeInstanceOf(Client)
  })

  it("test non existent import", async () => {
    try {
      new ModuleCache().loadInstance("")
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })

  it("test successful import from cache", async () => {
    const moduleDCache = new ModuleCache()
    const moduleCache = moduleDCache.loadInstance(Client)
    const moduleCache2 = moduleDCache.loadInstance(Client)

    expect(moduleCache).toBe(moduleCache2)
  })
})
