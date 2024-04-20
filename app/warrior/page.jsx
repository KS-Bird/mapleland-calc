'use client'
import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"
import useStore from "../../store/store"
import AttackSkillManager from "../../components/AttackSkillManager"
import { calcStatAttack } from "../../assets/skills/commonFormulas"

const gap10px = { marginRight: "10px" }

export default function Warrior() {
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
          <label htmlFor="weaponType" style={gap10px}>무기 타입</label>
          <select id="weaponType" value={character.weaponType || ''} onChange={(e) => updateFunc.setWeaponType(e.target.value)}>
            <option value='' disabled hidden>선택</option>
            <option value='One Handed Sword'>한손검</option>
            <option value='One Handed Axe'>한손도끼</option>
            <option value='One Handed BW'>한손둔기</option>
            <option value='Two Handed Sword'>두손검</option>
            <option value='Two Handed Axe'>두손도끼</option>
            <option value='Two Handed BW'>두손둔기</option>
            <option value='Spaer'>창</option>
            <option value='Polearm'>폴암</option>
          </select>
        </div>
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