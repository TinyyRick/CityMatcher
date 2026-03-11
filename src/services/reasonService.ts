import { CityData } from '../data/cities';

const cityTemplates: Record<string, string> = {
  "北京": "作为首都，北京拥有无与伦比的资源优势和深厚的文化底蕴。",
  "上海": "魔都上海是国际金融中心，这里充满了摩登气息与无限可能。",
  "深圳": "作为全中国发展最快的城市之一，深圳充满了奇迹与活力。",
  "广州": "广州是一座包容务实的城市，这里既有浓厚的商业底蕴，又充满了市井烟火气。",
  "成都": "成都是一座来了就不想走的城市，完美融合了现代商业与巴适的生活节奏。",
  "杭州": "上有天堂下有苏杭，杭州不仅风景如画，更是数字经济和创新的前沿阵地。",
  "苏州": "苏州将古典园林的温婉与现代工业的发达完美结合，是一座极具双面魅力的城市。",
  "南京": "六朝古都南京底蕴深厚，科教资源丰富，是一座沉稳而又充满机遇的城市。",
  "重庆": "魔幻的8D洪崖洞与热辣的火锅，重庆是一座充满江湖气与魔幻色彩的活力之都。",
  "武汉": "九省通衢的武汉，大江大湖，充满着江湖豪情与蓬勃的发展动力。",
  "西安": "十三朝古都西安，历史与现代在这里交汇，散发着独特的西北魅力与科技活力。",
  "长沙": "星城长沙不仅是娱乐之都，更是充满活力的消费中心，生活在这里永远不会无聊。",
  "青岛": "红瓦绿树，碧海蓝天，青岛是一座美丽的海滨城市，生活惬意且充满活力。",
  "厦门": "城在海上，海在城中，厦门是一座文艺且精致的海滨花园城市。",
  "大连": "大连是一座浪漫的海滨之城，拥有宜人的气候和充满异国风情的城市风貌。",
  "珠海": "百岛之市珠海，环境优美，生活节奏舒适，是一座极具幸福感的海滨宜居城市。",
  "无锡": "太湖佳绝处，毕竟在鼋头。无锡经济发达且宜居，是一座低调务实的江南名城。",
  "宁波": "书藏古今，港通天下。宁波商业气息浓厚，同时保留着江南水乡的温婉。",
  "天津": "天津是一座中西合璧、古今交融的城市，生活气息浓厚且节奏适中。",
};

const specificReasons: Record<string, Record<string, { high?: string, low?: string }>> = {
  "深圳": {
    "job": { high: "作为全国发展最快的地方，深圳能为你提供无可比拟的工作机会和广阔的职场舞台" },
    "entrepreneur": { high: "深圳拥有全国顶级的创业扶持政策和浓厚的商业氛围，是创业者的天堂" },
    "green": { high: "虽然是超一线城市，但深圳也是著名的花园城市，极高的基建和绿化支出让你在钢铁森林中也能大口呼吸" },
    "infra": { high: "深圳在城市建设上的投入极高，极其完善的交通和医疗等基建能极大提升你的生活品质" },
    "lieFlat": { high: "深圳的快节奏和奋斗文化与你渴望内卷、寻找机会的野心完美契合" }
  },
  "广州": {
    "job": { high: "作为千年商都，广州拥有极其成熟的产业链和丰富的就业机会" },
    "entrepreneur": { high: "广州务实的商业氛围和极高的包容度，为创业者提供了极佳的试错土壤" },
    "family": { low: "广州是一座极具包容性的城市，即使白手起家，这里务实的氛围也能让你找到立足之地" }
  },
  "成都": {
    "lieFlat": { low: "成都巴适的生活节奏能让你在工作之余找到内心的宁静，完美契合你向往安逸的需求" },
    "female": { high: "成都在女性友好和包容度上表现极佳，能给你带来非常舒适和自由的生活体验" },
    "job": { low: "成都相对温和的职场环境不会给你过大的竞争压力，让你能更好地平衡工作与生活" }
  },
  "杭州": {
    "job": { high: "作为数字经济的前沿阵地，杭州能为你提供丰富的互联网和高新技术工作机会" },
    "green": { high: "上有天堂下有苏杭，杭州如画的风景和极高的绿化水平能满足你对自然环境的向往" },
    "entrepreneur": { high: "杭州活跃的电商和互联网氛围，以及丰厚的创业补贴，非常适合有创业梦想的你" }
  },
  "上海": {
    "job": { high: "作为国际大都市，上海拥有最顶尖的外企和金融机构，能满足你对事业发展的极致追求" },
    "infra": { high: "上海拥有世界级的城市基础设施，极其便利的交通网络和顶尖医疗资源能满足你的高要求" },
    "moral": { high: "上海市民普遍具备极高的契约精神和规则意识，良好的人文环境能给你带来愉悦的日常体验" }
  },
  "北京": {
    "job": { high: "北京汇聚了全国顶级的互联网大厂和央企国企，能为你提供最广阔的职业天花板" },
    "entrepreneur": { high: "北京拥有全国最密集的投资机构和顶尖高校资源，是科技和文化创业的绝对核心" },
    "infra": { high: "作为首都，北京拥有全国最顶级的医疗和教育资源，能满足你对城市配套的极致要求" }
  },
  "重庆": {
    "lieFlat": { low: "重庆充满烟火气和江湖气息的慢节奏生活，能让你在这里找到安逸与放松" },
    "female": { high: "重庆是一座极具女性力量的城市，这里的女性地位和包容度都非常高" }
  },
  "长沙": {
    "lieFlat": { low: "长沙丰富的夜生活和极具性价比的消费水平，能让你在工作之余尽情享受生活" },
    "job": { low: "长沙的房价收入比非常友好，让你不需要背负巨大的压力就能拥有自己的小天地" }
  }
};

