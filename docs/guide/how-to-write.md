---
sidebar_position: 1
---

# 寫作規則

## 目錄放哪裡

```text
docs/
├── checklists/            通用流程（不分廠牌）
├── servers/<廠牌>/<型號>/  一個機型一個資料夾
├── storage/<廠牌>/<型號>/
├── virtualization/<平台>/<主題>/
├── os/  network/  troubleshooting/
├── hardware/              硬體基礎（不分廠牌：記憶體、硬碟、機櫃電源）
```

每篇筆記**一個資料夾**，裡面放 `index.md` 和 `images/`：

```text
docs/servers/dell/r750/
├── index.md
└── images/
    ├── 01-BIOS設定.png
    └── 02-PERC建立RAID.png
```

## 命名

- 資料夾用**英文小寫 + 連字號**：`r750`、`dl380-gen11`、`rs1221rp-plus`（網址會用到，避免中文和 `+`）。
- 圖片可以用中文，前面加兩位數編號：`03-RAID類型.png`。

## 系列筆記的閱讀順序

同一個資料夾內有前後關係的筆記（例如 PVE 安裝 → NFS → iSCSI），在開頭的 front matter 同時設定排序與編號：

```md
---
sidebar_position: 2
sidebar_label: "2. Debian NFS 儲存"
---
```

`sidebar_position` 決定側邊欄的順序，`sidebar_label` 前面的編號讓讀者知道要第幾個看。編號開頭的標籤要加上引號。

## 圖片

用 Markdown 語法，路徑相對於 `index.md`：

```md
![PERC 建立 RAID 1](images/02-PERC建立RAID.png)
```

圖片會自動縮到合適大小（最寬 640px、最高 560px）並置中，**點圖片可全螢幕放大**，所以截圖直接用原尺寸即可，不用先縮小。方括號內的文字會顯示為放大時的說明。

:::warning
不要用 `<img src="..." width="...">`，Docusaurus 不會打包這種寫法的圖片，也不需要再指定寬度。
:::

### 網路上的圖片

沒有自己拍的照片時，可以用：

- **廠商官方文件的圖**（Dell、HPE、Lenovo 手冊、官方說明頁）：截圖或從 PDF 擷取，圖下寫文件名稱、章節或圖號，附官方連結。
- **Wikimedia Commons** 上的圖：圖下寫作者、來源連結和授權。

```md
![Dell R760 記憶體插槽位置](images/04-Dell-R760記憶體插槽位置.png)

*圖片來源：[Dell PowerEdge R760 Installation and Service Manual](https://www.dell.com/support/manuals/en-us/poweredge-r760/per760_ism_pub/)，Figure 180*
```

圖片著作權屬原廠商或原作者。之後有自己拍的照片，可以直接替換。

### 待補的圖片

還沒拍的圖，在該步驟下方放一個「📷 待補截圖」框，寫清楚要拍什麼、存成什麼檔名：

```md
:::note[📷 待補截圖]
PVE Shell 執行 `pvesm status`，確認 `nfs-lab active`。

檔名：`images/14-PVE-NFS-active.png`　補好後把這整個框換成：`![PVE NFS active](images/14-PVE-NFS-active.png)`
:::
```

補圖時：

1. 截圖存進這篇筆記的 `images/` 資料夾（跟其他圖片放一起），檔名照框內寫的。
2. 把整個框（從 `:::note` 到最後的 `:::`）換成框內那一行 `![...](images/...)`。
3. 編輯模式（3000）存檔就會更新；正式版（8080）要重新 `docker compose up -d --build`。

圖片路徑寫錯或檔案不存在時，build 會直接報錯，不會默默顯示破圖。

## 架構圖

用 ` ```mermaid ` 區塊畫，網站會自動轉成圖（淺色／深色模式都會配色）：

````md
```mermaid
flowchart LR
    A["Debian Storage"] -- "NFS" --> B["PVE"]
```
````

節點多時用 `subgraph` 依主機分組、分成幾列，避免全部排成一長串、字被縮得太小。不需要再另外附文字版。

## 提示框

```md
:::tip
小技巧
:::

:::warning
容易踩坑的地方
:::

:::danger
會造成資料遺失的操作
:::
```

## 標籤

在檔案開頭加 `tags`，之後可用標籤找同類機器：

```md
---
tags: [dell, raid1, windows-server-2022]
---
```

## 不能寫進來的東西

- 密碼、金鑰、授權碼、VPN 設定檔
- 客戶個資

公司或客戶設備的 **IP、帳號、序號**一律換成範例值，截圖打馬賽克：

| 資訊 | 改成 |
| --- | --- |
| IP | `192.168.1.1`（範例）、閘道器 `192.168.0.254`（範例） |
| 帳號 | `test` |
| 序號 | `EXAMPLE-SN-01`（範例） |

家用 Lab 的虛擬網段（例如 UTM 的 `192.168.64.x`）不用遮。截圖處理工具在 `scripts/`（`mosaic.cjs` 打馬賽克、`retext.cjs` 換字），用法見專案根目錄的 `CLAUDE.md`。
