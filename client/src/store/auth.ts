import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { User } from 'types/user'

interface UserState {
  accessToken: string | null
  userInfo: User | null
  setAccessToken: (token: string) => void
  setUserInfo: (userInfo: User) => void
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    accessToken: null,
    userInfo: null,
    setAccessToken: (token: string) => set({ accessToken: token }),
    setUserInfo: (userInfo: User) => set({ userInfo: { ...userInfo } }),
  }))
)
