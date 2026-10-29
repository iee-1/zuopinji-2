/* ==========================================================================
   作品数据 — 所有内容都在这一个文件里改，改完保存、刷新网页即可。
   ⚠ 只用记事本 / VS Code 打开本文件，不要在 Word / WPS 里打开。
   --------------------------------------------------------------------------
   一件作品 = 一个 { ... } 区块。加作品就复制一整段，改字段，记得用逗号隔开。
   详细步骤见：加作品-照这个抄.txt
   封面图放在 assets/img/works/ 里，命名建议 12-xxx.svg（数字往后排）。
   字段说明：
     no      作品编号，显示在卡片和案例页上（01、02……）
     cat     分类 key，必须是 CATS 里的 key
     title   中文标题
     en      英文副标题（小字，可留空）
     sub     一句话说明，卡片上显示
     cover   封面路径
     format  "wide" 通栏 / "normal" 半宽 / "tall" 竖图（只影响排版节奏）
     year    年份
     desc    案例说明，2—3 句，写清做了什么、难点在哪
     role    我负责
     tools   软件
     output  产出
     tags    关键词，3—5 个
   ========================================================================== */

window.CATS = [
  { key: "all",    label: "全部" },
  { key: "brand",  label: "品牌视觉" },
  { key: "pack",   label: "包装设计" },
  { key: "poster", label: "海报 / 活动" },
  { key: "ecom",   label: "电商视觉" },
  { key: "illust", label: "插画" },
  { key: "motion", label: "三维动效" }
];

