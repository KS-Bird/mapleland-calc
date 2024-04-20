'use client'
import useStore from "../../store/store"
import AttackSkillManager from "../../components/AttackSkillManager"
import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

const gap10px = { marginRight: "10px" }

export default function Magician() {
  const router = useRouter()
  const character = useStore((state) => state.character)
  const updateFunc = useStore((state) => state.updateFunc)

  useLayoutEffect(() => {
    if (!character.occupation) {
      router.push('/')
    }
  }, [character.occupation, router])

  return (
    <div>
      <div>
        <div>
          <label htmlFor="MATT" style={gap10px}>마력</label>
          <input id="MATT" type="number" onChange={(e) => updateFunc.setMATT(Number(e.target.value))} value={character.MATT} />
        </div>
      </div>
      <br />
      <div>
        {character.buffSkillList.map(({ krName, level }, i) => {
          return (
            <div key={i}>
              <label htmlFor={krName} style={gap10px}>{krName}</label>
              <input id={krName} type="number" onChange={(e) => updateFunc.setBuffSkillLevel(i, Number(e.target.value))} value={level} />
            </div>
          )
        })}
      </div>
      <br />
      <AttackSkillManager />
    </div>
  )
}