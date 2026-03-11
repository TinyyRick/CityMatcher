export interface Question {
  id: string;
  title: string;
  text: string;
  minLabel: string;
  maxLabel: string;
  key: string;
  dynamicLabels: {
    low: string;
    mid: string;
    high: string;
  };
}

export const questions: Question[] = [
  {
    id: 'job',
    title: '工作机会',
    text: '如果只能选一种城市，你更愿意生活在哪种地方？',
    minLabel: '工作机会一般，但生活压力小',
    maxLabel: '工作机会很多，但竞争很激烈',
    key: 'job',
    dynamicLabels: {
      low: '找个班上就行，饿不死就好',
      mid: '正常双休，能有一定发展空间',
      high: '我要搞钱！哪怕卷生卷死'
    }
  },
  {
    id: 'entrepreneur',
    title: '创业环境',
    text: '关于创业，你更接近哪种想法？',
    minLabel: '稳定打工更适合我',
    maxLabel: '希望未来有机会创业',
    key: 'entrepreneur',
    dynamicLabels: {
      low: '老老实实打工，绝不碰创业',
      mid: '如果有好机会，可以尝试副业',
      high: '天生老板命，必须自己干'
    }
  },
  {
    id: 'lie_flat',
    title: '生活节奏',
    text: '节奏和压力，你希望怎么平衡？',
    minLabel: '慢节奏生活，压力小一点',
    maxLabel: '快节奏城市，机会更多',
    key: 'lieFlat',
    dynamicLabels: {
      low: '只想躺平，喝茶遛鸟',
      mid: '工作生活平衡，该干嘛干嘛',
      high: '扶我起来，我还能卷'
    }
  },
  {
    id: 'safety',
    title: '城市安全',
    text: '你希望民事纠纷被怎么处理',
    minLabel: '稍微糊弄一点也能接受',
    maxLabel: '必须被执法人员当回事',
    key: 'safety',
    dynamicLabels: {
      low: '只要不危及生命，其他好说',
      mid: '正常水平，有事能找到警察',
      high: '夜不闭户，路不拾遗，绝对安全'
    }
  },
  {
    id: 'infra',
    title: '城市设施',
    text: '你能在多大程度上接受城市基础设施如地铁、医疗的落后',
    minLabel: '够用就好',
    maxLabel: '必须非常完善',
    key: 'infra',
    dynamicLabels: {
      low: '有条路走就行，不挑剔',
      mid: '日常出行和看病方便即可',
      high: '出门必须地铁，三甲医院就在楼下'
    }
  },
  {
    id: 'family',
    title: '家庭支持',
    text: '如果去一个城市发展，你的家庭能提供多少支持？',
    minLabel: '几乎没有支持',
    maxLabel: '可以提供较多资金或资源',
    key: 'family',
    dynamicLabels: {
      low: '纯靠自己，白手起家',
      mid: '家里能稍微帮衬一点',
      high: '家里有矿，全款买房'
    }
  },
  {
    id: 'female',
    title: '女性友好',
    text: '你能否接受城市里的女性主义活动？',
    minLabel: '不是特别关注',
    maxLabel: '一定要有',
    key: 'female',
    dynamicLabels: {
      low: '无所谓，不太关注这些',
      mid: '希望有基本的尊重和平等',
      high: '必须高度尊重女性，Girls help girls'
    }
  },
  {
    id: 'smoking',
    title: '公共吸烟',
    text: '对于二手烟这种事，你的反应是？',
    minLabel: '非常反感',
    maxLabel: '可以接受',
    key: 'smoking',
    dynamicLabels: {
      low: '把二手烟的制造者都抓起来',
      mid: '抽就抽吧，没啥感想',
      high: '大家一起捐航母'
    }
  },
  {
    id: 'moral',
    title: '城市氛围',
    text: '你能否忍受普遍的插队、吐痰、骂街行为',
    minLabel: '影响不大',
    maxLabel: '绝对不能接受',
    key: 'moral',
    dynamicLabels: {
      low: '只要不惹我，随便他们',
      mid: '希望大家都能遵守基本规则',
      high: '全员高素质，眼里揉不得沙子'
    }
  },
  {
    id: 'green',
    title: '自然环境',
    text: '你希望有很多绿色的地方可以逛逛吗',
    minLabel: '普通城市环境就可以',
    maxLabel: '希望有很多绿化和自然景观',
    key: 'green',
    dynamicLabels: {
      low: '全是水泥森林也没关系',
      mid: '周末能有个公园逛逛就行',
      high: '必须是花园城市，推窗见绿'
    }
  }
];
