/* Split from script.js. Loaded as a plain browser script. */
const moodWeathers = [
  ["晴天", "记住这一点点亮，它也是你的一部分。"],
  ["多云", "看不清方向的时候，可以先只做下一件很小的事。"],
  ["下雨", "那今天就先不要假装晴天。可以把最难受的一句话写下来。"],
  ["起风", "如果心里有点乱，先把能控制和不能控制的事分开放。"],
  ["打雷", "如果情绪很响，先离开让你更难受的地方，喝水，慢慢呼吸。"],
  ["星星出来了", "这一点点变亮很珍贵，值得被好好保存。"]
];

const ventPromptTexts = [
  "今天有点累",
  "我有点委屈",
  "我不知道怎么说",
  "我想夸夸自己",
  "我只是想写几句"
];

const comfortLines = [
  "你不用马上开心起来，先坐一会儿也可以。",
  "今天很乱的话，就只做下一件很小的事。",
  "你不是麻烦，你只是现在有点累。",
  "如果这件事太重，可以找一个可靠的大人一起拿。",
  "小狗会帮你守住这里，等你准备好了再继续往前走。",
  "今天先把自己照顾好，别急着证明什么。",
  "能把一天过完，也是一件很了不起的小事。",
  "如果脑袋很吵，就先喝口水，让身体先安静一点。",
  "你可以慢一点，慢一点不等于落后。",
  "有些日子不适合冲刺，适合平稳降落。",
  "今天没有满格电量也没关系，小狗会开省电模式陪你。",
  "先把肩膀放松一点，世界不会因为你停一会儿就跑掉。",
  "你不用一直可爱，偶尔皱巴巴也可以被喜欢。",
  "如果今天只想安静，那安静也是一种很好的状态。",
  "别把一时的低落，当成对自己的判决。",
  "小狗觉得，你已经很努力地在生活了。",
  "不想说话的时候，可以只摸摸小狗，不用解释。",
  "今天适合给自己留一点柔软的时间。",
  "你不是一台机器，不需要每一天都高效运转。",
  "把心里的乱线放一放，先从一根线开始理。",
  "有些答案要过几天才会出现，不用今天逼自己找到。",
  "如果难过来了，就给它一把小椅子，但不用让它住下来。",
  "你可以不完美，但你依然值得被认真对待。",
  "今天的你，也拥有被温柔照顾的资格。",
  "先吃点东西再想问题，空着肚子容易把世界想得太坏。",
  "如果早餐没吃好，下一顿也可以重新开始。",
  "奶茶不是万能的，但有时候它能把心情扶起来一点点。",
  "一口热饭、一杯热水，都是给自己的小信号：我在照顾我。",
  "想吃喜欢的东西不是幼稚，是给生活留一点甜味。",
  "今天可以认真吃一顿饭，不边焦虑边吞下去。",
  "如果心情很冷，就找一点热乎乎的东西靠近。",
  "零食可以是小奖励，但你本人不需要靠表现才配得到奖励。",
  "吃饭慢一点，心也会跟着慢一点。",
  "偶尔想吃炸鸡薯条也没关系，快乐也需要一点脆脆的声音。",
  "喝水这件小事，也是在把自己接回来。",
  "如果今天胃口不好，也别骂自己，先吃一点容易入口的。",
  "甜食不能解决所有事，但可以陪你撑过一小段。",
  "好好吃饭不是任务，是和自己和好的方式之一。",
  "小狗建议：先把嘴巴喂饱，再让脑袋开会。",
  "学习不是把自己压扁，而是慢慢把世界看清楚。",
  "不会的题不是敌人，它只是还没被你认识。",
  "错题不是黑历史，是以后少摔跤的小路标。",
  "今天只弄懂一个知识点，也算往前走了一步。",
  "写不下去的时候，先把题目读顺也算开始。",
  "如果一道题卡住太久，可以先换一道，让脑袋透口气。",
  "分数是一次读数，不是你的全部说明书。",
  "你不是因为考好了才值得被喜欢。",
  "没考好会难过很正常，但难过不等于你不行。",
  "复习可以从最小的一页开始，不用一上来就搬整座山。",
  "今天的目标可以很小，小到只写三行也可以。",
  "物理题会绕弯，但你也会慢慢学会转弯。",
  "如果公式很多，就先记住它想描述的事情。",
  "理解来得慢一点没关系，慢慢来的理解通常很结实。",
  "不会问问题也没关系，可以先说：我从这里开始不懂。",
  "别害怕问基础问题，真正的路都是从基础铺起来的。",
  "学习累了就休息，休息不是背叛努力。",
  "你可以今天不擅长，但明天多懂一点。",
  "把会的题认真做对，也是一种很稳的厉害。",
  "卷子上的红叉，不会擦掉你身上的光。",
  "考试前紧张，说明你在意，不说明你不行。",
  "如果大脑空白，先做一道最熟悉的题把自己找回来。",
  "今天背不下来，明天再见一次，它就会熟一点。",
  "学习像养小星星，要一点点添光。",
  "你不需要一次变成学霸，只需要比昨天多一点方向。",
  "真正重要的不是永远不掉队，而是掉队后还能回来。",
  "你可以用自己的节奏追上自己。",
  "认真不是苦着脸，认真也可以有喜欢的笔和好看的本子。",
  "做题前深呼吸一下，先让心跳别替你答题。",
  "如果今天学不动，就整理书桌，也算给明天铺路。",
  "人际关系里，不是所有人的看法都要放进心里。",
  "有人不理解你，不代表你就错了。",
  "真正的朋友不会因为你低落一次就离开。",
  "如果一段关系让你总是很累，可以先退半步看看。",
  "你不用为了合群，把自己拧成不舒服的形状。",
  "被误会会难受，但你不需要马上向全世界解释。",
  "有些人适合同行一段，有些人只适合路过。",
  "你可以温柔，也可以有边界。",
  "拒绝别人不等于你坏，它只是保护自己的门。",
  "如果不知道怎么说，可以先说：我需要想一想。",
  "别把所有沉默都理解成讨厌，有时别人也只是不会表达。",
  "一段好的关系，会让你更像自己，而不是更怕自己。",
  "如果被冷落了，先抱抱自己，不要急着证明你值得被留下。",
  "你不需要讨好每一个人，真的不需要。",
  "把真心给值得的人，把礼貌给普通的人，就够了。",
  "朋友之间也可以有不同意见，不同不等于结束。",
  "如果吵架了，先让情绪降温，再让话出来。",
  "你可以主动和好，但不必独自承担所有错。",
  "关系里的不舒服，也值得被认真听见。",
  "如果有人让你觉得自己很差，先别急着相信他。",
  "喜欢热闹很好，喜欢独处也很好。",
  "你不用成为每个人心里的第一名。",
  "真正关心你的人，会想知道你为什么沉默。",
  "如果今天没有人及时回应你，小狗先回应你：我在。",
  "你可以把委屈说出来，它不会因此变成麻烦。",
  "别为了怕失去，就一直委屈自己。",
  "和别人相处时，也别忘了和自己站在一起。",
  "被喜欢当然很好，但先别忘了喜欢自己一点点。",
  "情绪来得突然，不代表你脆弱，只代表你有感受。",
  "想哭的时候不用立刻忍住，眼泪也在帮心里降温。",
  "难过不是退步，是心在提醒你它需要照顾。",
  "你可以承认自己在意，这并不丢人。",
  "心里酸酸的时候，先别急着骂自己敏感。",
  "敏感也可能是一种很细的雷达，只是需要学会休息。",
  "如果今天很委屈，先把委屈写下来，不用写得漂亮。",
  "喜欢一个人、在意一句话，都是很真实的心情。",
  "你不用因为情绪多，就觉得自己难相处。",
  "有些喜欢适合说出口，有些喜欢适合慢慢放在心里。",
  "如果想念一个人，也可以先照顾好正在想念的自己。",
  "失落的时候，别急着否定曾经开心过的部分。",
  "你有权利期待，也有权利失望。",
  "被看见是一件很温暖的事，没被看见时也别把自己弄丢。",
  "心动和难过都不是考试，不需要标准答案。",
  "有些情绪会过去，但你不用催它马上过去。",
  "今天心里下雨，就撑一把小伞，不必假装晴天。",
  "如果害怕未来，就先看看脚边这一小步。",
  "你可以不知道以后要成为什么，但可以知道今天想靠近什么。",
  "长大不是一下子变勇敢，是越来越会照顾害怕的自己。",
  "未来很大，不需要今天就把它全部想完。",
  "迷茫不是失败，它只是地图还没展开。",
  "你不用把人生规划得像标准答案。",
  "喜欢的东西会变，方向也会慢慢清楚。",
  "如果现在看不到路，先把今天过稳一点。",
  "世界很大，适合你的地方不止一个。",
  "你可以慢慢试，慢慢错，慢慢知道自己。",
  "别因为别人跑得快，就怀疑自己的路不对。",
  "你的人生不是和别人同一张卷子。",
  "未来不是追着你跑的怪物，它也可以是一片还没亮的星空。",
  "你不用现在就很成熟，正在长大已经很忙了。",
  "有些答案会在你经历之后才懂。",
  "小狗相信，你会一点点长出自己的方向。",
  "今天适合听一首喜欢的歌，让心跟着旋律休息。",
  "看一集喜欢的动画，不是浪费时间，是给心换气。",
  "散步的时候看看树，树不会催你考第一。",
  "晒一会儿太阳，像给心情充一点慢电。",
  "如果可以，去看看天空，云会替你慢慢移动。",
  "喜欢小动物的人，心里通常有一块很柔软的地方。",
  "玩一会儿不是罪过，快乐也是生活的一部分。",
  "拍一张好看的照片，证明今天也有值得留下的角落。",
  "整理桌面有时候像整理心情，慢慢来。",
  "洗个热水澡，让今天的疲惫先流走一点。",
  "换一件舒服的衣服，身体会知道你在照顾它。",
  "把房间开一点窗，心里也可能跟着透气。",
  "如果什么都不想做，就放一首歌坐三分钟。",
  "画一颗歪歪的星星也很好，不必每件事都标准。",
  "给自己挑一个喜欢的颜色，今天就从那里开始变亮。",
  "出去走五分钟，也算把自己从情绪里牵出来一点。",
  "今天可以允许自己幼稚一点，快乐不需要审批。",
  "把喜欢的小东西放在桌上，是给自己的小暗号。",
  "小狗建议：今天找一个让你笑出来的表情包。",
  "生活不只是作业和考试，也包括一口甜的、一次大笑。",
  "如果今天很普通，也可以在普通里捡一颗小糖。",
  "你可以喜欢热闹的周末，也可以喜欢安静的晚上。",
  "有时候最好的计划就是好好睡一觉。",
  "睡前别和难题硬碰硬，明天的大脑会更清楚。",
  "如果睡不着，先别责怪自己，放慢呼吸就好。",
  "晚上的情绪常常会被放大，先不要在深夜否定自己。",
  "明天醒来，很多事情会变得没那么锋利。",
  "困了就睡，世界上的很多消息可以明天再回。",
  "你不需要带着今天所有烦恼入睡。",
  "睡觉不是逃避，是给明天的自己留力气。",
  "如果今天过得不顺，至少可以把被子盖好一点。",
  "小狗会在梦门口值班，坏心情不许乱闯。",
  "起床困难也没关系，先坐起来就算启动。",
  "早晨不用一下子热爱世界，先洗脸也可以。",
  "今天从整理书包开始，也是一种重新出发。",
  "如果出门前很焦虑，摸摸口袋，确认自己已经准备好了。",
  "路上慢一点，安全比赶时间重要。",
  "迟到或出错会难受，但它们不会定义你。",
  "你可以重新开始，一天里也可以重新开始很多次。",
  "别把别人一句随口的话，在心里反复播放太久。",
  "如果有人夸你，试着先收下，不急着否认。",
  "被夸不是偶然，你确实有值得被看见的地方。",
  "你可以大方承认自己有优点。",
  "今天也许没有大进步，但你没有放弃自己。",
  "有时候勇敢就是承认：我需要帮助。",
  "求助不是麻烦别人，是让事情有机会变轻。",
  "可靠的大人不是用来只看成绩的，也可以听你的难过。",
  "如果不知道找谁，就先找一个让你觉得安全的人。",
  "你不必一个人把所有事情都扛完。",
  "说不清楚也可以求助，可以从：我现在有点难受 开始。",
  "如果情绪太满，先远离让你更难受的地方。",
  "深呼吸不是魔法，但能给你几秒钟重新选择。",
  "把手放在胸口，告诉自己：我现在是安全的。",
  "此刻先不要伤害自己，也不要用狠话对自己。",
  "如果真的很撑不住，请马上找身边可靠的人。",
  "小狗可以陪你，但现实里的大人也可以一起帮忙。",
  "你值得被认真听见，不只是被要求懂事。",
  "今天不想坚强，也可以。",
  "懂事很辛苦，你也可以偶尔不那么懂事。",
  "你不是只能带来快乐的人，你的难过也可以被接住。",
  "别因为怕别人担心，就把自己藏得太深。",
  "有些话说出来会发抖，但说出来以后可能会轻一点。",
  "如果没有力气讲完整，就把这句话给别人看：我需要陪伴。",
  "你可以先保护自己，再考虑别人怎么想。",
  "边界感不是冷漠，是给心留一扇门。",
  "你有权利离开让你不舒服的聊天。",
  "你有权利说：我现在不想继续这个话题。",
  "不用为所有人的情绪负责。",
  "你已经做得够多了，今天可以少做一点。",
  "小狗觉得，休息也算一种认真生活。",
  "今天如果只完成了活着、吃饭、睡觉，也已经很重要。",
  "坏日子不会永远停在这里。",
  "你经历过很多次难受，也一次次走到了现在。",
  "这说明你比自己以为的更有韧性。",
  "你不用把坚强表演给别人看。",
  "哭完、吃饭、睡觉，明天再慢慢想。",
  "没有人能一直闪闪发光，星星也会躲进云里。",
  "躲进云里不是消失，是在休息。",
  "你可以暂时不回答世界的问题。",
  "把今天交给今天，明天交给明天。",
  "小狗在这里，给你留了一盏很小但不灭的灯。",
  "如果你觉得自己很普通，小狗要说：普通也可以很珍贵。",
  "你不是必须特别厉害，才配拥有好事。",
  "快乐来的时候就好好笑，不用担心它会不会太短。",
  "难过来的时候就慢慢熬，不用担心它会不会太长。",
  "每一种情绪都只是路过的天气，不是你的全部天空。",
  "你可以给自己取一个今天的关键词。",
  "今天的关键词也许是：撑住。",
  "今天的关键词也许是：慢慢。",
  "今天的关键词也许是：别怕。",
  "今天的关键词也许是：吃饭。",
  "今天的关键词也许是：睡觉。",
  "今天的关键词也许是：再试一次。",
  "你可以把不开心折成星星，先放在这里。",
  "等以后再看，也许会发现自己真的走过来了。",
  "小狗会记得你今天努力过。",
  "小狗也会记得你今天很累。",
  "努力和很累可以同时存在。",
  "你不用因为累就否定努力。",
  "你不用因为慢就否定前进。",
  "你不用因为哭就否定勇敢。",
  "你不用因为害怕就否定自己。",
  "小狗把尾巴摇成一个逗号，意思是：故事还没结束。",
  "所以今天先停在这里，也没关系。"
];

