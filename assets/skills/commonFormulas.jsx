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

export const calcKillProbability = ([minBefore, maxBefore], skillPDamage, hp, critRate = 0, critDamageRate = 0, n = 10) => {
  console.time('t')
  const nonCritRate = 1 - critRate
  const modifier = maxBefore - minBefore > 1000 ? 0.1 : 1

  minBefore *= modifier
  maxBefore *= modifier
  hp *= modifier
  const len = Math.round(maxBefore - minBefore) + 1

  const range = Array(len > 0 ? len : 0)
    .fill(minBefore)
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
  const minAfter = range[0]

  const critRange = Array(len > 0 ? len : 0)
    .fill(minBefore)
    .map((v, i) => {
      v += i
      v = Math.floor(v * (skillPDamage + critDamageRate))
      if (v < 1) {
        v = 1
      } else if (v > 199999) {
        v = 199999
      }
      return v
    })
  const critMaxAfter = critRange[critRange.length - 1]

  console.log(range, critRange)

  const casesPerN = Array(n + 1).fill(0)

  const maxSum = critMaxAfter * n
  const dp = Array.from({ length: n + 1 }, () => Array(maxSum + 1).fill(0))

  // 멕뎀 n번으로 못잡는 경우 X
  if (critMaxAfter * n < hp) {
    return 0
  }

  // 1번 때렸을때 경우의 수를 먼저 따로 계산
  range.forEach((v) => {
    dp[1][v] += nonCritRate
    if (v >= hp) {
      casesPerN[1] += nonCritRate
    }
  })

  critRange.forEach((v) => {
    dp[1][v] += critRate
    if (v >= hp) {
      casesPerN[1] += critRate
    }
  })

  // 2번 때렸을때부터 계산
  // i는 횟수 k는 합 v는 더할 값
  for (let i = 2; i <= n; i++) {
    // 민뎀 i번으로 확킬나면 i+1부터 계산X
    if (minAfter * (i - 1) >= hp) {
      if (minAfter >= hp) {
        console.log("1방에서 끝")
      } else {
        console.log(i - 1 + "방에서 끝")
      }
      break
    }

    for (let k = minAfter * i; k <= critMaxAfter * i; k++) {
      range.forEach((v) => {
        if (k - v >= 0) {
          dp[i][k] += dp[i - 1][k - v] * nonCritRate
        }
      })
      critRange.forEach((v) => {
        if (k - v >= 0) {
          dp[i][k] += dp[i - 1][k - v] * critRate
        }
      })
      if (k >= hp) {
        casesPerN[i] += dp[i][k]
      }
    }
  }

  const probabilities = casesPerN.map((v, i) => {
    const total = Math.pow(range.length, i)
    const probability = v / total
    console.log(`${i}번째 확률:${probability} = ${v}/${total}`)
    return probability
  })
  console.timeEnd('t')

  const result = []
  for (let i = 1; i < probabilities.length; i++) {
    const v = probabilities[i]
    if (v > 0) {
      let percent = (v - probabilities[i - 1]) * 100
      percent = Number(percent.toFixed(2))
      if (percent > 0) {
        result.push({ times: i, percent })
      }
      if (v >= 1) {
        break
      }
    }
  }

  return result
}