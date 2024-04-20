import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create()(immer((set) => ({
  character: {
    occupation: null,
    level: 1,
    STR: 4,
    DEX: 4,
    INT: 4,
    LUK: 4,

    ATT: 10,
    MATT: 0,
    weaponType: null,

    buffSkillList: [],
    attackSkillList: [],
  },

  updateFunc: {
    setOccupation: (arg) => set((state) => {
      state.character.occupation = arg
    }),
    setLevel: (arg) => set((state) => {
      state.character.level = arg
    }),
    setSTR: (arg) => set((state) => {
      state.character.STR = arg
    }),
    setDEX: (arg) => set((state) => {
      state.character.DEX = arg
    }),
    setINT: (arg) => set((state) => {
      state.character.INT = arg
    }),
    setLUK: (arg) => set((state) => {
      state.character.LUK = arg
    }),
    setATT: (arg) => set((state) => {
      state.character.ATT = arg
    }),
    setMATT: (arg) => set((state) => {
      state.character.MATT = arg
    }),
    setWeaponType: (arg) => set((state) => {
      state.character.weaponType = arg
    }),
    setBuffSkillList: (arg) => set((state) => {
      state.character.buffSkillList = arg
    }),
    setBuffSkillLevel: (index, arg) => set((state) => {
      state.character.buffSkillList[index].level = arg
    }),
    setAttackSkillList: (arg) => set((state) => {
      state.character.attackSkillList = arg
    }),
  }
})))

export default useStore