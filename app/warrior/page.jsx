'use client'
import useStore from "../../store/store"
import AttackSkillManager from "../../components/AttackSkillManager"

const gap10px = { marginRight: "10px" }

export default function Warrior() {
  const character = useStore((state) => state.character)
  const updateFunc = useStore((state) => state.updateFunc)

  return (
    <div>
      <div>
        <div>
          <label htmlFor="weaponType" style={gap10px}>무기 타입</label>
          <select id="weaponType" onChange={(e) => updateFunc.setWeaponType(e.target.value)}>
            <option>두손검</option>
            <option>두손도끼</option>
            <option>폴암</option>
            <option>창</option>
            <option>한손검</option>
            <option>한손도끼</option>
            <option>한손둔기</option>
          </select>
        </div>
        <div>
          <label htmlFor="ATT" style={gap10px}>공격력</label>
          <input id="ATT" type="number" onChange={(e) => updateFunc.setATT(e.target.value)} value={character.ATT} />
        </div>
      </div>
      <br />
      <div>
        {character.buffSkillList.map(({ krName, level }, i) => {
          return (
            <div key={i}>
              <label htmlFor={krName} style={gap10px}>{krName}</label>
              <input id={krName} type="number" onChange={(e) => updateFunc.setBuffSkillLevel(i, e.target.value)} value={level} />
            </div>
          )
        })}
      </div>
      <br />
      <AttackSkillManager />
    </div>
  )
}