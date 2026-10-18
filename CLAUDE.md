# IT 知識庫：整理筆記的規則（給 Claude 看）

這是 Docusaurus 文件網站。使用者會把原始筆記（Markdown、純文字、截圖）丟進 `_inbox/`，或指定某個資料夾，請你整理進 `docs/`。
**目標是讓新筆記看起來跟現有筆記同一套規則**，不要自創新的目錄、格式或風格。

使用者寫作規則的完整版在 `docs/guide/how-to-write.md`（給人看）；本檔是給你的操作規範，兩者有衝突時以 `how-to-write.md` 為準，並提醒使用者同步。

## 整理流程

1. **先讀完原始資料**（文字與每張圖片），再動手。
2. **決定放哪裡**（見「目錄架構」）。先查 `docs/` 有沒有同主題或同機型的頁面：
   - 同一台機器／同一主題的補充 → 合併進現有頁面。
   - 新機型、新主題、新的 Lab → 開新資料夾。
   - 放哪裡不明確、或需要新增**第一層分類**時，先問使用者，不要自己開。
3. **轉換內容**（見「格式」「寫作風格」）。只重新整理原始內容，**不要編造**原文沒有的指令、數值或驗證結果；缺的資訊用 📷 待補框或直接問使用者。
4. **圖片**：複製到該筆記的 `images/`，依出現順序重新編號命名（見「圖片」）。
5. **檢查機密並遮蔽**（見「不能放進來的東西」「遮蔽規則」）：IP、帳號、序號換成範例值，截圖打馬賽克；有疑慮就先拿掉並告訴使用者。
6. **更新索引**（見「新增筆記後要同步的地方」）。
7. **驗證 build**（見「驗證」）。
8. **不要修改或刪除原始檔案**（`_inbox/` 內的檔案、或網站外的原始筆記資料夾）。整理完後告訴使用者可以自行清掉。

## 目錄架構

```text
docs/
├── intro.md                      首頁（含「目前已有的紀錄」清單）
├── guide/                        寫作規則、範本（position 1）
├── checklists/                   不分廠牌的通用流程（position 2）
├── servers/<廠牌>/<型號>/          一個機型一個資料夾（position 3）
├── storage/<廠牌>/<型號>/          NAS / SAN（position 4）
├── virtualization/<平台>/<主題>/   PVE / ESXi / Hyper-V（position 5）
├── os/                           作業系統（position 6）
├── network/                      網路設備（position 7）
└── troubleshooting/              問題排除；overview.md 是「問題索引」表（position 8）
```

- 每篇筆記 = **一個資料夾**，內含 `index.md` 和 `images/`。
- 資料夾名稱：**英文小寫 + 連字號**（`r750`、`dl380-gen11`、`rs1221rp-plus`、`nfs-storage`），因為會變成網址。不要用中文、空格、`+`。
- 新增廠牌／平台這一層資料夾時，要放 `_category_.json`，格式照現有的抄：

  ```json
  {
    "label": "Proxmox VE",
    "position": 1,
    "link": {
      "type": "generated-index",
      "description": "一句話說明這個分類放什麼。",
      "slug": "/category/virtualization-proxmox"
    }
  }
  ```

  `slug` 用 `/category/<上層>-<本層>`，不可和現有的重複。
- 未來可能加入非裝機類的學習資料。若內容不屬於上面任何分類，**先問使用者**要新增哪個第一層分類（名稱、排序），再建立。

## 格式

### Front matter

```md
---
sidebar_position: 2
sidebar_label: "2. Debian NFS 儲存"
tags: [proxmox, nfs, debian, lab]
---
```

- `sidebar_label`：側邊欄顯示的短名稱。
- **系列筆記**（有先後關係，例如 PVE 安裝 → NFS → iSCSI）：`sidebar_position` 與 `sidebar_label` 的編號要一致，標籤加引號；並在該分類 `_category_.json` 的 description 寫「請依編號依序閱讀」。新增一篇就接著編下一號。
- 非系列的機型／設備頁不加編號。
- `tags`：英文小寫、連字號，優先沿用既有標籤（用 `grep -rh "tags:" docs` 查）：廠牌（`dell`、`synology`、`proxmox`）、技術（`raid5`、`nfs`、`iscsi`、`lvm`）、類型（`lab`、`checklist`）。

### 標題層級

- 一篇只有一個 `#` 大標，例如 `# Debian Storage + NFS Lab｜簡明實作筆記`。
- 步驟用編號：`## 1. Lab 目標與架構`、`### 2-1. 下載 ISO`、`### 2-2. UTM 建立 VM`。
- 右側目錄會列出 `##`／`###`，標題要短、看得出這節在做什麼。

### 開頭摘要

大標下方用引言區塊交代背景，參考現有筆記：

```md
> **目的：** 在家使用免費 UTM 建立一台 PVE，理解每個設定。
> **環境：** Mac mini M4（16 GB）、UTM、PVE 9.2 ARM64。
> **本次結果：** PVE Web UI 已成功登入；Tailscale **是否完成異地連線仍待驗證**。
```

