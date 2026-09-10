# LS 立项 PPT 可视化素材

本目录将 `PPT-DATA-FROZEN-v1` 的冻结统计和既有技术结论转为独立、可编辑的 SVG 与 2× PNG 素材。素材不是完整 PPT 页面，可在 PowerPoint 中自由组合和裁切。

## 数据冻结边界

- 冻结样本：195 条 Patent Family / invention-branch 记录，earliest priority 为 2006–2024。
- 冻结 CSV：`06_presentation/ppt_data.csv`。
- CSV SHA-256：`6fd040d990aa5219ae26fddb2327711c5add0098d4f91fade91fe408dc26e917`。
- 本目录没有新增专利检索、技术分析或 FTO 判断，也没有修改任何冻结数值。

## 素材清单

| 文件 | 目的 | 主要数据源 | 一句话 takeaway | 推荐页 | Caveat |
|---|---|---|---|---|---|
| `01_patent_activity_2006_2024.svg/png` | 展示 2006–2024 年年度活跃度 | `ppt_data.csv`、`ppt_data_audit.md` | LS 公开专利布局持续约 20 年，2021–2024 仍有连续活动 | 第 1 页 | 统一检索样本，不是全球总量；2025–2026 不展示 |
| `02_top_applicants.svg/png` | 比较主要申请人公开布局强度 | `ppt_data_audit.md` | SMEE、ASML、Canon、Nikon 是冻结样本中的主要长期参与者 | 第 1 页 | 数量不等于技术领先、有效权利要求或市场份额 |
| `03_applicant_time_matrix.svg/png` | 显示各厂商主要布局时期与持续性 | `ppt_key_messages.md`、`ppt_data_audit.md` | SMEE 跨期持续，ASML 近年增强；Canon、Nikon 的高密度窗口不同 | 第 1 页 | 单元格为 family/invention-branch 记录数，CAS 为相关机构合计 |
| `04_company_technology_routes.svg/png` | 极简比较四家技术路线 | `ppt_company_routes.md` | 四家共享斜入射/结构光基础，但长期重心分别落在工艺物理、膜栈补偿、扫描控制和系统集成 | 第 1 页 | 路线阶段相互重叠；不列完整专利号 |
| `05_ls_technology_evolution.svg/png` | 呈现 20 年技术矛盾驱动的演进 | `ppt_challenges_trends.md` | 主线从“几何可测”走向“复杂工艺下可校准并可用于曝光控制” | 第 2 页 | 不是单件专利时间轴，阶段有重叠 |
| `06_core_challenges.svg/png` | 将难点归并为六组系统级矛盾 | `ppt_challenges_trends.md` | 真正瓶颈是工艺、信噪比、量程、标定、动态和 map 集成的联立权衡 | 第 2 页 | 立项级压缩表达，不替代详细技术分析 |
| `07_patent_risk_regions.svg/png` | 提示方案阶段的专利核查优先区 | `ppt_risk_summary.md` | 壁垒分布在波段、补偿、光栅/阵列、量程融合、校准和大视场等区域 | 第 2 页底部 | “关注度”不是侵权结论；需按司法辖区做 claim chart 和正式 FTO |

## 使用建议

- 第 1 页优先选 `01 + 02 + 04`；若需要突出持续性，可用 `03` 替换 `02`。
- 第 2 页优先选 `05 + 06 + 07`；`07` 设计为较窄的页底模块。
- SVG 使用中文字体回退：Noto Sans CJK SC / Source Han Sans SC / Microsoft YaHei；PowerPoint 缺少首选字体时会使用可用回退字体。
- PNG 为 SVG 的确定性 2× 渲染备份；白底、无透明叠加，便于跨平台插入。

## 复现

```bash
node 07_visual_assets/src/generate_visual_assets.mjs
```

SVG 由仓库内脚本确定性生成。PNG 使用 Inkscape 从同名 SVG 按 2× 像素尺寸导出。版面约束见 `src/layout_ledger.md`。

## QA 状态

- [x] 冻结数字逐项比对
- [x] SVG XML、viewBox 与文件命名检查
- [x] SVG/PNG 逐张渲染检查
- [x] 中文字体、文字溢出、标签裁切与元素遮挡检查
- [x] 2× PNG 尺寸检查
- [x] 灰度预览检查：主要逻辑仍可依靠数字、位置、文字和边框理解
