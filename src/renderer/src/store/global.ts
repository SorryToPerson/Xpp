import { create } from 'zustand'
import { IUserInfo } from '@renderer/typings/global'

export const useGlobalStore = create<{
  userInfo: IUserInfo
  setUserInfo: (data: IUserInfo) => void
}>((set) => ({
  userInfo: {
    username: '',
    password: ''
  },
  setUserInfo: (data): void => set(() => ({ userInfo: data }))
}))
