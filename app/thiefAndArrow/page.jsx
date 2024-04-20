'use client'
import { useRouter } from 'next/navigation'
import useStore from "../../store/store"
import AttackSkillManager from "../../components/AttackSkillManager"
import { calcStatAttack } from "../../assets/skills/skillInfo"
import { useLayoutEffect } from 'react'

const gap10px = { marginRight: "10px" }

export default function ThiefAndArrow() {
  const router = useRouter()
  const character = useStore((state) => state.character)
  const updateFunc = useStore((state) => state.updateFunc)

  useLayoutEffect(() => {
    if (!character.occupation) {
      router.push('/')
    }
  }, [character.occupation, router])

  const [minStatAttack, maxStatAttack] = calcStatAttack(character)

  return (
    <div>
      <div>
        <div>
          <label htmlFor="ATT" style={gap10px}>공격력</label>
          <input id="ATT" type="number" onChange={(e) => updateFunc.setATT(Number(e.target.value))} value={character.ATT} />
        </div>
      </div>
      <br />
      <div>
        스텟공격력: {minStatAttack}~{maxStatAttack}
      </div>
      <br />
      <div>
        {character.buffSkillList.map(({ krName, level, maxLevel }, i) => {
          return (
            <div key={i}>
              <label htmlFor={krName} style={gap10px}>{krName}</label>
              <input id={krName} type="number" onChange={(e) => updateFunc.setBuffSkillLevel(i, Number(e.target.value))} value={level} max={maxLevel} />
            </div>
          )
        })}
      </div>
      <br />
      <AttackSkillManager />
    </div>
  )
}