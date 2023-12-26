import create from 'zustand'

interface UserState {
  accessToken: string | null
  setAccessToken: (token: string) => void
}

const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
}))

export default useUserStore
