# Visual assets｜LS 项目背景 + 市场分析

状态：用于 `BACKGROUND-MARKET-CONTENT-FROZEN-v1` 的正式 PPT 组装。所有素材仅服务 `08_project_background_market/`，与既有专利分析素材目录 `07_visual_assets/` 无关，也不修改该目录。

## 文件清单

| 文件 | 画布 | 用途 | PPT 放置 |
|---|---:|---|---|
| `01_ls_function_chain.svg` / `.png` | 1472 × 640 | Page 1 功能链 + 光学测高原理放大 | 主图区，通栏 1:1 |
| `02_ls_core_challenges.svg` / `.png` | 1472 × 640 | Page 2 五约束收敛到可信面形 | 主图区，通栏 1:1 |
| `03_market_demand_chain.svg` / `.png` | 1472 × 160 | Page 3 需求传导带 | 上带，通栏 1:1 |
| `04_market_ecosystem.svg` / `.png` | 1472 × 320 | Page 3 参与者角色 + 3 道壁垒 | 中带，通栏 1:1 |
| `05_market_data_anchor.svg` / `.png` | 1472 × 140 | Page 3 数字锚点 M1 / M2 | 下带，通栏 1:1 |
| `src/generate_background_market_visuals.mjs` | — | 全部素材与排版示意图的生成脚本 | 不进 PPT |

排版示意图与净版页面预览在 [`../layout/`](../layout/)。

**所有素材宽度统一为 1472 px**，等于 1600 × 900 页面去掉左右各 64 px 安全边距，落版时 1:1 放置、不缩放，三页图内字号因此完全一致。
PNG 为 2× 栅格预览，仅用于视觉检查；最终 PPT 优先使用 SVG。

## 设计约束

- SVG 使用标准文本与基本矢量图形，可在 PowerPoint / Illustrator 中继续编辑。
- 字体栈：`Noto Sans CJK SC / Source Han Sans SC / Microsoft YaHei / PingFang SC / WenQuanYi Zen Hei / sans-serif`；未嵌入字体文件。
- 颜色：白底；主强调蓝 `#2563EB`；结果与目标蓝绿 `#0D9488`；辅助输入与边界琥珀 `#B45309`；正文 `#334155`。琥珀只用于"边界 / 提醒 / 辅助输入"，不用于制造趋势结论。
- 不使用渐变、发光、3D、卡通元素与装饰性图标堆叠。
- 未使用厂商 Logo，避免暗示合作或供应关系。
- 市场数值只来自冻结版 `market_data.csv` 中 `final_market_anchor` 非空的记录（M1、M2）；M3 主动不上图，以控制页面密度与误读风险。

## 使用边界

- `01` 是功能示意，不是任何具体光刻机的真实机械布局或尺寸；原理图中未标注任何精度、速度、量程数值。
- `02` 是约束关系图，不代表五项技术路线均已选型；底部 `>200 片/小时` 是**整机生产率示例**，不是 LS 采样速度，也不是本项目验收指标。
- `03` 表示需求传导，不是固定比例换算模型。
- `04` 只表达公开可确认的角色分类；整机厂已区分国际与国内，不表达市场份额，也不表达已确认的供应关系。
- `05` 中 380 → 300 为中性并列，不表示行业下滑；405.3 亿美元是全球**全部**半导体设备 2026 Q2 销售额 billings，不是光刻或 LS 市场规模。

## 相关文档

- [`image_sources.md`](image_sources.md)　图片与素材来源清单（含为什么未使用第三方图片）
- [`visual_qa.md`](visual_qa.md)　渲染与几何 QA 记录
- [`../content_review_v2.md`](../content_review_v2.md)　设计前的内容复核与修正
- [`../layout/ppt_layout_plan.md`](../layout/ppt_layout_plan.md)　三页版式方案与组装步骤

## 复现

```bash
cd src && node generate_background_market_visuals.mjs
```

脚本同时输出 `visual_assets/*.svg` 与 `../layout/` 下的排版示意图与净版预览。PNG 由无头 Chromium 以 2× 渲染同名 SVG 得到。
