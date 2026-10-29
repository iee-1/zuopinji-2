# 包兴洁 · 平面设计作品集 2026

一个不需要任何构建工具、不需要联网的静态作品集网站。
视觉参考 premotio.com 的暗色编辑风：超大字号、滚动编排、磁吸按钮、自定义光标、光流背景。

直接双击 **`打开网站.bat`**（或 `index.html`）就能看。

> ⚠ **千万不要用 Word / WPS 打开 `index.html`。**
> Word 会把网页改写成 Word 文档，整站样式全丢（会变成“白底像 Word 一样”的页面）。
> 改文字请用**记事本**或 VS Code；加作品只需要改 `assets/js/works.js`。

---

## 一、目录结构

```
portfolio-2026/
├─ index.html              页面结构（只能用记事本改）
├─ 打开网站.bat            双击用浏览器打开
├─ 加作品（记事本打开）.bat   加作品的入口：直接打开 works.js
├─ 加作品-照这个抄.txt      加作品的图文步骤（新手先看这个）
├─ 备份当前版本.bat        改东西前先点一下，备份到 _backup\
├─ 恢复成备份.bat          改坏了点这个，退回上一次备份
├─ assets/
│  ├─ css/main.css         所有样式（顶部有配色变量）
│  ├─ js/
│  │  ├─ works.js          ★ 作品清单：加作品、改文案只改这个
│  │  └─ main.js           交互与动效（不用改）
│  ├─ img/works/           11 张封面（SVG，可换成 jpg/png）
│  ├─ portrait.jpg         关于页照片（已用简历里的证件照）
│  └─ bao-xingjie-resume.pdf  简历（已换成新版，2026.08 更新）
├─ _backup/                自动备份（index-last.html / works-last.js / index-original.html）
├─ _tools/gen_covers.py    封面生成脚本（想重做封面才用得到）
└─ README.md
```

---

## 二、改内容

### 0. 先做备份

改任何东西之前，双击 **`备份当前版本.bat`**。
改坏了就双击 **`恢复成备份.bat`**，会退回上一次备份。

### 1. 改作品清单 → `assets/js/works.js`

双击 **`加作品（记事本打开）.bat`** 会自动用记事本打开这个文件。
一件作品 = 一个 `{ ... }`，加作品就复制一整段粘在最后，注意用逗号隔开：

```js
{
  no: "12",                     // 编号，显示在卡片上
  cat: "brand",                 // 分类：brand / pack / poster / ecom / ui / motion
  title: "作品标题",
  en: "ENGLISH TITLE",
  sub: "一句话说明",
  cover: "assets/img/works/12-xxx.svg",
  format: "normal",             // 目前排版统一半宽，这个字段可留着
  year: "2026",
  desc: "案例说明，2—3 句，写清做了什么、难点在哪。",
  role: "我负责",
  tools: "软件",
  output: "产出",
  tags: ["标签1", "标签2", "标签3"]
}
```

- 分类按钮的文字和数量会自动更新（`CATS` + 自动计数）。
- 卡片、案例弹层、上一件/下一件，全部由这一份数据生成。

### 2. 换封面 → `assets/img/works/`

- 建议尺寸 **1600 × 1100**（16:11），JPG / PNG / SVG 都行。
- 换成 jpg/png 时，把 `works.js` 里的 `cover` 后缀一起改掉。
- 目前 11 张是生成的占位封面，**换成你真实的作品图效果最好**——这是整个站最值得投入的地方。

### 3. 改个人信息 → `index.html`

搜索这些位置直接替换：

| 内容 | 出现在 |
|---|---|
| `包兴洁` / `BAO XINGJIE` | 导航、首屏、页脚、关于 |
| `2286653711@qq.com` | 导航右侧、联系区、菜单、meta |
| `187 5072 5407` | 联系区、菜单 |
| `重庆` / `福建福州` | 菜单、关于、联系（暂居重庆 · 家乡福州） |

> 注意：`main.js` 里「复制邮箱」写死了 `2286653711@qq.com`，换邮箱时也要改那里（搜 `copyMail`）。

### 4. 改配色 → `assets/css/main.css` 顶部

```css
:root{
  --ink: #0A0A0B;        /* 背景 */
  --paper: #EDE8DF;      /* 正文 */
  --accent: #FF4A1C;     /* 强调色（按钮、下划线、高亮） */
  ...
}
```

只改 `--accent` 一个值，整站的强调色就统一换掉了。

---

## 三、动效说明

| 效果 | 位置 |
|---|---|
| 加载进度 → 幕布上滑 | 打开页面时 |
| 首屏大字逐行升起 | `.hero-line-in` |
| 背景光流（Canvas 动态渐变） | `#heroCanvas` |
| 磁吸按钮 | `data-magnetic` |
| 自定义光标（悬停作品变 VIEW） | `.cursor` |
| 滚动逐段上浮 / 数字滚动 | `data-reveal` / `data-count` |
| 滚动视差 | `data-parallax` |
| 跑马灯 | `.ticker` |
| 能力行悬停预览图 | `.skill-preview` |
| 作品卡片悬停 + 案例层上滑 | `.work` / `.case` |
| 全屏菜单 | `#menu` |

**关闭动效**：系统里打开「减少动态效果」后，站内会自动切到静态版（无光标、无视差、内容直接可见）。

---

## 四、上线

纯静态，放到任何静态托管都可以：

- **GitHub Pages**：新建仓库 → 上传 `portfolio-2026` 里的全部文件 → Settings → Pages → 选 main 分支根目录。
- **Vercel / Netlify**：把文件夹拖进去，或者 `vercel deploy`。
- **国内**：阿里云 OSS / 腾讯云 COS 开静态网站托管，把文件传上去即可。

上线前建议：

1. 把占位封面换成真实作品图；
2. 关于页照片已用简历里的证件照（`assets/portrait.jpg`），想换直接同名替换即可（建议 5:7 竖图）；
3. 简历 PDF 已按新版简历重新生成（`assets/bao-xingjie-resume.pdf`），换简历时同名替换；
4. 用手机真机再看一遍（作品卡在手机上是单列）。

---

## 五、备注

- 全站不依赖 CDN、不加载外部字体，断网也能正常显示。
- 字体优先用系统里的 Bahnschrift / Microsoft YaHei；换电脑时会自动降级，不会乱版。
- 想重新生成封面：装 Python 后运行 `python _tools/gen_covers.py`（会覆盖 `assets/img/works/` 里的 11 张 SVG）。
