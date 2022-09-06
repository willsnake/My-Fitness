import create from 'zustand'
import produce from 'immer'
import { devtools, persist } from 'zustand/middleware'
import type { User } from 'firebase/auth'

interface UserState {
    user: User
    setUser: (user: User) => void
}

export const store = create<UserState>()(
  devtools(
    persist((set) => ({
        user: null,
        setUser: (user) =>
            set(
                produce((state) => {
                    state.user = user
                })
            ),
    }))
  )
)