const helpNotes = [
  {
    label: "老师",
    messages: [
      "老师，我最近有点撑不住，能不能听我说一会儿？",
      "老师，我有件事不知道怎么处理，想请您帮我一起想想。",
      "老师，我最近学习和心情都有点乱，可以找您聊几分钟吗？",
      "老师，我不一定能说清楚，但我现在真的需要一个可靠的大人听我说一下。",
      "老师，我最近压力有点大，想问问您有没有什么建议。",
      "老师，我遇到了一点人际关系上的困扰，可以和您说说吗？",
      "老师，我这次没考好以后有点缓不过来，想请您帮我分析一下。",
      "老师，我对接下来的学习有点没方向，可以请您给我一点建议吗？",
      "老师，我最近上课有些跟不上，能不能找时间问您几个问题？",
      "老师，我心里有点难受，但不知道该找谁说，可以先找您吗？",
      "老师，我最近状态不太好，如果方便的话，我想和您单独聊一下。",
      "老师，我有点害怕把事情说出来，但我想试着说一说。",
      "老师，我需要一点帮助，不是批评，只是想有人陪我理一理。",
      "老师，最近有件事影响到我学习了，我想请您帮我判断该怎么办。",
      "老师，我不知道这算不算严重，但它确实让我很难受。",
      "老师，如果我说得很乱，您可以慢慢听我说完吗？",
      "老师，我想让自己变好一点，但现在不知道从哪里开始。",
      "老师，我最近容易焦虑，可以请您帮我把任务排一排吗？",
      "老师，我想请您帮我看看，我现在最应该先解决哪件事。",
      "老师，我有个问题不太敢问，但它困扰我很久了。",
      "老师，我希望这件事能先保密一点，可以吗？",
      "老师，我现在需要一个安全的地方说几句话。"
    ]
  },
  {
    label: "家人",
    messages: [
      "我最近有件事不知道怎么处理，想请你陪我一起想想。",
      "我最近有点累，可能不太会表达，但我想让你知道。",
      "我今天心情不太好，可以先不要问太多，只陪我一会儿吗？",
      "我有些话想说，但可能会说得很乱，你能慢慢听我说吗？",
      "我最近压力有点大，希望你能先听我讲完，再给建议。",
      "我不是故意闹情绪，我只是现在有点难受。",
      "我想和你说一件让我不舒服的事，可以吗？",
      "我最近学习上有点焦虑，想请你帮我一起理一下计划。",
      "我有时候不知道怎么开口，但我其实很需要被理解。",
      "我今天想被抱一下，或者安静地坐一会儿。",
      "我现在不太想被批评，只想先被听见。",
      "我遇到了一点人际关系的问题，想听听你的看法。",
      "我最近有点睡不好，可能需要你帮我一起调整一下。",
      "我知道你关心我，但我希望你能用温和一点的方式和我说。",
      "我有一件事想请求你的帮助，不想一个人扛着。",
      "我现在说不清楚原因，但我心里有点堵。",
      "我希望你能相信，我已经在努力了。",
      "我需要一点空间，也需要知道你还在。",
      "如果我哭了，不用马上讲道理，陪我一下就好。",
      "我最近有点怕自己做不好，想听你鼓励我一句。",
      "我想跟你商量一件事，希望我们可以好好说。",
      "我现在需要家里变成一个可以休息的地方。"
    ]
  },
  {
    label: "朋友",
    messages: [
      "我不一定能说清楚，但我现在真的需要有人陪我一下。",
      "你现在方便听我说几句吗？我心里有点乱。",
      "我今天不太开心，可以和你待一会儿吗？",
      "我有点委屈，但不知道怎么讲，你可以先听我慢慢说吗？",
      "我现在有点想哭，可以不用安慰得很完美，只陪我一下吗？",
      "我遇到一件烦心事，想问问你怎么看。",
      "我现在需要一个不会笑我的人听我说话。",
      "我今天可能有点沉默，不是因为讨厌你，是我状态不太好。",
      "你能不能发我一个表情包，我想轻松一点。",
      "我想和你说一件小事，但它在我心里变得很大。",
      "我有点害怕自己想太多，你能帮我一起看看吗？",
      "我现在不想一个人待着，可以和你聊会儿吗？",
      "如果我说得很乱，你不要急着打断我好吗？",
      "我可能需要一点鼓励，哪怕只有一句也可以。",
      "我今天想听你讲点轻松的事。",
      "我遇到关系上的困扰了，想找你帮我理一理。",
      "我不想把负能量倒给你，但我真的有点撑不住。",
      "你有空的时候，可以陪我散散步或者聊几句吗？",
      "我今天需要一个朋友在旁边，不需要解决所有问题。",
      "我有件事想告诉你，但希望你先不要传出去。",
      "如果你现在不方便也没关系，晚点能回我一句就好。",
      "我想确认一下，你还在我这边吗？"
    ]
  },
  {
    label: "不知道找谁",
    messages: [
      "我现在有点难受，能不能帮我找一个可靠的人聊一聊？",
      "我不知道该找谁说，但我现在不太适合一个人扛着。",
      "我有件事让我很不舒服，需要一个靠谱的大人帮我看看。",
      "我现在说不清楚情况，但我需要帮助。",
      "我有点害怕开口，可以先陪我一起找一个能说话的人吗？",
      "我现在情绪很满，需要先找个安全的人待一会儿。",
      "我不知道这件事该不该说，但它已经影响到我了。",
      "我需要有人帮我判断，下一步应该找谁。",
      "我现在不想一个人做决定，可以请你帮我联系可靠的人吗？",
      "我遇到了一点麻烦，不知道找老师、家人还是朋友，能帮我想想吗？",
      "我现在状态不太稳定，需要先有人陪着我。",
      "如果可以，请帮我找一个愿意认真听我说话的人。",
      "我有点撑不住了，想先找一个安全的地方说话。",
      "我不知道怎么解释，但我真的需要被听见。",
      "我现在需要帮助，不需要被责怪。",
      "能不能先陪我把事情写下来，再决定找谁说？",
      "我怕自己说不清楚，可以请你帮我一起组织语言吗？",
      "我需要一个成年人帮我处理这件事。",
      "如果你不知道怎么办，也请帮我找一个知道怎么办的人。",
      "我现在很乱，请先不要让我一个人待着。",
      "这件事我一个人拿不动了，需要有人一起拿。",
      "我想求助，但不知道第一句话怎么说。"
    ]
  }
];

