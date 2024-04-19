export const monsterInfo = {
  victoriaIsland: {
    nameList: [
      { name: 'Snail', krName: '달팽이' },
      { name: 'Slime', krName: '슬라임' },
    ],
    'Snail': {
      name: 'Snail',
      krName: '달팽이',
      level: 1,
      hp: 8,
      exp: 3,
      physicalDefense: 0,
      magicDefense: 0,
      vulnerableType: [],
    },
    'Slime': {
      name: 'Slime',
      krName: '슬라임',
      level: 6,
      hp: 50,
      exp: 10,
      physicalDefense: 5,
      magicDefense: 10,
      vulnerableType: ['Electricity'],
      krVulnerableType: ['번개'],
    }
  }
}