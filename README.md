# 光刻机 Level Sensor 全球专利与技术情报

本仓库以 Patent Family 为基本分析单元，研究光刻机调焦调平/晶圆高度与表面形貌检测技术。时间重点为 2006 年至今，必要时回溯基础专利；地域覆盖 WO、EP、US、JP、CN、KR。

> 状态日期：2026-09-09。当前为 **v0.2 立项材料收敛版 / PPT-DATA-FROZEN-v1**。法律状态栏是检索时点的初筛结果；在 Preliminary FTO 使用前，必须到相应司法辖区官方登记簿逐案复核。

## 当前进度

- [x] 阅读并吸收三个开源专利分析项目的方法
- [x] 提取两份中国科学院大学学位论文中的技术问题、厂商路线和专利线索
- [x] 建立关键词、分类号、申请人、发明人、family 与引用扩展框架
- [x] 确认第一批 ASML、Nikon、Canon 与中国研发单位的 Seed Families
- [x] 建立 38 条核心 family/continuation 数据库和 23 条独立权利要求风险分支
- [x] 完成厂商路线、UVLS、难点/趋势与 v0.1 主报告
- [x] 按统一门槛建立并冻结 2006–2024 年、195 个 family 级记录的 PPT 定量样本
- [x] 完成 A/B/C 公布—授权、跨国家同族去重及 Applicant/Year 统计一致性审核
- [x] 完成 Applicant × Year、Applicant × Technology 的可透视数据
- [x] 将厂商路线、六个技术矛盾、五阶段演进和风险区域压缩为 1–2 页 PPT 输入
- [ ] 待具体 LS 架构和目标市场明确后，再启动逐国法律状态核验、claim chart 与正式 FTO

## 已确认的关键结论（阶段性）

1. 冻结数据版本 `PPT-DATA-FROZEN-v1` 在统一检索口径下保留 **195 个相关 family 级记录**，其中 SMEE 100、ASML 36、Canon 23、Nikon 17、中国科学院相关机构 7、其他 12。该数值是可比较的 Landscape 样本，不是“全球 LS 专利总量”，也不代表技术领先性。
2. **ASML** 的连续路线可追踪为：宽谱斜入射和偏振/波长差分校正 → 使用光刻胶敏感的 UV/DUV 使信号更表面化 → 可变空间分辨率与动态量程 → 检测光栅一体化、多通道小型化 → 不同 footprint 传感器融合及新型均匀照明/场分割。
3. **Nikon** 长期围绕斜入射条纹/光栅投影展开：利用双侧远心和棱镜结构稳定成像，继而处理薄膜导致的偏振位移、Goos–Hänchen 偏差、多波长灵敏度差异、空气温漂和 detector-array 解调。
4. **Canon** 从多点/多波长离轴测量和双工位基准传递，演进到大检测区域、邻场测量、按曝光区域布点及扫描动态协同；该路线重心是把 surface map 嵌入设备节拍与控制。
5. **SMEE** 的公开样本从 2006 至 2024 连续出现，覆盖宽谱反射式、粗精量程、工艺适应、归一化、边缘/预扫描、空间偏振差分、错位子光栅和多路同步；其数量优势需要与独立权利要求质量分开解释。
6. 传统可见/近红外 LS 的核心物理矛盾是：光刻胶与多层膜会产生表面/亚表面混合反射和相干干涉；改变膜厚、材料、波长、偏振或入射角都会改变表观高度。
7. UVLS 的核心价值不是单纯“缩小光斑”，而是利用光刻胶在短波段更强的吸收，使测量对表面更敏感、降低下层反射造成的 apparent surface depression。代价包括材料透过率、光源与探测器效率、散射/杂散光、光刻胶剂量预算、污染和系统集成难度。
8. 当前需要优先警惕的权利要求区域包括：光刻胶敏感波段的表面位置测量、偏振/多波长联合薄膜误差补偿、投影/检测光栅与阵列直采、动态量程/多 footprint 融合、多通道校准，以及大视场/邻场测量和国内仍有效路线。

## 文件索引

- [研究方法](00_methodology/research_methodology.md)
- [随附论文证据索引](00_methodology/source_notes.md)
- [检索策略与同义词](01_search/search_strategy.md)
- [检索记录](01_search/search_log.csv)
- [核心 Patent Family 数据库](02_data/patent_families.csv)
- [数据字典与证据等级](02_data/data_dictionary.md)
- [厂商技术路线](03_analysis/company_routes.md)
- [UVLS 专项](03_analysis/uvls_deep_dive.md)
- [技术难点与趋势](03_analysis/challenges_and_trends.md)
- [独立权利要求 / 风险矩阵](04_claims/claim_risk_matrix.csv)
- [Preliminary FTO 说明](04_claims/preliminary_fto.md)
- [主报告](05_report/LS_patent_landscape_report.md)
- [立项 PPT 核心信息与两页方案](06_presentation/ppt_key_messages.md)
- [PPT 作图数据](06_presentation/ppt_data.csv)
- [PPT 数据去重与一致性审计](06_presentation/ppt_data_audit.md)
- [PPT 厂商路线矩阵](06_presentation/ppt_company_routes.md)
- [PPT 技术难点与趋势](06_presentation/ppt_challenges_trends.md)
- [PPT 风险提示](06_presentation/ppt_risk_summary.md)

## 仍待核验的问题

- 2025–2026 优先权申请受 18 个月公开滞后影响，当前不用于趋势判断；
- Nikon 2015 年后的公开连续性较弱，不能据此直接判断其研发停止；
- 2024 优先权的 ASML field-splitting、fiber detection 和 relay 分支仍需在正式 FTO 阶段核验完整 claim scope；
- Canon 2022–2023 优先权的大视场/邻场测量与动态控制分支仍处申请或早期授权阶段；
- 中国有效专利的专利权人变更、年费、无效/复审记录留待具体目标方案和司法辖区确定后核验。

## 下一步触发条件

本阶段停止扩大普通专利搜集。仅在以下信息明确后继续：具体 LS 模块框图、计划波段/偏振、投影和检测结构、标定与 wafer-map 数据流、目标制造/销售国家。届时以 `06_presentation/ppt_risk_summary.md` 的 HIGH 区域为起点开展逐要素 claim chart 与正式 FTO。

## 使用限制

本项目是技术情报和 preliminary patent-risk screening，不构成法律意见，也不能替代律师出具的 FTO。没有具体自主 LS 的光路、波段、信号链、标定流程和目标销售地域时，不作“侵权/不侵权”结论。
