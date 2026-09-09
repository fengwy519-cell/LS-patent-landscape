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
