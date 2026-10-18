---
sidebar_position: 1
sidebar_label: 伺服器裝機檢查清單
tags: [checklist]
---

# 伺服器裝機檢查清單

不分廠牌，每次裝機照順序走一遍；各機型的細節寫在 [伺服器](/category/servers) 的機型頁。

## 0. 出發前準備

- [ ] 跟客戶確認：機櫃剩餘 U 數與深度、立柱孔型、供電電壓與 PDU 插孔（見 [機櫃、滑軌與電源](../hardware/rack-and-power/index.md)）
- [ ] 確認網路接法：光纖單模／多模、模組種類、由誰提供模組（見 [光纖、光模組與線材](../network/fiber-transceiver/index.md)）
- [ ] 確認 IP 規劃：BMC、OS、閘道器、DNS、NTP、VLAN
- [ ] 工具：螺絲起子、防靜電手環、束帶／魔鬼氈、標籤機或標籤紙、手電筒
- [ ] 線材與備品：備用光模組、光纖跳線、網路線、C13/C14 電源線、光纖清潔筆
- [ ] 裝置：筆電與電源、USB 開機碟（OS ISO、驅動）、Console 線（USB 轉 RJ45／DB9）、USB 網卡

## 1. 到貨與上架

- [ ] 對照訂單：機型、CPU、記憶體、硬碟數量與容量、RAID 卡、網卡、電源數量
- [ ] 記錄**機器序號 / Service Tag**（寫進裝機紀錄）
- [ ] 上機櫃：滑軌、理線、雙電源分別接到不同 PDU
- [ ] 記錄裝在第幾 U；加裝記憶體／硬碟時照 [記憶體插法](../hardware/memory-population/index.md)、[硬碟與背板](../hardware/drives-and-bays/index.md)

## 2. BMC 管理介面（iDRAC / iLO / IPMI / XCC）

- [ ] 設定 BMC 固定 IP
- [ ] 修改預設密碼，存進密碼管理工具
- [ ] 確認可從管理網段登入 Web 介面與虛擬主控台

## 3. 韌體

- [ ] 記錄目前 BIOS / BMC / RAID 卡 / 網卡韌體版本
- [ ] 依需要更新（先確認目標 OS 的相容性清單）

## 4. BIOS

- [ ] 開機模式 UEFI
- [ ] 虛擬化（VT-x/AMD-V、VT-d/IOMMU）— 要裝 PVE / ESXi / Hyper-V 時打開
- [ ] 電源設定（效能 / 節能）
- [ ] 時間

## 5. RAID

- [ ] 依用途決定 RAID 等級（OS：RAID 1；資料：RAID 5/6/10）
- [ ] 是否保留 Hot Spare
- [ ] 等初始化（Initialize / Background Init）完成或確認可邊跑邊裝

## 6. 作業系統

- [ ] 安裝媒體：虛擬媒體掛 ISO 或 USB
- [ ] 安裝過程是否需要載入 RAID 驅動
- [ ] 安裝後驅動 / 廠商套件（Dell DSU、HPE SPP 等）
- [ ] 主機名稱、IP、DNS、NTP、時區
- [ ] 系統更新

## 7. 網路

- [ ] 網卡對應的實體 Port 與 Switch Port 對照
- [ ] 光纖兩端模組種類一致、Link 燈亮、速度正確
- [ ] Bonding / Teaming、VLAN
- [ ] 測試：Ping 閘道、DNS 解析、對外連線

## 8. 驗收與交接

- [ ] 拔一顆電源 / 一條網路線測試備援（有需要時）
- [ ] BMC 告警通知（Email / SNMP）
- [ ] 截圖：系統資訊、RAID 狀態、網路設定
- [ ] 寫完裝機紀錄，連結到機型頁
