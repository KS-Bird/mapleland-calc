import useStore from "../store/store";
import { monsterInfo } from "../assets/monsters/monsterInfo"
import { attackSkillInfo } from "../assets/skills/skillInfo";

export default function KillResult({ skillName, skillLevel, monsterName }) {
  const character = useStore((state) => state.character)

  if (!(skillName && monsterName)) {
    return null
  }

  const monster = monsterInfo.victoriaIsland[monsterName]
  const skill = attackSkillInfo[character.occupation]?.[skillName]

  const damage = skill(skillLevel, character, monster)

  return (
    <>
      <div>
        <div>데미지:{damage.min}~{damage.max}</div>
        <div>크리 데미지:{damage.criMin}~{damage.criMax}</div>
        <div>총 데미지:{damage.sumMin}~{damage.sumMax}</div>
      </div>
    </>
  )
}