import { buffSkillInfo } from "./skillInfo"

export const calcStatAttack = (character) => {
  let weaponConstant = 0
  let primaryStat = 0
  let secondaryStat = 0
  let mastery = 0.1
  switch (character.occupation) {
    case 'Fighter':
    case 'Page':
    case 'Spearman':
      switch (character.weaponType) {
        case 'One Handed Sword':
          weaponConstant = [4, 4]
          break
        case 'Two Handed Sword':
          weaponConstant = [4.6, 4.6]
          break
        case 'Spear':
        case 'Polearm':
          weaponConstant = [3, 5]
          break
        case 'One Handed Axe':
        case 'One Handed BW':
          weaponConstant = [3.2, 4.4]
          break
        case 'Two Handed Axe':
        case 'Two Handed BW':
          weaponConstant = [3.4, 4.8]
          break
      }
      primaryStat = character.STR
      secondaryStat = character.DEX
      break
    case 'Hunter':
      weaponConstant = [3.4, 3.4]
      primaryStat = character.DEX
      secondaryStat = character.STR
      break
    case 'Crossbowman':
      weaponConstant = [3.6, 3.6]
      primaryStat = character.DEX
      secondaryStat = character.STR
    case 'Assassin':
      const clawMasteryLevel = character.buffSkillList.filter((v) => v.name === 'Claw Mastery')[0].level
      mastery = buffSkillInfo.Assassin["Claw Mastery"](clawMasteryLevel)
      weaponConstant = [3.6, 3.6]
      primaryStat = character.LUK
      secondaryStat = character.STR + character.DEX
      break;
    case 'Bandit':
      weaponConstant = [3.6, 3.6]
      primaryStat = character.LUK
      secondaryStat = character.STR + character.DEX
      break
  }

  const max = ((primaryStat * weaponConstant[1] + secondaryStat) * character.ATT / 100)
  const min = ((primaryStat * weaponConstant[0] * 0.9 * mastery + secondaryStat) * character.ATT / 100)
  return [min, max]
}

export const applyMonsterDefense = (characterLevel, monster, [minDamage, maxDamage]) => {
  const levelGap = monster.level - characterLevel
  const D = levelGap > 0 ? levelGap : 0
  const max = maxDamage * (1 - 0.01 * D) - monster.physicalDefense * 0.5
  const min = minDamage * (1 - 0.01 * D) - monster.physicalDefense * 0.6
  return [min, max]
}

export const calcKillProbability = ([min, max], skillPDamage, hp) => {
  const len = Math.round(max - min) + 1
  const range = new Array(len > 0 ? len : 0)
    .fill(min)
    .map((v, i) => {
      v += i
      v = Math.floor(v * skillPDamage)
      if (v < 1) {
        v = 1
      } else if (v > 199999) {
        v = 199999
      }
      return v
    })
  const probabilities = {}
  calcPerTimes(range, probabilities, hp)
  return probabilities
}

// DP를 써보자
const calcPerTimes = (range, probabilities, hp, val = 0, times = 1) => {
  // 멕뎀 20번 때려도 못 잡으면 그만
  if (range[1] * 10 < hp) {
    return
  }
  // 민뎀 20번 때려도 못 잡으면 그만
  if (range[0] * 20 < hp) {
    return
  }
  // times - 1번 때릴시 확킬이면 그만
  if (range[0] * (times - 1) >= hp) {
    return
  }
  let totalCases = 0
  let favorableCases = 0
  range.forEach((v) => {
    totalCases++
    const sum = val + v
    if (sum >= hp) {
      favorableCases++
    }
    calcPerTimes(range, probabilities, hp, sum, times + 1)
  })
  probabilities[times] = favorableCases / totalCases
}