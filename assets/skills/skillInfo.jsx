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
  console.log(primaryStat, weaponConstant[1], secondaryStat, character.ATT)
  const max = Math.floor((primaryStat * weaponConstant[1] + secondaryStat) * character.ATT / 100)
  const min = Math.floor((primaryStat * weaponConstant[0] * 0.9 * mastery + secondaryStat) * character.ATT / 100)
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
    'Lucky Seven': {
      name: "Lucky Seven",
      krName: '럭키세븐',
      formula: (skillLevel, character, monster) => {
        console.log(calcStatAttack(character))
        const max = character.LUK * 5 * character.ATT / 100
        const min = character.LUK * 2.5 * character.ATT / 100
        return [min, max]
      }
    },
    'Avenger': {
      name: "Avenger",
      krName: '어벤져',
      formula: (skillLevel, character, monster) => {
        return skillLevel * 2
      }
    }
  },
  'Assassin': {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐', maxLevel: 30 },
      { name: 'Avenger', krName: '어벤져', maxLevel: 30 }
    ],
    'Lucky Seven': {
      name: "Lucky Seven",
      krName: '럭키세븐',
      formula: (skillLevel, character, monster) => {
        console.log(calcStatAttack(character))
        const max = character.LUK * 5 * character.ATT / 100
        const min = character.LUK * 2.5 * character.ATT / 100
        return [min, max]
      }
    },
    'Avenger': {
      name: "Avenger",
      krName: '어벤져',
      formula: (skillLevel, character, monster) => {
        return skillLevel * 2
      }
    }
  }
}
