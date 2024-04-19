import useStore from "../store/store";
import { monsterInfo } from "../assets/monsters/monsterInfo"
import { attackSkillInfo } from "../assets/skills/skillInfo";

export default function KillResult({ skillName, skillLevel, monsterName }) {
  const character = useStore((state) => state.character)
  const monster = monsterInfo.victoriaIsland[monsterName]
  const skill = attackSkillInfo[character.occupation][skillName]

  return (
    <>
      {skill &&
        <div>{skill.formula(skillLevel, character, monster)}</div>
      }
    </>
  )
}