const cloudItems = ["作业", "考试", "关系", "未来", "不知道"];
const cloudBucketLabels = [
  ["now", "现在能做"],
  ["later", "先放一放"],
  ["help", "需要求助"]
];
const bubbleWords = ["呼", "慢", "放", "轻", "松", "星", "好", "稳", "停", "暖", "软", "亮", "糖", "云", "水", "梦"];
const bubbleMessages = [
  "很好，刚刚那一口气已经放出去一点了。",
  "不用急，下一颗也可以慢慢点。",
  "让紧绷的地方松一点点就够了。",
  "你正在把心里的噪音调小一点。",
  "这不是比赛，只是陪自己待一会儿。",
  "点掉一颗小泡泡，也算给自己让出一点空间。"
];

function getMoodState() {
  const saved = readJson(storageKeys.mood, { weather: "", notes: [], guarded: false, sortedClouds: {}, bubblePops: 0 });
  return {
    weather: saved.weather || "",
    notes: Array.isArray(saved.notes) ? saved.notes : [],
    guarded: Boolean(saved.guarded),
    sortedClouds: saved.sortedClouds || {},
    bubblePops: saved.bubblePops || 0
  };
}

function saveMoodState(state) {
  writeJson(storageKeys.mood, state);
}

function renderMoodHouse() {
  const state = getMoodState();
  weatherOptions.innerHTML = moodWeathers
    .map(
      ([label]) => `
        <button class="weather-option ${state.weather === label ? "is-active" : ""}" type="button" data-weather="${escapeHtml(label)}">
          ${escapeHtml(label)}
        </button>
      `
    )
    .join("");
  ventPrompts.innerHTML = ventPromptTexts
    .map((text) => `<button class="vent-prompt" type="button" data-prompt="${escapeHtml(text)}">${escapeHtml(text)}</button>`)
    .join("");
  helpOptions.innerHTML = helpNotes
    .map(({ label, messages }) => `<button class="help-option" type="button" data-help="${escapeHtml(label)}">${escapeHtml(label)} · ${messages.length}</button>`)
    .join("");
  weatherResponse.textContent = moodWeathers.find(([label]) => label === state.weather)?.[1] || "选一个最接近现在的天气就好。";
  renderBubbles(state);
  renderCloudSort(state);
  renderVentStars(state);
  renderMoodTimeline(state);
  updateVentMeta();
}

