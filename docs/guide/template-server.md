---
sidebar_position: 2
sidebar_label: 範本：伺服器機型
---

# 範本：伺服器機型

複製下面整段到 `docs/servers/<廠牌>/<型號>/index.md`，沒有的欄位刪掉即可。

````md
---
sidebar_label: PowerEdge R750
tags: [dell, 2u, idrac9]
---

# Dell PowerEdge R750

## 規格摘要

| 項目 | 內容 |
| --- | --- |
| 尺寸 | 2U |
| CPU | |
| 記憶體 | |
| RAID 卡 | 例：PERC H755 |
| 網卡 | |
| 管理介面 | 例：iDRAC9，預設 IP / 帳號（密碼不寫） |
| 支援 OS | 例：Windows Server 2022、RHEL 9、ESXi 8、PVE 9 |

## 裝機前準備

- [ ] 韌體版本 / 要更新的項目
- [ ] 需要的驅動（RAID、網卡）
- [ ] 安裝媒體（ISO、USB、虛擬媒體）

## BIOS / BMC 設定

## RAID 設定

## 作業系統安裝（各 OS 需要的驅動）

| OS | 需要額外驅動？ | 備註 |
| --- | --- | --- |
| Windows Server 2022 | | |
| ESXi 8 | | |
| PVE 9 | | |

## 驗收

## 踩過的坑

## 相關紀錄
````
