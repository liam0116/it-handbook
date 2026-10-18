# IT 知識庫（Docusaurus）

公司裝機、儲存、虛擬化實作筆記與各類技術學習資料的文件網站。新主題直接在 `docs/` 下開新資料夾即可。

## 目錄

```text
it-handbook/
├── docs/                  ← 所有筆記都在這裡（Markdown）
│   ├── intro.md           首頁
│   ├── guide/             寫作規則、範本
│   ├── checklists/        通用裝機清單
│   ├── servers/           依廠牌 / 型號（dell、hpe、supermicro、lenovo…）
│   ├── storage/           NAS / SAN（synology/rs1221rp-plus…）
│   ├── virtualization/    PVE / ESXi / Hyper-V
│   ├── os/  network/  troubleshooting/
├── _inbox/                待整理的原始筆記（不進 git）
├── CLAUDE.md              給 Claude 的整理規則
├── docusaurus.config.js   網站設定
├── Dockerfile             正式版映像（build → nginx）
├── docker-compose.yml
└── static/pdf/handbook.pdf  匯出的整本 PDF（導覽列「PDF → 下載整本 PDF」）
```

新增筆記的規則見網站上的「使用說明 → 寫作規則」（`docs/guide/how-to-write.md`）。

要請 Claude 幫忙整理：把原始筆記和截圖丟進 `_inbox/`（不進 git、不上網站），再說「整理 _inbox 的筆記」。整理規則寫在 `CLAUDE.md`。

## 用 Docker 執行

```bash
# 正式版（打包成 nginx）→ http://localhost:8080
docker compose up -d --build

# 編輯模式（改 .md 存檔就自動更新）→ http://localhost:3000
docker compose --profile dev up docs-dev

# 停止
docker compose down
```

改完筆記後，正式版要重新 `docker compose up -d --build` 才會更新。

## 不用 Docker（本機有 Node 20+）

```bash
npm install
npm start          # 編輯模式 http://localhost:3000
npm run build      # 產生 build/，有壞掉的連結或圖片會直接報錯
```

## 匯出 PDF

```bash
npm run build
npm run serve:pdf  # 另開一個終端機視窗，讓它跑著（用 3100 port，避免跟 Docker 編輯模式的 3000 衝突）
npm run pdf        # 產生 static/pdf/handbook.pdf（含封面、目錄、書籤）
npm run build      # 再 build 一次，新的 PDF 才會進網站
```

筆記更新後記得重跑上面步驟，網站上的「下載整本 PDF」才會是最新版。

只要單一頁 PDF：網站右上角「PDF → 列印本頁／存成 PDF」，目的地選「另存為 PDF」。

## 用 git 管理與分享網頁

1. **只用 git 做版本管理（建議先做）**
   ```bash
   git init && git add . && git commit -m "初始版本"
   ```
2. **公司內部伺服器**：在內網一台有 Docker 的機器上 `git clone`（或 `git pull` 更新）後
   `docker compose up -d --build`，同事用 `http://<那台IP>:8080` 開。
3. **公司 GitLab / Gitea**：推上私有 repo，用 CI 自動 build 並部署到上述內部主機。
4. **GitHub Pages**：可以，但 **Pages 網站是公開的**（即使 repo 設私有，非 Enterprise 方案也一樣）。
   筆記內有內部 IP、序號，**不建議**放 GitHub Pages。若要用，需設定：
   ```bash
   SITE_URL=https://<帳號>.github.io BASE_URL=/<repo名稱>/ npm run build
   ```
