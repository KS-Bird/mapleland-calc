import useStore from "../store/store"

export default function AttackSkillTap({ index, skillName, skillLevel }) {
  const attackSkillList = useStore((state) => state.character.attackSkillList)
  const maxLevel = attackSkillList.filter((v) => v.name === skillName)?.[0]?.maxLevel
  const setSelectedSkill = useStore((state) => state.updateFunc.setSelectedSkill)

  const onChangeSkill = (e) => {
    setSelectedSkill(index, e.target.value, 1)
  }
  const onChangeSkillLevel = (e) => {
    setSelectedSkill(index, skillName, Number(e.target.value))
  }

  return (
    <>
      <div>
        <select value={skillName || ''} onChange={onChangeSkill}>
          <option value='' disabled hidden >선택</option>
          {attackSkillList.map(({ name, krName }) => (<option key={name} value={name} >{krName}</option>))}
        </select>
        <input type="number" onChange={onChangeSkillLevel} value={skillLevel} max={maxLevel} />
      </div >
    </>
  )
}