function renderBubbles(state = getMoodState()) {
  bubbleStage.innerHTML = "";
  for (let index = 0; index < 12; index += 1) {
    bubbleStage.append(createStressBubble(index));
  }
  updateBubbleCalm(state);
}

function createStressBubble(index = Math.floor(Math.random() * 1000)) {
  const bubble = document.createElement("button");
  const colors = ["#9ff0d2", "#fff6b9", "#ffb7d1", "#a9c8ff", "#ffd0a6"];
  const size = 38 + Math.floor(Math.random() * 34);
  bubble.className = "stress-bubble";
  bubble.type = "button";
  bubble.dataset.bubbleIndex = String(index);
  bubble.style.setProperty("--bubble-size", `${size}px`);
  bubble.style.setProperty("--bubble-color", colors[index % colors.length]);
  bubble.style.setProperty("--bubble-speed", `${3.6 + Math.random() * 2.6}s`);
  bubble.style.setProperty("--bubble-dx", `${Math.round(Math.random() * 26 - 13)}px`);
  bubble.style.setProperty("--bubble-dy", `${Math.round(Math.random() * 22 - 18)}px`);
  bubble.style.left = `${5 + Math.random() * 80}%`;
  bubble.style.top = `${8 + Math.random() * 62}%`;
  bubble.style.animationDelay = `${Math.random() * -3}s`;
  bubble.setAttribute("aria-label", "点掉一个星星泡泡");
  bubble.textContent = bubbleWords[index % bubbleWords.length];
  return bubble;
}

