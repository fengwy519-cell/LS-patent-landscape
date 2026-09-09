# 光刻机 Level Sensor 全球专利与技术情报

本仓库以 Patent Family 为基本分析单元，研究光刻机调焦调平/晶圆高度与表面形貌检测技术。时间重点为 2006 年至今，必要时回溯基础专利；地域覆盖 WO、EP、US、JP、CN、KR。

> 状态日期：2026-09-09。当前为 **v0.1 核心证据集**。法律状态栏是检索时点的初筛结果；在 Preliminary FTO 使用前，必须到相应司法辖区官方登记簿逐案复核。

## 当前进度

- [x] 阅读并吸收三个开源专利分析项目的方法
- [x] 提取两份中国科学院大学学位论文中的技术问题、厂商路线和专利线索
- [x] 建立关键词、分类号、申请人、发明人、family 与引用扩展框架
- [x] 确认第一批 ASML、Nikon、Canon 与中国研发单位的 Seed Families
- [ ] 完成核心 family 的全地域同族和官方法律状态逐案核验
- [ ] 完成主要 family 的 forward/backward citation 清洗
- [ ] 将高风险候选与具体自主 LS 架构逐要素比对

## 已确认的关键结论（阶段性）

1. **ASML** 的连续路线可追踪为：宽谱斜入射和偏振/波长差分校正 → 使用光刻胶敏感的 UV/DUV 使信号更表面化 → 可变空间分辨率与动态量程 → 检测光栅一体化、多通道小型化 → 不同 footprint 传感器融合及新型均匀照明/场分割。
2. **Nikon** 长期围绕斜入射条纹/光栅投影展开：利用双侧远心和棱镜结构稳定成像，继而处理薄膜导致的偏振位移、Goos–Hänchen 偏差、多波长灵敏度差异、空气温漂和 detector-array 解调。
3. **Canon** 从多波长、多点、预扫描式离轴表面位置检测，演进到双工位设备中的基准传递/漂移校正，并继续发展不同量程与精度之间的自适应表面拟合。
4. 传统可见/近红外 LS 的核心物理矛盾是：光刻胶与多层膜会产生表面/亚表面混合反射和相干干涉；改变膜厚、材料、波长、偏振或入射角都会改变表观高度。
5. UVLS 的核心价值不是单纯“缩小光斑”，而是利用光刻胶在短波段更强的吸收，使测量对表面更敏感、降低下层反射造成的 apparent surface depression。代价包括材料透过率、光源与探测器效率、散射/杂散光、光刻胶剂量预算、污染和系统集成难度。
6. 当前需要优先警惕的权利要求区域包括：光刻胶敏感波段的表面位置测量、偏振/多波长联合薄膜误差补偿、多通道一体化检测光学、动态量程/参考高度调整、不同 footprint 的传感器融合，以及双工位基准传递。风险必须结合具体产品方案和各国有效权利要求确认。

## 文件索引

- [研究方法](00_methodology/research_methodology.md)
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

## 仍待核验的问题

- EP、JP、CN、KR 分案/继续申请是否存在与 US 文本不同且仍有效的独立权利要求；
- 2024 年以后优先权的 ASML 检测结构、field-splitting 和光学测量 families 的完整 claim scope；
- Nikon 2015 年后是否通过未显式使用 autofocus/level sensor 术语的设备控制专利延续布局；
- Canon 早期多波长加权与现代双工位/量程控制 families 之间的发明人和引用连续性；
- 中国专利的专利权人变更、年费状态与无效/复审记录。

## 使用限制

本项目是技术情报和 preliminary patent-risk screening，不构成法律意见，也不能替代律师出具的 FTO。没有具体自主 LS 的光路、波段、信号链、标定流程和目标销售地域时，不作“侵权/不侵权”结论。
