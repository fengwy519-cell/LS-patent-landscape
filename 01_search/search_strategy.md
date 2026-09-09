# 检索策略

## 1. 技术要素与同义词

| 维度 | 主要英文词 | 主要中文/日文线索 |
|---|---|---|
| 功能 | level sensor, leveling, focus detection, autofocus, surface position, height sensor, topography | 调焦调平、表面位置、面位置、晶圆高度、表面形貌、焦点检测 |
| 几何 | oblique incidence, triangulation, projected image, Scheimpflug, telecentric | 斜入射、三角测量、倾斜投影、沙姆定律、远心 |
| 编码 | grating, slit, fringe projection, structured light, moiré | 光栅、狭缝、条纹投影、结构光、莫尔条纹 |
| 并行化 | multi-point, multiple beams, spot array, detector array, line sensor, TDI | 多点、多束、光斑阵列、探测器阵列、线阵 |
| 工艺依赖 | photoresist, resist stack, thin film, multilayer, subsurface reflection, apparent surface depression | 光刻胶、膜堆、多层膜、亚表面反射、表观凹陷 |
| 光谱/偏振 | broadband, multispectral, wavelength, UV, DUV, actinic, polarization, Goos-Hänchen | 宽谱、多波长、紫外、深紫外、光刻胶敏感波段、偏振 |
| 稳定性 | calibration, reference drift, thermal drift, stray light, vibration, common path | 标定、参考漂移、热漂移、杂散光、振动、共光路 |
| 控制/算法 | wafer map, surface reconstruction, scanning coordination, footprint, spatial resolution | 晶圆图、表面重建、扫描同步、测量足迹、空间分辨率 |

## 2. 分类入口

分类号从高相关 seed 反向建立，不能单独作为相关性结论。初始重点包括：

- `G03F 7/70`：曝光装置及位置/聚焦相关子组；
- `G03F 9/00` 及 `G03F 9/70` 附近：曝光中的定位、对准和表面位置控制；
- `G01B 11/00`：光学长度/位置/轮廓测量；
- `G01B 11/24`：轮廓或曲率的光学测量；
- `G01C 3/00`：光学距离测量/三角测量；
- seed 中出现的 `G03F9/7034`、`G03F7/70608`、`G03F7/706843`、`G03F7/706847` 等 CPC 细分组。

实际检索采用“分类号 AND lithograph/exposure/substrate/wafer”约束，防止把显微镜、一般机器视觉和消费电子 autofocus 大量引入。

## 3. 申请人与发明人归一化

- ASML: ASML Netherlands B.V., ASML Holding N.V.，并追踪 Philips 历史来源；
- Nikon: Nikon Corporation / 株式会社ニコン；
- Canon: Canon Kabushiki Kaisha / Canon Inc.；
- 中国路线：上海微电子装备（集团）股份有限公司、中国科学院上海光机所/光电技术研究所/微电子研究所等；
- 其他候选：Carl Zeiss SMT、TSMC、Samsung、Canon Tokki 等，只有独立权利要求与 LS 边界相交时纳入核心库。

高价值发明人连续性种子包括 ASML 的 Arie J. den Boef、Nikon 的 Yasuhiro Hidaka / Tadashi Nagayama，以及各 continuation/divisional 中反复出现的共同发明人。

## 4. 查询模板

以下为语法无关的逻辑模板；具体数据库按字段语法改写：

1. `(level OR leveling OR focus OR autofocus OR "surface position" OR topograph*) AND (wafer OR substrate) AND (lithograph* OR exposure)`
2. `(grating OR slit OR fringe OR moire OR "structured light") AND (oblique OR triangulat*) AND (wafer OR substrate) AND (focus OR level*)`
3. `(photoresist OR resist OR multilayer OR "thin film" OR subsurface) AND (height OR "surface position" OR focus) AND lithograph*`
4. `(UV OR DUV OR actinic OR wavelength OR broadband OR multispectral OR polarization) AND (level sensor OR surface position) AND lithograph*`
5. `(calibrat* OR drift OR reference OR vibration OR "common path") AND (level sensor OR autofocus) AND (wafer OR substrate)`
6. `CPC=<seed CPC> AND applicant=<normalized company> AND priority:[2006 TO *]`
7. `inventor=<seed inventor> AND (level OR focus OR surface OR topography)`

中文补充：

`(调焦 OR 调平 OR 表面位置 OR 晶圆高度 OR 面形) AND (光刻 OR 曝光) AND (光栅 OR 狭缝 OR 斜入射 OR 莫尔 OR 多波长 OR 紫外)`。

## 5. Seed → 扩展 → 收敛

1. Seed 由专利全文中明确的 LS 架构或问题定义确认；
2. 同族扩展覆盖 WO/EP/US/JP/CN/KR，并辨认 continuation/divisional；
3. 向后引用寻找基础架构，向前引用寻找改进/绕开；
4. 用重复发明人和共同分类发现术语变化；
5. 将与 overlay/alignment、膜厚计、一般共焦/干涉仪仅有弱关联的结果降为邻接或排除；
6. 对仍有效/在审的核心候选读取独立权利要求，再进入 risk matrix。

## 6. 数据库优先级

- 发现和跨语种全文：Google Patents；
- family 和程序事件交叉核验：Espacenet、WIPO PATENTSCOPE；
- 关键在审/有效权利：USPTO Patent Center、EPO Register、J-PlatPat、CNIPA、KIPRIS；
- 论文用于物理机制和历史叙事，不能替代法律状态或 claim scope。
