import useStore from "../store/store"

export default function AttackSkillTap({ index, skillName, skillLevel, setSkill }) {
  const attackSkillList = useStore((state) => state.character.attackSkillList)

  return (
    <>
      <div>
        <select value={skillName || ''} onChange={(e) => setSkill(index, e.target.value, skillLevel)}>
          {attackSkillList.map(({ name, krName }) => (<option key={name} value={name} >{krName}</option>))}
        </select>
        <input type="number" onChange={(e) => setSkill(index, skillName, e.target.value)} value={skillLevel} />
      </div >
    </>
  )
}