function updateBubbleCalm(state = getMoodState()) {
  const calm = Math.min(100, (state.bubblePops % 20) * 5);
  bubbleCalmBar.style.setProperty("--calm-width", `${calm}%`);
  resetBubblesButton.textContent = state.bubblePops ? `已轻轻放下 ${state.bubblePops} 次` : "换一池泡泡";
}

function createBubbleSparks(x, y) {
  const colors = ["#fff6b9", "#9ff0d2", "#ff9ac2", "#6fa8ff"];
  for (let index = 0; index < 10; index += 1) {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 10;
    const distance = 22 + Math.random() * 24;
    spark.className = "bubble-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--spark-color", colors[index % colors.length]);
    spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
    bubbleStage.append(spark);
    spark.addEventListener("animationend", () => spark.remove());
  }
}

function renderCloudSort(state = getMoodState()) {
  cloudGuide.textContent = selectedCloud ? `已经拿起“${selectedCloud}”这朵云。现在把它放进一个篮子。` : "先点一朵云，再把它放进合适的篮子。";
  cloudBank.innerHTML = cloudItems
    .map((item) => {
      const sorted = state.sortedClouds[item];
      return `<button class="sort-cloud ${sorted ? "is-sorted" : ""} ${selectedCloud === item ? "is-active" : ""}" type="button" data-cloud="${escapeHtml(item)}">${escapeHtml(item)}</button>`;
    })
    .join("");
  cloudBuckets.innerHTML = cloudBucketLabels
    .map(([id, label]) => {
      const items = Object.entries(state.sortedClouds)
        .filter(([, bucket]) => bucket === id)
        .map(([item]) => `<button class="bucket-item" type="button" data-unsort-cloud="${escapeHtml(item)}">${escapeHtml(item)}</button>`)
        .join("");
      return `
        <div class="cloud-bucket ${selectedCloud ? "is-ready" : ""}" role="button" tabindex="0" data-bucket="${id}">
          <strong>${label}</strong>
          <span class="cloud-bucket-items">${items || `<span class="bucket-item">点一朵云，再点这里</span>`}</span>
        </div>
      `;
    })
    .join("");
}

