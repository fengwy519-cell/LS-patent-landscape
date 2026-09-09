# Preliminary Patent Risk / FTO 筛选

## 1. 结论边界

本筛选回答“哪些 family 应优先做正式 FTO”，不回答“某产品是否侵权”。原因是当前没有具体自主 LS 的波长、入射角、投影图形、探测器、信号链、校准流程、stage 架构和目标销售地域。

法律状态均截至 2026-09-09。除特别说明外，“Active/Pending”来自 Google Patents 自动汇总，只是初筛；HIGH 不是法律结论，而是“技术重合高且仍可能存在权利”的工作优先级。

## 2. 第一优先级：设计冻结前必须逐国 claim chart

1. **ASML-2009-UVLS — US8842293 family**：若方案用光刻胶敏感 UV/DUV 反射测表面，这是最直接的总体架构风险。
2. **ASML-2014-DIRECTARRAY — WO2016102127 family**：若 detector array 直接采样周期条纹且像素 pitch 与光栅周期构成特定关系，重合度高。
3. **ASML-2016-RANGE / 2018-MONOLITHIC / 2019-FUSION**：分别覆盖动态参考高度、检测光栅/下游元件一体化、不同 footprint 传感器融合。
4. **NIKON-2005-PRISM / 2009-GH / 2011-PIXELFILTER / 2012-AIRTEMP**：覆盖棱镜折转的偏振位移、多波长×偏振 GH 校正、像素级滤光和波长特定光栅周期。
5. **CANON-2013-TWINSTATION / 2021-MULTIRANGE**：双工位 wafer-map 传递和不同量程/阈值的表面拟合控制。
6. **中国有效候选**：CN104880913B、CN106997152B、CN108106561B、CN110095944B、CN115185161B。它们分别约束非对称共轭 process rejection、扫描镜监测、空间双折射差分、错位子检测光栅和数字莫尔。
7. **最新 PCT**：WO2026052495A1 与 WO2026068338A1 对大视场 split-field/dual-relay 的 claim 1 很直接。它们尚未完成主要国家实审，但自主方案的 2026–2030 产品周期必须持续监控。

## 3. 模块化风险地图

| LS 模块 | 高优先候选 | 设计评审问题 |
|---|---|---|
| 波长/光源 | ASML-2009-UVLS; NIKON-2012-AIRTEMP | 是否使用 resist-sensitive actinic band？不同波长是否绑定不同 grating pitch/AOI？ |
| 投影光栅/光路 | NIKON-2005-PRISM; ASML-2024-FIELDSPLIT; ASML-2024-DUALRELAY | 是否有特定棱镜反射序列、sub-field mirror relay 或 offset dual relay？ |
| 探测光栅/阵列 | ASML-2014-DIRECTARRAY; ASML-2018-MONOLITHIC; SMEE-2018-SUBGRATING | 周期图形由物理检测光栅、像素阵列还是数字 mask 解调？ |
| 光谱/偏振分离 | NIKON-2009-GH; NIKON-2011-PIXELFILTER; SMEE-2016-LINESCAN | 滤光是否集成到像素？是否以普通/非常光同时差分？ |
| 动态量程 | ASML-2016-RANGE; CANON-2021-MULTIRANGE; SMEE-HUST-2008-COARSEFINE | 是移动参考零位、两个传感器量程还是 stage 扫描？数据如何切换？ |
| 标定/漂移 | ASML-2016-ACTIVEALIGN; SMEE-2016-MIRRORMON; CANON-2013-TWINSTATION | 校准动作移动哪些元件？扫描镜状态如何测？地图如何跨工位传递？ |
| wafer map / 融合 | ASML-2019-FUSION; CANON-2021-MULTIRANGE | 是否融合不同 footprint；是否使用阈值/既有曝光区决定 correction？ |

## 4. 初步 design-around 方向

可优先探索的组合不是单点替换，而是整条信号链重构：

- 采用非 actinic 宽谱/多角度物理模型，但不使用像素级颜色/偏振滤光；
- 用非周期编码、相位相关或 spot-centroid 替代“投影光栅 + 对应检测光栅/数字光栅”；
- 用单一传感器的连续 stage sweep 获得量程，避免两个不同 footprint 传感器直接融合；
- 用外部可追溯 reference artifact 和电子相位校正，避免移动投影/检测光栅；
- 用单一大视场自由曲面/折反射系统，避开 sub-field mirror relay 与两个 offset concave/convex relays；
- 使用非双折射同时差分（例如同芯片相位正交采样），并取消与现有专利相同的 normalization-mark 几何。

每条 design-around 都可能落入另一 family，必须针对实际原理图做 element-by-element chart，不能只改名或移除从属权利要求特征。

## 5. 正式 FTO 所需输入与动作

### 需要自主方案提供

- 目标国家、预计上市时间和制造/使用/销售路径；
- 光源谱、胶上剂量、偏振、AOI、NA 和光斑/footprint；
- 投影/检测完整光路及所有光栅、棱镜、relay、fiber、detector 关系；
- 粗测/精测、reference、扫描镜和零位校准时序；
- wafer map 采样、拟合、阈值、融合和曝光控制数据流。

### 下一轮法律核验

1. USPTO Patent Center：maintenance、PTA/PTE、terminal disclaimer、continuation chain 和最终授权 claims；
2. EPO Register：EP national validation、opposition、lapse；
3. J-PlatPat、CNIPA、KIPRIS：年费、无效/复审、权利人、分案和文本差异；
4. WIPO PATENTSCOPE：2024 priority PCT 的 ISR、written opinion 和后续 national phase；
5. 对每个目标产品模块输出 E/I/P/N/? claim chart，并由专利律师复核 claim construction 和 doctrine of equivalents。
