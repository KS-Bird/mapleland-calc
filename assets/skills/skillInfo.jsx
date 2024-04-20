export const buffSkillInfo = {
  Assassin: {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격', maxLevel: 30 },
      { name: 'J Mastary', krName: '자벨린 마스터리', maxLevel: 30 }
    ],
  }
}

export const attackSkillInfo = {
  Assassin: {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐', maxLevel: 30 },
      { name: 'Avenger', krName: '어벤져', maxLevel: 30 }
    ],
    'Lucky Seven': {
      name: "Lucky Seven",
      krName: '럭키세븐',
      formula: (skillLevel, character, monster) => {
        return character.LUK * 5 * character.ATT * 0.01 * (56 + 2 * skillLevel) / 100
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