function renderMoodTimeline(state = getMoodState()) {
  const items = [];
  if (state.weather) items.push(["天气", state.weather]);
  if (state.guarded) items.push(["小狗", "已经帮你守住一件事"]);
  state.notes.slice(0, 4).forEach((note) => {
    items.push(["小星星", `${note.text.slice(0, 46)}${note.text.length > 46 ? "..." : ""}`]);
  });
  Object.entries(state.sortedClouds).forEach(([cloud, bucket]) => {
    const label = cloudBucketLabels.find(([id]) => id === bucket)?.[1] || "已整理";
    items.push(["云朵", `${cloud} -> ${label}`]);
  });
  moodTimeline.innerHTML = items.length
    ? items
        .slice(0, 7)
        .map(([title, text]) => `<div class="timeline-item"><strong>${escapeHtml(title)}</strong>${escapeHtml(text)}</div>`)
        .join("")
    : `<div class="timeline-item"><strong>还没有记录</strong>这里会轻轻保存你在小屋里放下的东西。</div>`;
}

function renderVentStars(state = getMoodState()) {
  if (!state.notes.length) {
    ventStars.innerHTML = "";
    return;
  }
  ventStars.innerHTML = state.notes
    .slice(0, 3)
    .map((note) => `<div class="mood-star-item">已折成星星：${escapeHtml(note.text.slice(0, 42))}${note.text.length > 42 ? "..." : ""}</div>`)
    .join("");
}

