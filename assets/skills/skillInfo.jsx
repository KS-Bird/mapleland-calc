export const buffSkillInfo = {
  Assassin: {
    nameList: [
      { name: 'Critical Attack', krName: '크리티컬 공격' },
      { name: 'J Mastary', krName: '자벨린 마스터리' }
    ],
  }
}

export const attackSkillInfo = {
  Assassin: {
    nameList: [
      { name: 'Lucky Seven', krName: '럭키세븐' },
      { name: 'Avenger', krName: '어벤져' }
    ],
    'Lucky Seven': {
      name: "Lucky Seven",
      krName: '럭키세븐',
      formula: (skillLevel, character, monster) => {
        return skillLevel
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