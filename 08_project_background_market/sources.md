# 来源与证据边界

冻结版本：**BACKGROUND-MARKET-CONTENT-FROZEN-v1**。

查阅日期：2026-09-11。优先官方网页及项目已有研究；没有新增专利检索。编号用于本目录交叉引用。财务与设备销售指标按原始定义保留，网页没有发布日期时明确标记。

| ID | 原始来源与日期 | 支持内容 | 边界 |
|---|---|---|---|
| S01 | [ASML FY2025 results](https://www.asml.com/en/news/press-releases/2026/q4-2025-financial-results)，2026-01-28 | FY2024/2025 公司净销售额、新/二手光刻系统销量、存量设备管理收入 | 公司收入不是纯光刻收入；服务不是 LS 备件收入；销量不是 LS 套数 |
| S02 | [SEMI：2026Q2 全球设备 billings](https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-billings-increased-23-percent-year-over-year-in-q2-2026-semi-reports)，2026-09-03 | 405.3 亿美元、同比23%、环比11%；SEMI/SEAJ 成员提交数据形成 WWSEMS | 全部半导体设备、单季度；非光刻子市场或资本开支本身；不纳入未读取核实的地区图片表 |
| S03 | [ASML：Measuring accuracy](https://www.asml.com/en/technology/lithography-principles/measuring-accuracy)，页面未标日期 | 图形质量计量、焦点/套刻反馈及环境控制背景 | 不作为具体 LS 精度或结构证明 |
| S04 | [ASML：DUV systems](https://www.asml.com/en/products/duv-lithography-systems)，页面未标日期 | 整机产品体系、晶圆翘曲/高起伏膜层的设备背景 | 产品能力不等于实际销量 |
| S05 | [Nikon：半导体光刻产品线](https://www.nikon.com/business/semi/lineup/)，页面未标日期 | 整机角色；NSR-S636E ≥280片/小时、96 shots | 公开产品条件，非 LS 采样性能 |
| S06 | [Canon：FPA-6300ES6a](https://global.canon/en/product/indtech/semicon/fpa6300es6a.html)，页面未标更新日期；部分比较基准注明2016-12-14 | >200片/小时（300mm、98 shots、选件）；F-MAP、同步/振动控制 | 是产品示例，不称最新行业极限；不用 overlay 指标代替测高精度 |
| S07 | [SMEE：SSX600](https://www.smee.com.cn/eis.pub?method=indexinfo&onclicknodeno=1_4_1_1&service=homepageService)，页面未标日期 | 工艺自适应调焦调平、六自由度平台等公开整机能力 | 不证明未公开订单、外售 LS 业务或先进节点量产 |
| S08 | [ZEISS SMT：Products](https://www.zeiss.com/semiconductor-manufacturing-technology/products.html)，页面未标日期 | 光刻光学、激光光学、光学系统等上游角色 | 不证明具体 LS 完整供货关系 |
| S09 | 项目既有：[技术难点](../03_analysis/challenges_and_trends.md)、[厂商路线](../03_analysis/company_routes.md)、[UVLS](../03_analysis/uvls_deep_dive.md)、[论文证据说明](../00_methodology/source_notes.md) | 测高物理机制、误差类型、国内研究力量及功能链归纳 | 是已完成研究的复用，不把专利公开方案视为量产证明；不重复法律核验 |
| S10 | [Nikon FY2026/3 Financial and Business Data](https://www.nikon.com/content/dam/web-assets/nikoncom/company/local/global/en/ir/ir_library/result/pdf/2026/26_4qf_d_e.pdf)，2026-05-08，第1页第4表 | 2025/3与2026/3新机18/22、翻新10/5、合计28/27；核对原表列位置 | 半导体设备与FPD分列；财年不是自然年；不纳入市场份额 |
| S11 | [Canon FY2025 财务结果](https://global.canon/en/ir/results/2025/rslt2025e.pdf)，2026-01-29，PDF第7页 | 先进后道光刻增长、部分应用需求偏弱；工业业务多品类 | 不等同前道光刻销量或收入；未据此生成市场规模 |

## 方法借鉴记录

已阅读以下原文，仅借鉴研究方法，不安装或搭建 agent 系统：

- [ECC market-research](https://github.com/affaan-m/ECC/blob/main/skills/market-research/SKILL.md)：用户所指 everything-claude-code 项目当前转至 ECC；采用重要判断有来源、事实/推断分开、重视反证。具体应用：同时保留 ASML 收入增长与新机台数下降。
- [claude-office-skills competitive-analysis](https://github.com/claude-office-skills/skills/blob/main/competitive-analysis/SKILL.md)：先限定市场，再区分参与者能力与角色。具体应用：整机、自研/集成、上游器件和研究机构分开，不强套 SWOT 等框架。
- [OneWave-AI market-sizing](https://github.com/OneWave-AI/claude-skills/blob/main/market-sizing/SKILL.md)：借鉴自上而下与自下而上交叉验证及透明假设。具体应用：上层代理指标无法直接得到 LS TAM；缺少采购参数时只列公式，不填造数值。

## 数据使用和未决问题

`market_data.csv` 中 `evidence_type` 区分财务实绩、行业统计和产品标称；`ppt_use` 区分建议展示与备查。`value_relation` 保留大于/大于等于，不能丢掉限定变成精确值。`period` 不把不同年度与季度混成时间序列。未标日期的产品数据只作为当前网页可见的产品例子。

目前未核实独立 LS 市场规模、单机配置/价格、全球光刻全口径规模、全球存量、中国扩产的统一量化序列及各家 LS 供应合同。这些不是零，也不能从专利统计推导。现有三页方案不依赖这些未知量；日后若要货币 TAM，再补采购侧证据。

审核范围：数值/单位/年度一致；来源可追溯；产品条件保留；事实与推断分离；冻结专利数据不变。没有生成图像，也没有做新的专利或 FTO 分析。

## 二次审核与停止条件

A：核实 Nikon 新/翻新机表及 Canon 应用边界，未取得同年度同口径全球份额；保留定性格局。B：再次核实 SEMI 2026Q2 原始发布，保留当期设备景气；未把二手转述的2027预测纳入。C：核实 ASML 存量收入脚注定义与 Nikon 翻新机销量；LS 专项维护/升级证据不足。上述缺口均不影响三页说明性汇报，停止普通资料搜索。

CSV 新增 `can_show`（能说明什么）、`final_market_anchor`（市场页三个指标组）、`freeze_version`；原有非选定数据保留为备查，禁止自动全量上图。`caveat` 即不能说明什么。市场页只使用 final_market_anchor 非空记录。
