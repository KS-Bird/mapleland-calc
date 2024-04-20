import useStore from "../store/store"

export default function AttackSkillTap({ index, skillName, skillLevel, setSkill }) {
  const attackSkillList = useStore((state) => state.character.attackSkillList)
  const maxLevel = attackSkillList.filter((v) => v.name === skillName)?.[0]?.maxLevel

  const onChangeSkill = (e) => {
    setSkill(index, e.target.value, skillLevel)
  }

  return (
    <>
      <div>
        <select value={skillName || ''} onChange={onChangeSkill}>
          <option value='' disabled hidden >선택</option>
          {attackSkillList.map(({ name, krName }) => (<option key={name} value={name} >{krName}</option>))}
        </select>
        <input type="number" onChange={(e) => setSkill(index, skillName, Number(e.target.value))} value={skillLevel} max={maxLevel} />
      </div >
    </>
  )
}