export const monsterInfo = {
  victoriaIsland: {
    nameList: [
      { name: 'Snail', krName: '달팽이' },
      { name: 'Slime', krName: '슬라임' },
      { name: 'Zombie Lupin', krName: '좀비루팡' },
      { name: 'Drake', krName: '드레이크' },
    ],
    'Snail': {
      name: 'Snail',
      krName: '달팽이',
      level: 1,
      hp: 8,
      exp: 3,
      physicalDefense: 0,
      magicDefense: 0,
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
    },
    'Zombie Lupin': {
      name: 'Zombie Lupin',
      krName: '좀비루팡',
      level: 40,
      hp: 1800,
      exp: 90,
      physicalDefense: 70,
      magicDefense: 70,
      vulnerableType: ['Sanctity'],
      krVulnerableType: ['성'],
      isUnDead: true
    },
    'Drake': {
      name: 'Drake',
      krName: '드레이크',
      level: 50,
      hp: 3200,
      exp: 135,
      physicalDefense: 110,
      magicDefense: 0,
    }
  }
}