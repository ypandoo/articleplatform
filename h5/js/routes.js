var Routes = {
  'qingzang':{
            'startCity': '格尔木',
            'endCity': '拉萨',
            'waypointsName': [],
            'danger':{
              'point': new BMap.Point(92.450124, 34.221988),
              'info': '此路段为危险路段，请小心行使'
            }
          },
  'chuanzangnan':{
        'startCity': '成都',
        'endCity': '拉萨',
        'waypointsName': ['康定', '林芝'],
        'danger': {
          'point': new BMap.Point(101.967142, 30.047028),
            'info': '此路段为危险路段，请小心行使'
        }
          },
  'chuanzangbei': {
      'startCity': '成都',
      'endCity': '拉萨',
      'waypointsName':['都江堰', '甘孜', '昌都', '那曲'],
      'danger': {
        'point': new BMap.Point(100.744109, 31.884309),
          'info': '此路段为危险路段，请小心行使'
      }
    },
  'xinzang': {
    'startCity': '叶城县',
    'endCity': '拉萨',
    'waypointsName': ['日喀则市'], 
    'danger': {
      'point': new BMap.Point(77.476215, 37.882995),
        'info': '此路段为危险路段，请小心行使'
    }
  },

  'dianzang': {
    'startCity': '昆明',
    'endCity': '拉萨',
    'waypointsName': ['大理', '香格里拉', '林芝'],
    'danger': {
      'point': new BMap.Point(77.476215, 37.882995),
      'info': '此路段为危险路段，请小心行使'
    }
  },
    

}