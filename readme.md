# 平乐合笙人工智能应用软件工作室 · 纯前端经营落地页

在线预览：https://taratraovo.github.io/hesheng-ai-studio-website/

一个可直接部署到 GitHub Pages 的纯前端静态网站模板，适合用作工作室/产品的“经营介绍页面”。模板内置响应式设计、SEO 元信息、深浅色主题切换，以及最少可维护的工程化（零构建、零依赖）。

> 经营内容（来源于原 README）：
>
> - 软件开发；软件外包服务；
> - 技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；
> - 人工智能应用软件开发；人工智能基础软件开发；人工智能理论与算法软件开发；
> - 动漫游戏开发；数字文化创意软件开发；
> - 智能机器人的研发。

---

## 快速开始

- 本地预览：直接双击 `index.html` 用浏览器打开即可（纯静态，无需任何后端）。
- 自定义品牌：在 `scripts/main.js` 中的 `SITE_CONFIG` 填入你的 `brand`、`email` 等。
- 自定义文案：编辑 `index.html` 中对应区块（Hero/Features/Pricing/FAQ/Contact）。
- 自定义样式：修改 `styles/main.css` 中颜色变量和组件样式。

## 一键部署到 GitHub Pages

1. 推送代码到 GitHub 仓库（默认分支 `main`/`master` 均可）。
2. 打开仓库 Settings → Pages：
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main`，文件夹选择 `(root)` 根目录
3. 保存后等待 1～2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可。

> 已包含 `.nojekyll` 与 `404.html`，避免 Jekyll 解析并提升静态站兼容性。

## 主要特性（Best Practices）

- 纯前端、零依赖：不需要 Node/打包器，便于长期维护和迁移。
- 可访问性与响应式：语义化 HTML、合理对比度、移动端优先布局。
- SEO 元信息：含 `title`、`description`、Open Graph 等社交分享信息。
- 深浅色主题：跟随系统并可手动切换，状态持久化到 `localStorage`。
- 极简可配置：集中配置 `SITE_CONFIG`，品牌/联系方式一处修改全站生效。
- 结构清晰：`index.html` + `styles/` + `scripts/` + `assets/`，易于协作。

## 目录结构

```
.
├─ index.html          # 页面骨架 & 文案区块
├─ 404.html            # GitHub Pages 404 兜底页
├─ .nojekyll           # 关闭 Jekyll 解析
├─ site.webmanifest    # PWA/图标与主题色信息（可选）
├─ styles/
│  └─ main.css         # 基础样式、栅格、组件、暗黑模式
├─ scripts/
│  └─ main.js          # 主题切换、年份、SITE_CONFIG 应用
└─ assets/
   └─ favicon.svg      # 站点图标（可替换）
```

## 自定义指南

- 品牌名称：
  - 修改 `scripts/main.js` 中 `SITE_CONFIG.brand`，页头 Logo 文本与页脚同时更新。
- 联系方式：
  - 修改 `SITE_CONFIG.email` 或直接替换 `index.html` 联系区块中的 `mailto:` 链接。
- 主题色：
  - 在 `styles/main.css` 的 `:root` 中修改 `--primary`/`--primary-600` 即可。
- 模块启停：
  - `index.html` 中每个 section 是独立区块（Features/Pricing/FAQ/Contact），删除即可隐藏。

## 本地校验（可选）

- HTML 规范：把 `index.html` 粘贴到 https://validator.w3.org/ 校验。
- 性能与可访问性：Chrome DevTools → Lighthouse 跑一次得分。

## 开发路线图（可自行取舍）

- [ ] 多语言（i18n）
- [ ] 表单服务接入（如 Formspree / Netlify Forms）
- [ ] 站内统计（如 Plausible / GA4 可配置）
- [ ] 组件库化（将常用区块提取为可复用片段）

## 许可证

本模板默认以 MIT 协议开源。你可以自由复制、修改并用于商业项目，但请保留版权声明。

---

### 致谢与联系

- 设计与实现：纯前端（HTML/CSS/JS），无需服务器。
- 商务合作：请在页脚或 `SITE_CONFIG.email` 留下你的联系邮箱，我们将尽快回复。

