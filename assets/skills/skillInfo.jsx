export const calcStatAttack = (character) => {
  let weaponConstant = 0
  let primaryStat = 0
  let secondaryStat = 0
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
    case 'Bandit':
      weaponConstant = [3.6, 3.6]
      primaryStat = character.LUK
      secondaryStat = character.STR + character.DEX
      break
  }

  const mastery = 0.1

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

export const buffSkillInfo = {
  'Fighter': {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격', maxLevel: 30 },
      { name: 'J Mastary', krName: '자벨린 마스터리', maxLevel: 30 }
    ],
  },
  'Assassin': {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격', maxLevel: 30 },
      { name: 'J Mastary', krName: '자벨린 마스터리', maxLevel: 30 }
    ],
  }
}

export const attackSkillInfo = {
  'Fighter': {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐', maxLevel: 30 },
      { name: 'Avenger', krName: '어벤져', maxLevel: 30 }
    ],

    'Lucky Seven': (skillLevel, character, monster) => {
    },
    'Avenger': (skillLevel, character, monster) => {
    }
  },
  'Assassin': {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐', maxLevel: 20 },
      { name: 'Avenger', krName: '어벤져', maxLevel: 30 }
    ],

    'Lucky Seven': (skillLevel, character, monster) => {
      const skillPDamageList = [
        0.58, 0.62, 0.66, 0.70, 0.76, 0.80, 0.84, 0.9, 0.94, 1,
        1.04, 1.1, 1.14, 1.2, 1.24, 1.3, 1.34, 1.4, 1.44, 1.5
      ]
      const skillPDamage = skillPDamageList[skillLevel - 1]
      const max = character.LUK * 5 * character.ATT / 100
      const min = character.LUK * 2.5 * character.ATT / 100
      return applyMonsterDefense(character.level, monster, [min, max])
        .map(damage => {
          damage *= skillPDamage
          if (damage < 1) {
            damage = 1
          }
          return damage
        })
    },
    'Avenger': (skillLevel, character, monster) => {
      const skillPDamageList = [
        0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1,
        1.14, 1.18, 1.22, 1.26, 1.3, 1.34, 1.38, 1.42, 1.46, 1.5,
        1.53, 1.56, 1.59, 1.52, 1.65, 1.68, 1.71, 1.74, 1.77, 1.8
      ]
      const skillPDamage = skillPDamageList[skillLevel - 1]
      const [minStatAttack, maxStatAttack] = calcStatAttack(character)
      const [min, max] = [minStatAttack, maxStatAttack]
      return applyMonsterDefense(character.level, monster, [min, max])
        .map(damage => {
          damage *= skillPDamage
          if (damage < 1) {
            damage = 1
          }
          return damage
        })
    }
  }
}
