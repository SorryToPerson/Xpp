import Store from 'electron-store'

export interface StoreType {
  userInfo: Record<string, string>
}

class DataStore {
  private store: Store<StoreType>

  constructor() {
    this.store = new Store<StoreType>({
      defaults: {
        userInfo: {}
      }
    })
  }

  get<T extends keyof StoreType>(key: T): StoreType[T] {
    return this.store.get(key)
  }

  set<T extends keyof StoreType>(key: T, value: StoreType[T]): void {
    this.store.set(key, value ?? '')
  }

  delete(key: keyof StoreType): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}

export default new DataStore()
