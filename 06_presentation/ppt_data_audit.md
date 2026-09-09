# PPT Patent Family 数据去重与一致性审计

## 冻结结论

- 冻结版本：`PPT-DATA-FROZEN-v1`
- 冻结日期：2026-09-09
- 审计范围：仅审核 [ppt_data.csv](ppt_data.csv) 中已有记录；未开展新增专利检索或新增技术分析。
- 审计前：197 条 family/invention-branch 记录。
- 删除明确重复：2 条。
- 冻结后：**195 条记录**；195 个唯一 `family_id`、195 个唯一代表专利，且 `patent_family_count` 均为 1。
- 结论影响：SMEE 与 ASML 各减少 1 条；申请人排序、技术路线、核心难点和风险区域结论均未改变。未发现会改变现有技术路线结论的重大遗漏。

文件 SHA-256：`6fd040d990aa5219ae26fddb2327711c5add0098d4f91fade91fe408dc26e917`

## 删除的明确重复

| 删除记录 | 保留记录 | 审核依据 | 处理 |
|---|---|---|---|
| CN1971426A | CN100559278C | 同一中国申请的公布与授权文本；Google Patents family ID 均为 38112301 | 合并为 1 个 family 记录，保留授权文本 |
| CN114096916A | US11662669B2 | 同一 PCT 路线的中国、美国国家阶段成员，另含 WO2021004724A1；Google Patents family ID 均为 67262100 | 合并为 1 个 family 记录，保留美国授权文本 |

## 审核规则

1. 同一申请的 A/B/C 公布、授权文本只计 1 条。
2. 明确属于同一国际专利族的 WO、EP、US、JP、CN、KR 国家阶段成员只计 1 条。
3. 同一优先权日但申请号、simple family ID 或独立权利要求焦点不同的 continuation/divisional/invention branch 不机械合并。
4. 仅对现有数据中的高相似标题、同申请人同优先权日和跨法域候选做身份核验，不扩大检索结果集。

经复核并保留的典型候选包括：Canon 2006 年两件不同日本优先权申请；中国科学院 2012 年两件不同申请；SMEE 2021 年两件不同申请；ASML 2009 年四个不同 simple-family/权利要求分支；Nikon 2012 年两件不同 PCT 申请；ASML 2024 年两件不同欧洲优先权/PCT 申请。

## 最终 Applicant 统计

| Applicant | Family records |
|---|---:|
| SMEE | 100 |
| ASML | 36 |
| Canon | 23 |
| Nikon | 17 |
| CAS-related institutes | 7 |
| Beijing Institute of Technology | 2 |
| Samsung | 2 |
| Beijing Yuwei Semiconductor | 1 |
| CETC Institute 45 | 1 |
| Chengdu Hongboyu Optoelectronics | 1 |
| Fudan University | 1 |
| Jihua Laboratory | 1 |
| Kioxia/Toshiba Memory | 1 |
| Shanghai Yuwei Semiconductor | 1 |
| Wisdom Star (Shanghai) | 1 |
| **合计** | **195** |

## 最终 Year 统计

| Earliest priority year | Family records | Earliest priority year | Family records |
|---:|---:|---:|---:|
| 2006 | 12 | 2016 | 11 |
| 2007 | 13 | 2017 | 3 |
| 2008 | 13 | 2018 | 7 |
| 2009 | 14 | 2019 | 4 |
| 2010 | 6 | 2020 | 7 |
| 2011 | 11 | 2021 | 6 |
| 2012 | 21 | 2022 | 10 |
| 2013 | 14 | 2023 | 10 |
| 2014 | 12 | 2024 | 10 |
| 2015 | 11 |  |  |
| **合计** | **195** |  |  |

### PPT 分期汇总

| Applicant | 2006–2010 | 2011–2015 | 2016–2020 | 2021–2024 | 合计 |
|---|---:|---:|---:|---:|---:|
| SMEE | 26 | 48 | 18 | 8 | 100 |
| ASML | 7 | 5 | 9 | 15 | 36 |
| Canon | 14 | 3 | 2 | 4 | 23 |
| Nikon | 9 | 7 | 1 | 0 | 17 |
| CAS-related institutes | 0 | 4 | 1 | 2 | 7 |
| 全部申请人 | **58** | **69** | **32** | **36** | **195** |

## 冻结与变更控制

`ppt_data.csv` 自本版本起作为立项 PPT 的冻结定量数据源。后续只有在发现足以改变申请人排序、年度趋势或技术路线结论的身份错误/重大遗漏时才允许修改；修改时必须升级冻结版本、重新计算 Applicant/Year 统计和 SHA-256，并在本文件追加变更记录。
