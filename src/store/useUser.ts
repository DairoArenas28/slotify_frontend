import { create } from 'zustand'
import { User } from '../schemas'

interface UserStore {
    user: User
    setUser: (user: User) => void
} 

export const useUser = create<UserStore>((set) => ({
    user: {
        id: 0,
        name: "",
        email: "",
        role: ""
    },
    setUser: (user) => {
        set({user})
    }
}))