function updateVentMeta() {
  ventCount.textContent = `${ventNote.value.length}/360`;
  const state = getMoodState();
  ventSavedAt.textContent = state.notes[0]?.createdAt ? formatSavedTime(state.notes[0].createdAt) : "尚未保存";
}

function saveVentNote() {
  const text = ventNote.value.trim();
  if (!text) {
    ventSavedAt.textContent = "先写一点点也可以";
    return;
  }
  const state = getMoodState();
  state.notes = [{ text, createdAt: new Date().toISOString() }, ...(state.notes || [])].slice(0, 8);
  saveMoodState(state);
  ventNote.value = "";
  updateVentMeta();
  renderVentStars(state);
  renderMoodTimeline(state);
  renderDataSummary();
  petLine.textContent = "小狗帮你把这句话折成了一颗小星星。";
}

function clearVentSpace() {
  ventNote.value = "";
  updateVentMeta();
}

function toggleBreathing() {
  const phases = [
    ["吸气", 4000],
    ["停一下", 1000],
    ["呼气", 6000]
  ];
  if (breathingTimer) {
    window.clearTimeout(breathingTimer);
    breathingTimer = 0;
    breathingStep = 0;
    breathingPlanet.classList.remove("is-running");
    breathingPhase.textContent = "吸气";
    breathingButton.textContent = "开始呼吸";
    return;
  }

  breathingPlanet.classList.add("is-running");
  breathingButton.textContent = "暂停呼吸";
  const runPhase = () => {
    const [label, duration] = phases[breathingStep % phases.length];
    breathingPhase.textContent = label;
    breathingStep += 1;
    breathingTimer = window.setTimeout(runPhase, duration);
  };
  runPhase();
}
