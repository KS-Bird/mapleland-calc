import { calcStatAttack, applyMonsterDefense, calcKillProbability } from "./commonFormulas"

export const buffSkillInfo = {
  'Fighter': {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격', maxLevel: 30 },
      { name: 'Claw Mastery', krName: '자벨린 마스터리', maxLevel: 20 }
    ],
  },
  'Assassin': {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격', maxLevel: 30 },
      { name: 'Claw Mastery', krName: '자벨린 마스터리', maxLevel: 20 }
    ],

    'Critical Attack': (level) => {
      const successRateByLevel = [
        0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3,
        0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.4,
        0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5
      ]
      const damageByLevel = [
        0.13, 0.16, 0.19, 0.22, 0.25, 0.28, 0.31, 0.34, 0.37, 0.4,
        0.43, 0.46, 0.49, 0.52, 0.55, 0.558, 0.61, 0.64, 0.67, 7,
        0.73, 0.76, 0.79, 0.82, 0.85, 0.88, 0.91, 0.94, 0.97, 1
      ]
      return { successRate: successRateByLevel[level - 1] || 0, damageRate: damageByLevel[level - 1] || 0 }
    },
    'Claw Mastery': (level) => {
      const masteryByLevel = [
        0.15, 0.15, 0.2, 0.2, 0.25, 0.25, 0.3, 0.3, 0.35, 0.35,
        0.4, 0.4, 0.45, 0.45, 0.5, 0.5, 0.55, 0.55, 0.6, 0.6
      ]
      return masteryByLevel[level - 1] || 0.1
    }
  }
}

export const attackSkillInfo = {
  'Fighter': {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐', maxLevel: 20 },
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
      const skillPDamageByLevel = [
        0.58, 0.62, 0.66, 0.70, 0.76, 0.80, 0.84, 0.9, 0.94, 1,
        1.04, 1.1, 1.14, 1.2, 1.24, 1.3, 1.34, 1.4, 1.44, 1.5
      ]
      const skillPDamage = skillPDamageByLevel[skillLevel - 1]
      const max = character.LUK * 5 * character.ATT / 100
      const min = character.LUK * 2.5 * character.ATT / 100
      const defenseApplied = applyMonsterDefense(character.level, monster, [min, max])

      const damage = defenseApplied.map((v) => {
        v = Math.floor(v * skillPDamage)
        if (v < 1) {
          v = 1
        } else if (v > 199999) {
          v = 199999
        }
        return v
      })

      const criticalThrowLevel = character.buffSkillList.filter((v) => v.name === 'Critical Attack')[0].level
      const criticalDamageRate = buffSkillInfo.Assassin["Critical Attack"](criticalThrowLevel).damageRate
      const criticalDamage = defenseApplied.map((v) => {
        v = Math.floor(v * (skillPDamage + criticalDamageRate))
        if (v < 1) {
          v = 1
        } else if (v > 199999) {
          v = 199999
        }
        return v
      })

      const result = {
        min: damage[0],
        max: damage[1],
        criMin: criticalDamage[0],
        criMax: criticalDamage[1],
        sumMin: damage[0] * 2,
        sumMax: criticalDamage[1] * 2,
        count: 2,
      }
      return result
    },
    'Avenger': (skillLevel, character, monster) => {
      const skillPDamageByLevel = [
        0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1,
        1.14, 1.18, 1.22, 1.26, 1.3, 1.34, 1.38, 1.42, 1.46, 1.5,
        1.53, 1.56, 1.59, 1.52, 1.65, 1.68, 1.71, 1.74, 1.77, 1.8
      ]
      const skillPDamage = skillPDamageByLevel[skillLevel - 1]
      const [min, max] = calcStatAttack(character)
      const defenseApplied = applyMonsterDefense(character.level, monster, [min, max])

      const damage = defenseApplied.map((v) => {
        v = Math.floor(v * skillPDamage)
        if (v < 1) {
          v = 1
        } else if (v > 199999) {
          v = 199999
        }
        return v
      })

      const criticalThrowLevel = character.buffSkillList.filter((v) => v.name === 'Critical Attack')[0].level
      const criticalDamageRate = buffSkillInfo.Assassin["Critical Attack"](criticalThrowLevel).damageRate
      const criticalDamage = defenseApplied.map((v) => {
        v = Math.floor(v * (skillPDamage + criticalDamageRate))
        if (v < 1) {
          v = 1
        } else if (v > 199999) {
          v = 199999
        }
        return v
      })

      const probabilities = calcKillProbability(defenseApplied, skillPDamage, monster.hp)
      console.log(probabilities)

      const result = {
        min: damage[0],
        max: damage[1],
        criMin: criticalDamage[0],
        criMax: criticalDamage[1],
        sumMin: damage[0],
        sumMax: criticalDamage[1],
        count: 1,
      }
      return result
    }
  }
}
