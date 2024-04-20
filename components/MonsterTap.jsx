'use client'
import { monsterInfo } from "../assets/monsters/monsterInfo"
import useStore from "../store/store"

export default function MonsterTap({ index, monsterName }) {
  const monster = monsterInfo.victoriaIsland[monsterName]
  const setSelectedMonster = useStore((state) => state.updateFunc.setSelectedMonster)

  const onChangeSelectedMonster = (e) => {
    setSelectedMonster(index, e.target.value)
  }

  return (
    <div>
      <select value={monsterName || ''} onChange={onChangeSelectedMonster}>
        <option value='' disabled hidden >선택</option>
        {monsterInfo.victoriaIsland.nameList.map(({ name, krName }) => (<option key={name} value={name}>{krName}</option>))}
      </select>
      {monster &&
        <>
          <div>레벨:{monster.level}</div>
          <div>HP: {monster.hp}</div>
          <div>경험치:{monster.exp}</div>
          <div>물리방어력:{monster.physicalDefense}</div>
          <div>마법방어력:{monster.magicDefense}</div>
          <div>약점:{monster.krVulnerableType}</div>
        </>
      }
    </div>
  )
}