系列筆記第 2 篇起加一句接續說明並附連結，例如「接續 [第 1 份：PVE 安裝](../pve-install-m4/index.md)」。
裝機紀錄類（例如 Synology）則用「設定日期」清單 + 「設定總覽」表格開頭。

### 連結

- 站內連結用**相對路徑指向 .md 檔**：`[第 1 份：PVE 安裝](../pve-install-m4/index.md)`、`[寫作規則](../../../guide/how-to-write.md#待補的圖片)`。
- 連結或圖片壞掉，build 會直接失敗（`onBrokenLinks: 'throw'`），這是刻意的。

### 提示框

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

可加標題：`:::tip[補圖方式]`。

### 架構圖

網站已啟用 Mermaid（`@docusaurus/theme-mermaid`），原始筆記的 ` ```mermaid ` 區塊直接保留即可。節點超過 5～6 個時，用 `subgraph` 依主機分組並分列（參考 `iscsi-lvm-storage/index.md` 第 1 節），避免單列過長導致字太小；不要再附「預覽器不支援時的文字版」。

### 指令

放在 code block 並標語言（`bash`、`ini`、`powershell`）；指令在哪台機器執行要寫清楚，可在 code block 內用註解：

```bash
# 在 PVE Shell 執行
pvesm status
```

## 圖片

- 一律用 Markdown 語法、相對路徑：`![PERC 建立 RAID 1](images/02-PERC建立RAID.png)`。
- **不要**用 `<img src="..." width="...">`（不會被打包，也不需要寬度）。原始筆記若是 `<img>`，轉成 `![alt](path)`，`alt` 用原本的 alt 文字。
- 網站 CSS 會自動限制大小（最寬 640px、最高 560px）並支援點擊放大，**不要**縮圖或加尺寸。
- 檔名：兩位數編號 + 中文說明，例如 `03-RAID類型.png`。編號依在文章中出現的順序；補充到既有筆記時，從該資料夾現有的最大號往後編，不要撞號。
- 圖片直接放 `images/`，**不要**再開 `images/待補/` 之類的子資料夾。
- `alt` 文字要有意義（點擊放大時會顯示成說明）。

### 待補的圖片

原始筆記提到「要截圖但還沒有圖」時，在該步驟下方放：

```md
:::note[📷 待補截圖]
PVE Shell 執行 `pvesm status`，確認 `nfs-lab active`。

檔名：`images/14-PVE-NFS-active.png`　補好後把這整個框換成：`![PVE NFS active](images/14-PVE-NFS-active.png)`
:::
```

- 不要用 HTML 註解（`<!-- ... -->`）藏待補圖。
- 有待補框的筆記，開頭加一個簡短的 `:::tip[補圖方式]`，連到 `how-to-write.md#待補的圖片`（照 `nfs-storage/index.md` 的寫法）。沒有待補框就不要加。
- 使用者補上截圖後，把整個框換成框內那一行圖片語法。

## 寫作風格

- **繁體中文（台灣用語）**；技術名詞、指令、UI 按鈕保留原文，必要時括號附中文：「點擊 Create a New Virtual Machine（建立新虛擬機）」。
- 句子短、口語、直接；重點用**粗體**；設定值、對照用表格（例如「設定｜這次用的值｜白話說明」）。
- 操作步驟寫成「在哪裡 → 點什麼 → 選什麼」，例如 `UTM → Create a New Virtual Machine → Virtualize → Linux`。
- 清楚區分**已完成／已驗證**和**尚未執行／待驗證**，不要把計畫寫成結果。
- 中文與英文、數字之間可留半形空格；全形標點（，。：「」）。
- 保留原始筆記的實際數值（版本、容量、Lab 的 IP 規劃），只改結構和措辭；不確定的地方問使用者，不要猜。公司／客戶環境的 IP、帳號、序號例外，一律依「遮蔽規則」處理。
- 刪掉原始筆記中對網站讀者沒有意義的內容（例如「本資料夾結構說明」、「怎麼在 Typora 開圖」之類的檔案操作說明）。

## 不能放進來的東西

- 密碼、金鑰、授權碼、Token、VPN 設定檔、裝置分享連結：直接刪掉，不用另外寫「密碼不記錄於本網站」之類的說明。
- 客戶個資。
- 檔名含「帳密」、`password` 的原始檔不要複製進 `docs/`（`.gitignore` 也有擋）。
- 截圖若看得到密碼、金鑰、授權網址，**不要放上去**，告訴使用者需要先處理。

## 遮蔽規則（IP、帳號、序號）

整理**公司或客戶實際設備**的筆記時，下列資訊預設一律遮蔽，**不用先問**；整理完在回報中列出改了哪些。

