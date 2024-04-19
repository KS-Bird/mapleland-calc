'use client'
import { useLayoutEffect } from "react"
import useStore from "../store/store"
import { useRouter } from 'next/navigation'
import { buffSkillInfo, attackSkillInfo } from '../assets/skills/skillInfo';

const gap10px = { marginRight: "10px" }

export default function RootLayout({ children }) {
  const router = useRouter()
  const character = useStore((state) => state.character)
  const updateFunc = useStore((state) => state.updateFunc);

  const onChangeOccupation = (e) => {
    updateFunc.setOccupation(e.target.value)
    updateFunc.setBuffSkillList(
      buffSkillInfo[e.target.value]
        .nameList.map(({ name, krName }) => ({ name, krName, level: 1 }))
    )
    updateFunc.setAttackSkillList(
      attackSkillInfo[e.target.value]
        .nameList.map(({ name, krName }) => ({ name, krName }))
    )
  }

  useLayoutEffect(() => {
    if (['Fighter', 'Page', 'Spearman'].includes(character.occupation)) {
      router.push('/warrior')
    } else if (['Fire/Poiso', 'Ice/Lightning', 'Cleric'].includes(character.occupation)) {
      router.push('/magician')
    } else if (['Assassin', 'Bandit', 'Hunter', 'Crossbowman'].includes(character.occupation)) {
      router.push('/thiefAndArrow')
    }
  }, [character.occupation, router])

  return (
    <html lang="ko">
      <body>
        <div>
          <div align='center'>
            <h1>메랜 계산기</h1>
            <div>
              <label htmlFor="userRole" style={{ marginRight: "10px" }}>직업</label>
              <select id="userRole" value={character.occupation || ''} onChange={onChangeOccupation}>
                <option value='Fighter'>파이터</option>
                <option value='Page'>페이지</option>
                <option value='Spearman'>스피어맨</option>
                <option value='Hunter'>헌터</option>
                <option value='Crossbowman'>사수</option>
                <option value='Fire/Poison'>불독</option>
                <option value='Ice/Lightning'>썬콜</option>
                <option value='Cleric'>클레릭</option>
                <option value='Assassin'>어쌔신</option>
                <option value='Bandit'>시프</option>
              </select>
            </div>
            <div>
              <label htmlFor="userLevel" style={gap10px}>레벨</label>
              <input id="userLevel" type="number" onChange={(e) => updateFunc.setLevel(e.target.value)} value={character.level} />
            </div>
            <div>
              <div>
                <label htmlFor="STR" style={gap10px}>STR</label>
                <input id="STR" type="number" onChange={(e) => updateFunc.setSTR(e.target.value)} value={character.STR} />
              </div>
              <div>
                <label htmlFor="DEX" style={gap10px}>DEX</label>
                <input id="DEX" type="number" onChange={(e) => updateFunc.setDEX(e.target.value)} value={character.DEX} />
              </div>
              <div>
                <label htmlFor="INT" style={gap10px}>INT</label>
                <input id="INT" type="number" onChange={(e) => updateFunc.setINT(e.target.value)} value={character.INT} />
              </div>
              <div>
                <label htmlFor="LUK" style={gap10px}>LUK</label>
                <input id="LUK" type="number" onChange={(e) => updateFunc.setLUK(e.target.value)} value={character.LUK} />
              </div>
            </div>
            <br />
            {children}
          </div >
        </div>
      </body >
    </html >
  )
}