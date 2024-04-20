'use client'
import { useState, useRef } from "react"
import AttackSkillTap from "./AttackSkillTap"
import MonsterTap from "./MonsterTap"
import KillResult from "./KillResult"

export default function AttackSkillManager() {
  const [skills, setSkills] = useState([{ id: 0, name: 'Avenger', level: 1 }])
  const setSkill = (index, name, level) => {
    skills[index] = { ...skills[index], name, level }
    setSkills([...skills])
  }

  const [monsters, setMonsters] = useState(['Slime'])
  const setMonster = (index, name) => {
    monsters[index] = name;
    setMonsters([...monsters])
  }

  const idRef = useRef(skills[skills.length - 1]?.id + 1)

  const addTap = () => {
    setSkills([...skills, { id: idRef.current++, name: null, level: 1 }])
    setMonsters([...monsters, null])
  }

  const removeTap = (index) => {
    setSkills(skills.filter((v, i) => i != index))
    setMonsters(monsters.filter((v, i) => i != index))
  }
  console.log(skills)
  console.log(monsters)
  return (
    <>
      {skills.map((v, i) => {
        return (
          <div key={v.id}>
            <AttackSkillTap index={i} skillName={v.name} skillLevel={v.level} setSkill={setSkill} />
            <MonsterTap index={i} monsterName={monsters[i]} setMonster={setMonster} />
            <KillResult skillName={v.name} skillLevel={v.level} monsterName={monsters[i]} />
            <button onClick={() => removeTap(i)}>-</button>
          </div>
        )
      })}
      <button onClick={addTap}>+</button >
    </>
  )
}