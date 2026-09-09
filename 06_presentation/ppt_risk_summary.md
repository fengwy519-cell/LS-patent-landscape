# 立项阶段专利风险提示

> 本页仅用于技术层面的 preliminary patent-risk screening。没有具体光路、波段、信号链、标定流程和目标司法辖区时，不判断侵权/不侵权。

## 技术区域 × 权利人 × 关注度

| 风险技术区域 | 代表权利人 | 关注度 | 为什么需要关注 | 代表 family / claim 锚点 |
|---|---|---:|---|---|
| 光刻胶敏感 UV/DUV 反射测高 | ASML | **HIGH** | 独立权利要求直接覆盖在光刻胶敏感 actinic 波段检测反射并求表面位置的总体组合 | [US8842293B2](https://patents.google.com/patent/US8842293B2/en) family |
| 多波长 × 偏振的膜栈/GH 误差补偿 | Nikon；ASML | **HIGH** | 典型方案容易同时落入“多光谱/多偏振采样 + 组合补偿”的功能链 | [US10928187B2](https://patents.google.com/patent/US10928187B2/en) continuation chain；ASML 差分校正 family |
| 投影/检测光栅、阵列直采、数字 grating | ASML；SMEE；中科院 | **HIGH** | 物理图形、采样节距、错位子光栅和数字解调均有较具体结构性 claims | [US10241425B2](https://patents.google.com/patent/US10241425B2/en)、[CN110095944B](https://patents.google.com/patent/CN110095944B/zh)、CN115185161 family |
| 动态量程、capture、可变 footprint 和多传感融合 | ASML；Canon；SMEE | **HIGH** | 高精度 LS 常自然采用粗/精、范围切换或不同 footprint 融合，易与总体数据流重合 | [US11662669B2](https://patents.google.com/patent/US11662669B2/en)、[US12072638B2](https://patents.google.com/patent/US12072638B2/en) |
| 多通道一体化、空间偏振差分与在线校准 | ASML；SMEE | **MEDIUM–HIGH** | 通道密度提升后，光学单体化、参考标记、归一化和主动校准成为必需，专利分布密集 | [CN108106561B](https://patents.google.com/patent/CN108106561B/zh)、WO2017153069、WO2019197111 families |
| 大检测视场、邻场测量、split-field / relay | ASML；Canon | **MEDIUM–HIGH** | 直接关系下一代高吞吐与整机空间布置，且多个近年申请仍可能在审 | [EP4361728A1](https://patents.google.com/patent/EP4361728A1/en)；ASML 2024 priority PCT branches |
| 工位基准传递、map correction 与 stage 动态协同 | Canon；ASML；SMEE | **MEDIUM–HIGH** | 风险不只在传感头，也可能落在校准流程、表面 map 数据流和扫描控制 claims | [US20240361707A1](https://patents.google.com/patent/US20240361707A1/en)、[CN119126509A](https://patents.google.com/patent/CN119126509A/zh) |
| 中国境内仍有效的差分、标定和数字检测路线 | SMEE；中科院相关机构 | **HIGH（中国）** | 国内制造、销售和使用场景需单独检查 CN 授权 claims，不能只看 US/EP | CN104880913、CN106997152、CN108106561、CN110095944、CN115185161 families |

## 立项评审应看到的结论

该领域的壁垒不是一个“Level Sensor 总体专利”，而是由波段选择、投影/检测结构、信号分离、动态量程、标定、map 重建和曝光控制共同构成的多层专利组合。项目立项可以继续，但进入具体方案设计后应同步开展：

1. 以实际模块框图建立 claim feature map；
2. 按目标市场核验有效/在审状态和 continuation/divisional；
3. 对 HIGH 区域逐项形成 design-around 选项；
4. 在光路、算法和系统控制方案冻结前完成正式 FTO。

## 本阶段不做的判断

- 不把标题/摘要相关性当作 claim 覆盖；
- 不把高引用或申请数量直接当作高风险；
- 不在未核验目标司法辖区法律状态前下侵权结论；
- 不以本矩阵替代律师意见或正式 FTO。
