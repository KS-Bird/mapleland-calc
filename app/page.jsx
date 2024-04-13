'use client'
import { useCallback, useState } from "react"
import useInput from "../hooks/useInput"

const gap10px = { marginRight: "10px" }

export default function Page() {
  const [userRole, onChangeuserRole] = useInput('')
  const [userLevel, onChangeUserLevel] = useInput(1)
  const [STR, onChangeSTR] = useInput(4)
  const [DEX, onChangeDEX] = useInput(4)
  const [INT, onChangeINT] = useInput(4)
  const [LUK, onChangeLUK] = useInput(4)
  const [att, onChangeAtt] = useInput(0)
  const [magicAtt, onChangeMagicAtt] = useInput(0)
  const [skills, setSkills] = useState({});
  const [selectedMonster, onChangeSelectedMonster] = useInput('좀비루팡');

  console.log(`userRole:${userRole}`)
  console.log(`userLevel:${userLevel}`)
  console.log(`STR:${STR}`)
  console.log(`DEX:${DEX}`)
  console.log(`INT:${INT}`)
  console.log(`LUK:${LUK}`)
  console.log(`att:${att}`)
  console.log(`magicAtt:${magicAtt}`)
  console.log(`skills:`, skills)
  console.log(`selectedMonster:${selectedMonster}`)

  const onChangeSkills = useCallback((e) => {
    setSkills((state) => {
      return {
        ...state,
        [e.target.id]: e.target.value,
      }
    })
  }, [])

  return (
    <>
      <div align='center'>
        <h1>메이플랜드 킬컷 계산기</h1>
        <div>
          <label htmlFor="userRole" style={{ marginRight: "10px" }}>직업</label>
          <select id="userRole" onChange={onChangeuserRole}>
            <option value="파이터">파이터</option>
            <option value="페이지">페이지</option>
            <option value="스피어맨">스피어맨</option>
            <option value="헌터">헌터</option>
            <option value="사수">사수</option>
            <option value="어쌔신">어쌔신</option>
            <option value="시프">시프</option>
            <option value="불독">불독</option>
            <option value="썬콜">썬콜</option>
            <option value="클레릭">클레릭</option>
          </select>
        </div>
        <div>
          <label htmlFor="userLevel" style={gap10px}>레벨</label>
          <input id="userLevel" type="number" onChange={onChangeUserLevel} value={userLevel} />
        </div>
        <div name="stat">
          <div>
            <label htmlFor="STR" style={gap10px}>STR</label>
            <input id="STR" type="number" onChange={onChangeSTR} value={STR} />
          </div>
          <div>
            <label htmlFor="DEX" style={gap10px}>DEX</label>
            <input id="DEX" type="number" onChange={onChangeDEX} value={DEX} />
          </div>
          <div>
            <label htmlFor="INT" style={gap10px}>INT</label>
            <input id="INT" type="number" onChange={onChangeINT} value={INT} />
          </div>
          <div>
            <label htmlFor="LUK" style={gap10px}>LUK</label>
            <input id="LUK" type="number" onChange={onChangeLUK} value={LUK} />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="att" style={gap10px}>공격력</label>
            <input id="att" type="number" onChange={onChangeAtt} value={att} />
          </div>
          <div>
            <label htmlFor="magicAtt" style={gap10px}>마력</label>
            <input id="magicAtt" type="number" onChange={onChangeMagicAtt} value={magicAtt} />
          </div>
        </div>
        <div name="skill">
          {['힐', '샤이닝레이'].map((v) => {
            return (
              <div key={v}>
                <label htmlFor={v} style={gap10px}>{v}</label>
                <input id={v} type="number" onChange={onChangeSkills} value={skills[v] || 1} />
              </div>
            )
          })}
        </div>
        <div name="monster">
          <select onChange={onChangeSelectedMonster}>
            {['좀비루팡', '쿨리좀비'].map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
          <div>레벨:{ }</div>
          <div>경험치:{ }</div>
          <div>물리방어력:{ }</div>
          <div>마법방어력:{ }</div>
        </div>
      </div >
    </>
  )
}