---
sidebar_position: 0
sidebar_label: 問題索引
---

# 問題索引

一則問題一列；細節在原筆記或另開一頁 `troubleshooting/<問題>/index.md`。

| 症狀 / 錯誤訊息 | 環境 | 原因 | 解法在哪 |
| --- | --- | --- | --- |
| `apt update` 出現 401 Unauthorized | PVE（無訂閱） | 預設啟用 Enterprise 儲存庫 | [PVE 安裝 第 6 節](/virtualization/proxmox/pve-install-m4) |
| 安裝完成重開機又回到安裝選單 | PVE on UTM | ISO 仍掛載在虛擬光碟 | [PVE 安裝 第 4 節](/virtualization/proxmox/pve-install-m4) |
| 安裝時出現 KVM 警告 | PVE on Mac M4 UTM | 巢狀虛擬化限制 | [PVE 安裝 3-2](/virtualization/proxmox/pve-install-m4) |
| 光纖接上後 Link 燈不亮 | 光纖網卡／交換器 | 模組兩端不同種、單模多模混用、Tx/Rx 接反、原廠鎖 | [光纖、光模組與線材 第 6 節](../network/fiber-transceiver/index.md#link-down) |
| 開機後記憶體容量少算或被降頻 | 伺服器 | 插錯插槽、沒插到底、各通道支數不平均 | [記憶體插法](../hardware/memory-population/index.md) |
| BIOS／OS 看不到硬碟 | 伺服器 | 介面與背板不符、控制器未建 RAID 或未設 HBA、缺驅動、Foreign Configuration | [硬碟與背板 第 5 節](../hardware/drives-and-bays/index.md) |
