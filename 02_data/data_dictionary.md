# 数据字典

`patent_families.csv` 的一行代表一个核心发明 family 或需要单列分析的 continuation claim branch。

| 字段 | 含义 |
|---|---|
| family_key | 项目内部稳定编号，不等同 INPADOC ID |
| representative | 最适合阅读的代表公开号/授权号 |
| earliest_priority | 最早优先权日；未知不猜测 |
| applicant_normalized | 归一化申请人 |
| inventors | 已由专利元数据确认的发明人 |
| jurisdictions | 已识别的主要同族地域，不宣称穷尽 |
| family_members | 重要成员及 continuation/divisional 关系 |
| technical_cluster | 项目技术分类 |
| problem | 专利要解决的具体问题 |
| solution | 说明书/权利要求支持的方案摘要 |
| independent_claim_focus | 独立权利要求的技术要素摘要；空白表示尚未读取 |
| status_snapshot | 检索日的状态快照 |
| status_authority | 状态来源；GP 表示 Google Patents 初筛 |
| evidence_level | E1–E4，定义见 methodology |
| relevance | A–D，定义见 methodology |
| risk_screen | HIGH/MEDIUM/LOW/BACKGROUND/REVIEW |
| evidence_url | 直接支持该行的专利或官方页面 |
| notes | 不确定性、待核验项和范围限制 |

CSV 中 claim 摘要均为研究者的技术性概括，不是权利要求原文，也不能替代 claim construction。

## 全量专利索引

[all_patent_index.csv](all_patent_index.csv) 汇总本项目已记录的专利，按 `applicant_normalized → earliest_priority → family_key` 排序。采用 UTF-8 BOM，方便 Excel 直接打开中文。整理日期：2026-09-11；来源为仓库提交 `5721885be4d8236f93675e9abd068deb874d8055`。未新增外部检索、技术分析或法律状态核验。

每行保留现有 family / invention branch 单元；多值字段用 `|` 分隔。不是全球专利全集，也不是新的 Landscape 数量统计。

| 字段 | 索引口径 |
|---|---|
| applicant_normalized | 厂商分组沿用冻结样本；SMEE 联合申请归 SMEE，CAS 归 CAS-related institutes；ASML/Philips historical 保留历史归属的不确定性 |
| applicant_detail | 保留核心库机构全名或联合申请人；未细分的 CAS 记录不猜测具体研究所 |
| earliest_priority | 原有最早优先权日，YYYY-MM-DD；4 条未知记录留空，在各申请人组内排最后，不以公开日或授权日代替 |
| family_key | 有核心库映射时沿用核心 key，否则使用冻结 family_id；均为项目编号 |
| family_id | 保留冻结样本原始编号，用于逐行回查；非样本记录留空，不伪造官方 family ID |
| representative_patent | 优先保留冻结样本代表号；非样本记录沿用核心库代表号；所有来源代表号均收入 family_members |
| family_members | 已有成员字段、明确匹配的代表号及冻结审计确认成员的并集；完整保留 A/B/C 文本号；不从同日、同标题或引用关系推断同族 |
| title | 沿用样本已有标题，可能是截断标题或项目主题摘要；12 条核心库独有记录没有标题字段，留空并注明，不用技术分类冒充原标题 |
| technical_cluster | 核心记录沿用核心库精细主题，其他记录沿用冻结分类；不是重新技术聚类 |
| brief_focus / focus_basis | 核心库 problem/solution 的简短中文摘要，或仅基于现有标题/分类的索引提示；未记录具体问题时明确说明 |
| jurisdictions | 核心库已有地域与已知成员前缀并集；某地域已知但公开号未记录时，不补造号码；WO 为国际公开路线，不是授权国家 |
| status_snapshot | 原样保留既有来源快照及限定；无来源则标未记录；不由 A/B/C 后缀推断当前有效性，不代表 2026-09-11 新核验 |
| project_role | 多标签：Core、Landscape、Claim/FTO、Background；仅对已明确归类的记录赋值，不因标题泛化而额外标 Adjacent |
| risk_screen | Claim 矩阵优先，其次核心库；未筛查为 NOT_SCREENED，不能理解成 LOW |
| claim_review_scope | 保留矩阵实际阅读范围，包括“摘要”“母案已读、有效授权待重读”等限制；Claim/FTO 标签不表示全部授权独立权利要求已核验 |
| evidence_url / source_records | 既有证据链接，以及来源 CSV 路径与原行编号；不表示本次重新打开过外部证据 |
| index_notes | 同族待确认、缺失字段、原库备注及风险来源冲突 |

### 覆盖审计

| 检查 | 结果 |
|---|---|
| 冻结 Landscape | 195/195 行逐一保留 family_id 和代表号，没有合并现有独立 invention branches |
| 核心库 | 38/38 行覆盖；26 条通过完整成员号交集匹配样本，12 条暂单列 |
| Claim 矩阵 | 23/23 行覆盖；全部代表号、风险等级、实际阅读范围保留 |
| 仓库既有完整专利号 | 246/246 个覆盖，包括 00–06 目录的 Markdown、CSV、检索日志与冻结审计 |
| 重复标识 | family_key 唯一；每个完整专利号仅出现在一行 family_members 中；代表号均包含于成员集合 |
| 字段与排序 | 申请人别名统一，日期格式一致，未知日期留空；按厂商、日期排序 |
| 冻结数据 | SHA-256 仍为 `6fd040d990aa5219ae26fddb2327711c5add0098d4f91fade91fe408dc26e917`，内容未变 |

上述 246 个完整号码包含各类公布、授权及国家成员，不可解释为 246 个发明。未将正文中的不完整号码扩写成新的公开号，也未重新挖掘论文参考文献。

### 三组候选同族关系

| 核心库 key / 代表号 | 冻结样本代表号 | 现有证据与处理 |
|---|---|---|
| ASML-2018-MONOLITHIC / US11221565B2 | CN111936937A | ASML、2018-04-11、LS 集成主题对应；没有显式成员映射，暂分列 |
| ASML-2021-LIGHTPIPE / EP4453660A1 | CN118435129A | ASML、2021-12-23、投影单元主题对应；没有显式成员映射，暂分列 |
| SMEE-2016-MIRRORMON / CN106997152B | US10394142B2 | SMEE、2016-01-26、扫描镜监测主题对应；没有显式成员映射，暂分列 |

因此 **207 是索引整理行数，不是已完全确认去重的独立专利族数量**。三组候选在对应双方的 index_notes 中相互指向，不写入已确认 family_members。历史核心记录原有的 family/continuation 归组也仅沿用其现有证据等级，不提高确认程度。

唯一风险等级冲突：SMEE-2016-MIRRORMON 在核心库为 MEDIUM、Claim 矩阵为 HIGH；索引采用 HIGH，同时保留冲突备注。该等级不传播给尚未确认同族关系的 US10394142B2。

复现：在仓库根目录运行 `python 02_data/build_all_patent_index.py`。脚本只读取本地既有文件，生成 CSV，并检查覆盖、成员重复、风险继承、日期及冻结哈希。