const genericReasons: Record<string, { high?: (city: string) => string, low?: (city: string) => string }> = {
  "job": {
    high: (city) => `你非常看重事业发展，而${city}拥有广阔的工作机会和发展空间`,
    low: (city) => `你更倾向于平衡工作与生活，${city}的职场环境相对温和，不会给你过大的竞争压力`
  },
  "entrepreneur": {
    high: (city) => `你有着强烈的创业意愿，${city}的创业扶持政策和浓厚的商业氛围能为你提供绝佳的土壤`
  },
  "lieFlat": {
    high: (city) => `你渴望在快节奏中寻找机会，${city}的奋斗文化与你完美契合`,
    low: (city) => `你向往安逸的生活，${city}相对较小的压力和慢节奏能让你找到内心的宁静`
  },
  "safety": {
    high: (city) => `你对安全感要求极高，而${city}在治安管理上表现优异，能让你安心生活`
  },
  "infra": {
    high: (city) => `你追求完善的城市设施，${city}发达的交通和医疗等基建能极大提升你的生活品质`
  },
  "family": {
    low: (city) => `即使白手起家，${city}也给予了普通人足够的包容和向上生长的机会`
  },
  "female": {
    high: (city) => `你非常看重女性友好程度，${city}在性别平等和包容度上有着优秀的表现`
  },
  "smoking": {
    low: (city) => `你对无烟环境要求严格，${city}的公共场所控烟措施和市民习惯会让你感到舒适`
  },
  "moral": {
    high: (city) => `你注重市民素质和文明氛围，${city}良好的人文环境能给你带来愉悦的日常体验`
  },
  "green": {
    high: (city) => `你渴望亲近自然，${city}优美的绿化和生态环境能让你在钢铁森林中大口呼吸`
  }
};

export function generateLocalReason(city: CityData, answers: Record<string, number>): string {
  const reasons: string[] = [];

  const diffs = Object.keys(answers).map(key => {
    const userScore = answers[key];
    const cityScore = (city as any)[key] as number;
    const diff = Math.abs(userScore - cityScore);
    return { key, userScore, cityScore, diff };
  });

  // 优先挑选用户打分最极端（最看重或最不看重）的选项
  diffs.sort((a, b) => {
    const extremeA = Math.abs(a.userScore - 5.5);
    const extremeB = Math.abs(b.userScore - 5.5);
    return extremeB - extremeA;
  });

  // 选出用户打分极端（>=8 或 <=3）且该城市得分与用户期望相近（差值<=3）的前3个指标
  const selected = diffs.filter(d => Math.abs(d.userScore - 5.5) >= 2.5 && d.diff <= 3).slice(0, 3);

  selected.forEach(item => {
    const { key, userScore } = item;
    const isHigh = userScore >= 8;
    const isLow = userScore <= 3;
    
    let reasonText = "";

    // 尝试获取城市专属的特定理由
    if (specificReasons[city.name] && specificReasons[city.name][key]) {
      if (isHigh && specificReasons[city.name][key].high) {
        reasonText = specificReasons[city.name][key].high!;
      } else if (isLow && specificReasons[city.name][key].low) {
        reasonText = specificReasons[city.name][key].low!;
      }
    }

    // 如果没有专属理由，使用通用理由模板
    if (!reasonText && genericReasons[key]) {
      if (isHigh && genericReasons[key].high) {
        reasonText = genericReasons[key].high!(city.name);
      } else if (isLow && genericReasons[key].low) {
        reasonText = genericReasons[key].low!(city.name);
      }
    }

    if (reasonText) {
      reasons.push(reasonText);
    }
  });

  const intro = cityTemplates[city.name] || `综合你的各项偏好，${city.name}是最适合你的城市。`;
  
  let result = intro;
  if (reasons.length > 0) {
    result += ` 推荐这里的理由是：${reasons.join('；')}。`;
  } else {
    result += ` 它的综合属性与你的生活方式和价值观达到了完美的平衡。`;
  }
  
  return result;
}
