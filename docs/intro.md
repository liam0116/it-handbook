---
slug: /
sidebar_position: 0
sidebar_label: 首頁
---

# IT 知識庫

這裡集中記錄在公司實際處理過的設備：**伺服器裝機、儲存設備、虛擬化平台、作業系統、網路設定與問題排除**。

## 怎麼找資料

| 我要找… | 去哪裡 |
| --- | --- |
| 某台機器怎麼裝、裝什麼 OS、要哪些驅動 | [伺服器（依廠牌／型號）](/category/servers) |
| NAS／SAN 設定（RAID、Hot Spare、Volume） | [儲存設備](/category/storage) |
| PVE／ESXi／Hyper-V | [虛擬化平台](/category/virtualization) |
| 每次裝機都要做的步驟 | [通用裝機流程](/checklists/server-deployment) |
| 某個錯誤訊息怎麼解 | [問題排除紀錄](/category/troubleshooting)，或用右上角搜尋 |

## 目前已有的紀錄

- [Synology RS1221RP+：RAID 5 + Hot Spare](/storage/synology/rs1221rp-plus)（2026-10-02）
- [Proxmox VE 安裝（Mac M4 + UTM）](/virtualization/proxmox/pve-install-m4)
- [PVE + Debian NFS 儲存](/virtualization/proxmox/nfs-storage)
- [PVE + iSCSI + LVM 儲存](/virtualization/proxmox/iscsi-lvm-storage)

## 新增筆記

照 [寫作規則](/guide/how-to-write) 複製範本：

- 新機型 → [伺服器機型範本](/guide/template-server)
- 單次裝機案件 → [裝機紀錄範本](/guide/template-deployment)

:::danger[不要放密碼]
帳號密碼、授權金鑰、客戶個資**一律不寫進這個網站**（網站和 git 都會留下紀錄）。只寫「密碼存放於 ○○ 密碼管理工具」。
:::
