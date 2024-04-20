'use client'
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import useStore from "../store/store"
import AttackSkillTap from "./AttackSkillTap"
import MonsterTap from "./MonsterTap"
import KillResult from "./KillResult"

export default function AttackSkillManager() {
  const selectedSkills = useStore((state) => state.selectedSkills)
  const setSelectedSkills = useStore((state) => state.updateFunc.setSelectedSkills)
  const selectedMonsters = useStore((state) => state.selectedMonsters)
  const setSelectedMonsters = useStore((state) => state.updateFunc.setSelectedMonsters)

  const idRef = useRef(selectedSkills[selectedSkills.length - 1]?.id + 1)

  const addTap = () => {
    setSelectedSkills([...selectedSkills, { id: idRef.current++, name: '', level: 1 }])
    setSelectedMonsters([...selectedMonsters, ''])
  }

  const removeTap = (index) => {
    setSelectedSkills(selectedSkills.filter((_, i) => i != index))
    setSelectedMonsters(selectedMonsters.filter((_, i) => i != index))
  }

  return (
    <>
      {selectedSkills.map((v, i) => {
        return (
          <div key={v.id}>
            <AttackSkillTap index={i} skillName={v.name} skillLevel={v.level} />
            <MonsterTap index={i} monsterName={selectedMonsters[i]} />
            <KillResult skillName={v.name} skillLevel={v.level} monsterName={selectedMonsters[i]} />
            <button onClick={() => removeTap(i)}>-</button>
          </div>
        )
      })}
      <button onClick={addTap}>+</button >
    </>
  )
}
