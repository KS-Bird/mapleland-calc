import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create()(immer((set) => ({
})))

export default useStore