| 資訊 | 文字改成 | 截圖 |
|---|---|---|
| 公司／客戶 IP（設備、閘道器、管理介面網址） | 範例 IP，後面標「（範例）」：設備 `192.168.1.1`、閘道器 `192.168.0.254`，依需要往下編 | 打馬賽克 |
| 管理員／使用者帳號 | `test`（多個帳號用 `test1`、`test2`…） | 用 `retext.cjs` 改寫成同一個範例帳號 |
| 設備序號（產品、硬碟、主機板…） | `EXAMPLE-SN-01`、`EXAMPLE-SN-02`…；單一設備可用 `EXAMPLE-SN-NAS01` 這類名稱；表格欄位標題加「（範例）」 | 打馬賽克 |

- **範例 IP 要和原本的網段結構一致**：保留子網路遮罩，範例 IP 和閘道器要落在同一個網段內（例如 /17 就選 `192.168.1.1` 和 `192.168.0.254`），讓設定仍然合理。
- **不用遮的**：子網路遮罩、公開 DNS（`8.8.8.8`、`1.1.1.1`）、型號、韌體／DSM 版本、容量、溫度。
- **Lab 環境不用遮**：家用 Lab 的虛擬網段（例如 UTM 的 `192.168.64.x`）、Lab 自訂的 IQN，不屬於公司資訊。
- 有遮蔽 IP 的頁面，開頭資訊清單加一行：「IP 位址：本頁為**範例值**，截圖中的 IP 已遮蔽；實際位址請見公司內部紀錄」。
- 若看起來是**其他公司的名稱**（帳號、主機名稱、網域），同樣換成範例，並提醒使用者。

### 截圖的處理方式

1. 找出敏感資訊：每張截圖都用 OCR 掃描，**再用眼睛逐張看**（OCR 會漏掉小字、網址列）：

   ```bash
   tesseract <圖.png> - --psm 11 tsv   # 第 7–10 欄是 left / top / width / height
   ```

2. 打馬賽克（用隨機灰階方塊蓋住，無法還原；**不要用一般的模糊或縮放馬賽克**，數字在固定字型下可被比對還原）：

   ```bash
   node scripts/mosaic.cjs <輸入.png> <輸出.png> '[[x,y,寬,高], ...]' 8
   ```

   範圍只框文字本身（不要蓋到表格線、欄位框）；表格欄位逐列框，保留分隔線。

3. 帳號這類要換成範例文字的：

   ```bash
   node scripts/retext.cjs <輸入.png> <輸出.png> x y 寬 高 "test" 文字X 基線Y 字級px
   ```

   對**原始圖**執行，不要在已經打馬賽克的區域上執行（背景色會取錯）。

4. 處理完：用 Read 看一次成品，再用 OCR 確認原始值已經掃不到。
5. **原始檔不要動**（網站外的原始筆記資料夾、`_inbox/`）。

### 遮蔽後的檢查

- `grep -r` 搜尋 `docs/` 確認原始值都不見了。
- 重新 build 後搜尋正式版檔案：`docker compose exec -T docs sh -c 'grep -rlE "<原始值>" /usr/share/nginx/html | grep -v "\.pdf$"'`。
- **整本 PDF 一定要重新匯出**（舊的 `static/pdf/handbook.pdf` 仍含原始值，等於外洩），匯出後抽出文字確認原始值不在裡面。

## 新增筆記後要同步的地方

- `docs/intro.md` 的「目前已有的紀錄」清單：加一行連結（裝機紀錄附日期）。
- `docs/troubleshooting/overview.md` 的「問題索引」表：筆記中有「錯誤訊息 → 原因 → 解法」的段落，就加一列，連回該筆記的章節。
- 系列筆記：上一篇結尾若有「下一份筆記」段落，補上新篇的連結；分類 description 的閱讀順序也一併更新。

## 驗證

- 使用者通常開著 Docker：`docs-dev`（編輯模式，http://localhost:3000，存檔自動更新）與 `docs`（正式版，http://localhost:8080）。
- 先用 `docker compose ps` 看有沒有在跑。確認 build 用：

  ```bash
  docker compose up -d --build docs   # 正式版重新打包；壞連結／壞圖會讓 build 失敗
  ```

- **注意**：在本機跑 `npm run build` 會覆寫 `.docusaurus/`，而 `docs-dev` 容器透過 volume 共用這個資料夾，會讓 3000 壞掉。若本機 build 過，之後執行 `docker compose restart docs-dev`。
- 3000 port 被 `docs-dev` 佔用，本機要開伺服器時用別的 port（例如 `npm run serve:pdf` 是 3100）。

## 整本 PDF

內容有變動時，提醒使用者 PDF 尚未更新，或在使用者同意後重新產生：

```bash
npm run build
npm run serve:pdf      # 背景執行，port 3100
npm run pdf            # 輸出 static/pdf/handbook.pdf
npm run build          # 再 build 一次讓新 PDF 進網站
docker compose restart docs-dev && docker compose up -d --build docs
```

## 完成後回報

用簡短清單告訴使用者：放到哪個路徑、新增／合併了哪些頁面、圖片數量與待補框數量、同步了哪些索引、拿掉了哪些機密或不確定的內容、build 是否通過、PDF 是否需要重匯。