window.WORKS = [
  {
    no: "01",
    cat: "brand",
    title: "白族扎染 · 品牌与 IP 视觉系统",
    en: "BRAND & IP IDENTITY",
    sub: "标志规范 · IP 形象 · 文创应用延展",
    cover: "assets/img/works/01-brand.png",
    format: "wide",
    year: "2025",
    desc:
      "以白族扎染为题的全案品牌设计：从扎染工艺里提炼标志与辅助图形，完成内涵诠释、方格制图、" +
      "安全区域、中英文标准字等整套基础规范；同时设定 IP 形象「蓝小鬼」（BLUE GREMLIN）的三视图" +
      "与性格档案，并把视觉延展到文件袋、冷帽、马克杯、雨伞等文创产品和展览海报上，" +
      "从规范到落地形成完整闭环。",
    role: "视觉设计 · IP 设定 · 规范整理与延展",
    tools: "Illustrator · Photoshop",
    output: "1 套品牌规范 + IP 形象 + 10 项文创应用",
    tags: ["标志规范", "IP 形象", "辅助图形", "文创应用", "展览海报"]
  },
  {
    no: "02",
    cat: "pack",
    title: "日化产品包装设计",
    en: "PACKAGING SYSTEM",
    sub: "盒型结构 · 刀版 · 三维出图",
    cover: "assets/img/works/02-packaging.png",
    format: "normal",
    year: "2025",
    desc:
      "牙膏、眼霜、草本牙粉三个系列的包装设计：从盒型结构、刀版展开到材质与打样文件，" +
      "每件都按实际印刷尺寸核对出血、文字与条码；再用三维渲染出效果图给客户确认，" +
      "交付文件可直接进印刷流程。",
    role: "结构 · 视觉 · 刀版 · 三维出图",
    tools: "Illustrator · Photoshop · 3ds Max",
    output: "3 个系列 · 8 项包装",
    tags: ["盒型结构", "刀版", "印刷文件", "三维渲染", "日化包装"]
  },
  {
    no: "03",
    cat: "ecom",
    title: "电商详情页",
    en: "E-COMMERCE PAGE",
    sub: "主图 · 卖点排序 · 长图叙事",
    cover: "assets/img/works/03-detail.png",
    detail: [
      "assets/img/works/detail/03-detail-1.jpg",
      "assets/img/works/detail/03-detail-2.jpg",
      "assets/img/works/detail/03-detail-3.jpg",
      "assets/img/works/detail/03-detail-4.jpg",
      "assets/img/works/detail/03-detail-5.jpg"
    ],
    format: "tall",
    year: "2026",
    desc:
      "YABEIMEI 牙齿美白系列的电商详情长图：草本牙粉、洁牙素套装、硅胶牙托三套详情页，" +
      "把卖点按阅读顺序排成一条能读下去的线——开头讲清是什么，中段用成分、专利与使用步骤" +
      "建立信任，结尾放规格、价格与好评对比；多规格商品页与好评合成页一起按平台规范切图，" +
      "直接对接运营上传。",
    role: "版式 · 卖点梳理 · 长图切图",
    tools: "Photoshop · Illustrator",
    output: "详情长图 3 套 + 商品页 / 好评页 2 套",
    tags: ["详情长图", "卖点排序", "多规格页", "切图规范"]
  },
  {
    no: "04",
    cat: "poster",
    title: "电商活动海报系列",
    en: "POSTER SERIES",
    sub: "女神节 · 预售 · 预热 · 折扣 · 促销",
    cover: "assets/img/works/04-poster.png",
    format: "wide",
    year: "2025",
    detailMode: "h",
    detail: [
      "assets/img/works/detail/04-poster-1.jpg",
      "assets/img/works/detail/04-poster-2.jpg",
      "assets/img/works/detail/04-poster-3.jpg",
      "assets/img/works/detail/04-poster-4.jpg",
      "assets/img/works/detail/04-poster-5.jpg",
      "assets/img/works/detail/04-poster-6.jpg",
      "assets/img/works/detail/04-poster-7.jpg",
      "assets/img/works/detail/04-poster-8.jpg",
      "assets/img/works/detail/04-poster-9.jpg",
      "assets/img/works/detail/04-poster-10.jpg",
      "assets/img/works/detail/04-poster-11.jpg",
      "assets/img/works/detail/04-poster-12.jpg"
    ],
    desc:
      "为电商品牌美钇国际（YABEIMEI）制作的节日活动海报系列，覆盖女神节、预售、" +
      "预热、折扣、促销等全年主要营销节点。每张海报先理清活动信息层级——节点、" +
      "主推卖点、福利、活动时间——再做氛围定调与系列延展，" +
      "保证多张海报摆在一起风格统一、信息一眼可读。",
    role: "主视觉 · 系列延展 · 促销版式",
    tools: "Photoshop · Illustrator",
    output: "12 张活动海报",
    tags: ["主视觉", "系列延展", "节日节点", "促销版式", "信息层级"]
  },
  {
    no: "05",
    cat: "poster",
    title: "线下展板设计",
    en: "CAMPAIGN BOARDS",
    sub: "线下展板 10 款",
    cover: "assets/img/works/05-material.png",
    format: "wide",
    year: "2025",
    detailMode: "h",
    detail: [
      "assets/img/works/detail/05-material-1.jpg",
      "assets/img/works/detail/05-material-2.jpg",
      "assets/img/works/detail/05-material-3.jpg",
      "assets/img/works/detail/05-material-4.jpg",
      "assets/img/works/detail/05-material-5.jpg",
      "assets/img/works/detail/05-material-6.jpg",
      "assets/img/works/detail/05-material-7.jpg",
      "assets/img/works/detail/05-material-8.jpg",
      "assets/img/works/detail/05-material-9.jpg",
      "assets/img/works/detail/05-material-10.jpg"
    ],
    desc:
      "一组线下展板设计：既有为美钇国际（YABEIMEI）制作的门店展板，也有毕业设计展的" +
      "展陈版面。线下展板要在一眼之间抓人——先定核心卖点和视觉记忆点，" +
      "再按不同媒介调整版式与信息层级，让一套文案在整套展板上都成立。",
    role: "版面 · 版式编排 · 信息层级",
    tools: "Photoshop · Illustrator",
    output: "线下展板 10 款",
    tags: ["线下展板", "版式编排", "信息层级", "系列延展"]
  },
  {
    no: "06",
    cat: "brand",
    title: "品牌宣传图系列",
    en: "BRAND CAMPAIGN",
    sub: "牙倍美 / 美钇国际 · 宣传图 12 款",
    cover: "assets/img/works/06-promo.png",
    format: "normal",
    year: "2025",
    detailMode: "cyl",
    detail: [
      "assets/img/works/detail/06-promo-1.jpg",
      "assets/img/works/detail/06-promo-2.jpg",
      "assets/img/works/detail/06-promo-3.jpg",
      "assets/img/works/detail/06-promo-4.jpg",
      "assets/img/works/detail/06-promo-5.jpg",
      "assets/img/works/detail/06-promo-6.jpg",
      "assets/img/works/detail/06-promo-7.jpg",
      "assets/img/works/detail/06-promo-8.jpg",
      "assets/img/works/detail/06-promo-9.jpg",
      "assets/img/works/detail/06-promo-10.jpg",
      "assets/img/works/detail/06-promo-11.jpg",
      "assets/img/works/detail/06-promo-12.jpg"
    ],
    detailCap: [
      "1.14 · 益生菌洁牙素",
      "1.15 · 净齿亮颜",
      "1.15 · 齿白之美",
      "1.25 · 细腻粉质",
      "2.26 · 社交尴尬",
      "3.2 · 八种植物成分",
      "3.13 · 28 天牙齿健康",
      "3.18 · 温和洁牙",
      "4.14 · 口腔问题",
      "12.24 · 美牙先锋",
      "12.6 · 白到发光",
      "4.16 · 拯救大黄牙"
    ],
    desc:
      "为牙倍美（YABEIMEI）和美钇国际做的品牌宣传图系列，覆盖全年投放节点：" +
      "牙粉、洁牙素、美牙套装的产品海报，以及口臭、牙渍这类痛点型内容。" +
      "难点是把同一套卖点拆成不同入口——成分党看配方表、颜控看牙齿特写、" +
      "怕尴尬的看场景；版式统一，但信息层级按投放位置重新排序。",
    role: "视觉 · 版式 · 卖点提炼",
    tools: "Photoshop · Illustrator",
    output: "宣传图 12 款",
    tags: ["品牌宣传", "产品海报", "卖点提炼", "系列延展"]
  },
  {
    no: "07",
    cat: "poster",
    title: "倒计时海报系列",
    en: "COUNTDOWN",
    sub: "倒计时海报 10 款",
    cover: "assets/img/works/07-countdown.png",
    format: "wide",
    year: "2025",
    detailMode: "diag",
    detail: [
      "assets/img/works/detail/07-countdown-1.jpg",
      "assets/img/works/detail/07-countdown-2.jpg",
      "assets/img/works/detail/07-countdown-3.jpg",
      "assets/img/works/detail/07-countdown-4.jpg",
      "assets/img/works/detail/07-countdown-5.jpg",
      "assets/img/works/detail/07-countdown-6.jpg",
      "assets/img/works/detail/07-countdown-7.jpg",
      "assets/img/works/detail/07-countdown-8.jpg",
      "assets/img/works/detail/07-countdown-9.jpg",
      "assets/img/works/detail/07-countdown-10.jpg"
    ],
    desc:
      "覆盖全年营销节点的倒计时海报系列：跨年、双节、补货、小时倒数都有。" +
      "倒计时是纯节奏设计——数字大小、光效强度和文案长度随节点变化，但版式骨架不变；" +
      "整套摆在一起要有“越来越近”的推力，配色从冷到暖、数字从描边到实心。",
    role: "视觉 · 系列延展",
    tools: "Photoshop · Illustrator",
    output: "倒计时海报 10 款",
    tags: ["倒计时", "节奏", "光效", "系列统一"]
  },
  {
    no: "08",
    cat: "illust",
    title: "插画设计",
    en: "ILLUSTRATION",
    sub: "场景 · 城市 · 国风 · 商业插画 5 幅",
    cover: "assets/img/works/08-illust.png",
    format: "normal",
    year: "2026",
    detailMode: "illust",
    detail: [
      "assets/img/works/detail/08-illust-1.jpg",
      "assets/img/works/detail/08-illust-2.jpg",
      "assets/img/works/detail/08-illust-3.jpg",
      "assets/img/works/detail/08-illust-4.jpg",
      "assets/img/works/detail/08-illust-5.jpg"
    ],
    detailCap: [
      "街景云 · 场景插画",
      "福文化 · 福州城市插画",
      "飞天 · 国风人物插画",
      "AD钙实验室 · 商业插画",
      "AD钙火箭 · 商业插画"
    ],
    desc:
      "从练习到商业应用的插画作品：街景厚涂、福州城市形象、敦煌飞天人物，以及 AD 钙奶的商业插画。" +
      "起稿、勾线、上色全程手绘完成，风格随主题切换——清新场景、国潮城市、国风人物、美式卡通都能画。",
    role: "插画 · 勾线 · 上色",
    tools: "Photoshop · 手绘板",
    output: "插画 5 幅",
    tags: ["插画", "上色", "国风", "商业插画"]
  },
  {
    no: "09",
    cat: "motion",
    title: "三维建模与环境渲染",
    en: "3D RENDER",
    sub: "建模 · 材质 · 环境渲染 6 组",
    cover: "assets/img/works/09-render.png",
    format: "normal",
    year: "2026",
    detailMode: "fade",
    detail: [
      "assets/img/works/detail/09-render-1.jpg",
      "assets/img/works/detail/09-render-2.jpg",
      "assets/img/works/detail/09-render-3.jpg",
      "assets/img/works/detail/09-render-4.jpg",
      "assets/img/works/detail/09-render-5.jpg",
      "assets/img/works/detail/09-render-6.jpg"
    ],
    detailCap: [
      "Mini Cooper · 产品渲染",
      "蘑菇 · 环境渲染",
      "卧室 · 室内渲染",
      "石狮 · 材质渲染",
      "别墅 · 建筑渲染",
      "雪夜小屋 · 环境渲染"
    ],
    desc:
      "从硬表面产品到环境场景：Mini 车模、石狮材质、卧室室内、别墅外观、雪夜小屋。" +
      "每件都从建模开始，调材质、布光，再到环境氛围出图。会三维对平面岗是加分项——" +
      "客户要看“实物长什么样”的时候，不用等打样就能给图。",
    role: "建模 · 材质 · 灯光 · 渲染",
    tools: "3ds Max · V-Ray",
    output: "渲染图 6 组",
    tags: ["3ds Max", "建模", "材质", "布光", "环境渲染"]
  },
  {
    no: "10",
    cat: "motion",
    title: "MG 动效短片",
    en: "MOTION GRAPHICS",
    sub: "MG 短片 5 支 · 点击播放",
    cover: "assets/img/works/10-motion.png",
    format: "wide",
    year: "2025",
    detailMode: "video",
    detail: [
      "assets/video/10-motion-1.mp4",
      "assets/video/10-motion-2.mp4",
      "assets/video/10-motion-3.mp4",
      "assets/video/10-motion-4.mp4",
      "assets/video/10-motion-5.mp4"
    ],
    detailCap: [
      "MG 视频",
      "MG 视频 2",
      "9 月 10 日 · 教师节",
      "10 月 28 日",
      "闻鸡起舞 · 成语动画"
    ],
    desc:
      "把平面图形做成会动的：分层、卡点、转场。影视动画专业的底子在这里用得上，" +
      "品牌宣传片、活动开场、电商短视频都能自己从设计做到成片。",
    role: "设计 · 动画 · 剪辑",
    tools: "After Effects · Animate · Premiere",
    output: "MG 短片 5 支",
    tags: ["MG 动画", "节奏卡点", "转场", "分层"]
  },
  {
    no: "11",
    cat: "motion",
    title: "视频剪辑作品",
    en: "VIDEO EDITING",
    sub: "片头 · 燃剪 · Vlog · AI 短片 · 9 支成片",
    cover: "assets/img/works/11-edit.png",
    format: "normal",
    year: "2025",
    detailMode: "edit",
    detail: [
      "assets/video/11-edit-7.mp4",
      "assets/video/11-edit-10.mp4",
      "assets/video/11-edit-6.mp4",
      "assets/video/11-edit-1.mp4",
      "assets/video/11-edit-9.mp4",
      "assets/video/11-edit-5.mp4",
      "assets/video/11-edit-2.mp4",
      "assets/video/11-edit-3.mp4",
      "assets/video/11-edit-4.mp4"
    ],
    detailCap: [
      "电视剧片头 · 雪原概念",
      "纪录片片头 · 破浪者",
      "动漫燃剪 · 鼓点卡点",
      "AI 环境 · 场景生成",
      "游戏人物 · 角色混剪",
      "Vlog · 城市随拍",
      "AI 宣传片 · 产品特写",
      "AI 宣传片 · 场景演绎",
      "AI 宣传片 · 品牌概念"
    ],
    thumbs: [
      "assets/img/works/detail/11-thumb-7.jpg",
      "assets/img/works/detail/11-thumb-10.jpg",
      "assets/img/works/detail/11-thumb-6.jpg",
      "assets/img/works/detail/11-thumb-1.jpg",
      "assets/img/works/detail/11-thumb-9.jpg",
      "assets/img/works/detail/11-thumb-5.jpg",
      "assets/img/works/detail/11-thumb-2.jpg",
      "assets/img/works/detail/11-thumb-3.jpg",
      "assets/img/works/detail/11-thumb-4.jpg"
    ],
    desc:
      "把素材剪成有节奏的叙事：选片、套底、卡点、转场、调色，一路到成片。" +
      "九支片子覆盖不同路数——电视剧概念片头的氛围、动漫燃剪的鼓点、" +
      "AI 生成素材的二次剪辑、Vlog 的日常呼吸感。剪得多了会形成手感：" +
      "什么时候该停、什么时候该推，和做版式的取舍是同一件事。",
    role: "选片 · 剪辑 · 卡点 · 调色",
    tools: "Premiere · After Effects · DaVinci",
    output: "成片 9 支",
    tags: ["剪辑节奏", "卡点", "转场", "调色", "片头"]
  }
];
