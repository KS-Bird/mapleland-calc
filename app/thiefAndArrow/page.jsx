'use client'
import useStore from "../../store/store"
import AttackSkillManager from "../../components/AttackSkillManager"

const gap10px = { marginRight: "10px" }

export default function ThiefAndArrow() {
  const character = useStore((state) => state.character)
  const updateFunc = useStore((state) => state.updateFunc)

  return (
    <div>
      <div>
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