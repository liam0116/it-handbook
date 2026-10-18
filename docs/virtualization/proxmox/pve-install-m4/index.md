---
sidebar_position: 1
sidebar_label: "1. PVE 安裝（Mac M4 + UTM）"
tags: [proxmox, pve, utm, lab]
---

# Mac mini M4 安裝 PVE：簡明實作筆記

> **目的：** 在家使用免費 UTM 建立一台 PVE，理解每個設定，留下主管看得懂的操作紀錄。  
> **設備：** Mac mini M4／16 GB RAM；Windows 電腦不參與。  
> **本次結果：** PVE Web UI 已成功登入；APT 免費來源已能讀取；Tailscale 已安裝、開機自啟，但**是否完成登入及異地連線仍待驗證**。

## 1. 先準備 UTM 和 PVE ISO

在 Mac 上安裝免費 UTM，下載 ARM64 版本的 PVE 安裝 ISO。

1. [UTM 官方網站](https://mac.getutm.app/)：下載官網免費版。
2. [Proxmox VE 9.2 ARM64 官方 ISO](https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso/for-arm64-proxmox-ve-9-2-iso-installer)：確認檔名有 `arm64`，不是一般 x86 ISO。

**為什麼用 ARM64？** Mac M4 是 ARM 架構，使用相同架構的 ISO 才能讓 UTM 選 `Virtualize`，不必走較慢的 x86 模擬。

![Mac 規格](images/01-Mac規格.png)
## 2. 在 UTM 建立 PVE 虛擬機

UTM → **Create a New Virtual Machine → Virtualize（虛擬化） → Linux** → 選剛下載的 ARM64 ISO。

| 設定 | 這次用的值 | 白話說明 |
|---|---:|---|
| CPU | 4 核 | 分給 PVE 使用的處理器資源 |
| 記憶體 | 8192 MB（8 GB） | Mac 另外保留約 8 GB |
| 硬碟 | 80 GB | PVE 系統和日後的 Lab 資料 |
| 網路 | macOS Shared Network | 讓 PVE 借用 Mac 的網路上網 |
| 網卡 | VirtIO | 適合 Linux 的虛擬網卡 |

儲存設定後，啟動 UTM 虛擬機。**ISO 是安裝光碟；80 GB VirtIO 硬碟才是真正裝 PVE 的地方。**

1. 點擊 Create a New Virtual Machine（建立新虛擬機）

![UTM 建立 VM](images/02-UTM建立VM.png)
2. 點擊 Virtualize（虛擬化）

![UTM 建立 VM](images/02.1-UTM建立VM.png)
3. 點擊 Linux

![UTM 建立 VM](images/02.2-UTM建立VM.png)
4. UTM CPU、RAM、Disk、ISO 設定

![UTM 建立 VM](images/02.3-UTM建立VM.png)
![UTM 建立 VM](images/02.4-UTM建立VM.png)
![UTM 建立 VM](images/02.5-UTM建立VM.png)
![UTM 建立 VM](images/02.6-UTM建立VM.png)
![UTM 建立 VM](images/02.7-UTM建立VM.png)
5. UTM 網路設定

![UTM 建立 VM](images/02.8-UTM建立VM.png)
## 3. 安裝 PVE：照畫面走

### 3-1 開始安裝

選 **Install Proxmox VE (Graphical)**，按 Enter。

![PVE 安裝選單](images/04-PVE安裝選單.png)
### 3-2 KVM 警告

當時出現 `No support for hardware-accelerated KVM virtualization detected`，按 **OK** 繼續安裝。

**意思：** PVE 目前沒拿到硬體加速的 KVM 功能；管理介面仍可學，但第二層 VM 功能和 HA 不能先假設可用。

![KVM 警告](images/05-KVM警告.png)
### 3-3 選擇安裝硬碟（Harddisk Options）

**用途：** 選擇 PVE 要安裝在哪顆硬碟，並決定系統、Swap 和 VM 的空間如何分配。

本次使用 UTM 建立的 **80 GB 虛擬硬碟**，不是 Mac mini 的實體硬碟。

**本次手動設定紀錄：**

| 欄位 | 本次設定 | 用途說明 |
|---|---|---|
| Target Harddisk | `/dev/vda (80.00 GiB)` | UTM 提供給 PVE 的安裝硬碟。 |
| Filesystem | `ext4` | Linux 常用的檔案系統，適合本次練習。 |
| hdsize | `80 GB` | PVE 要使用的虛擬硬碟容量。 |
| swapsize | `2 GB` | 交換空間：記憶體不足時，可暫時使用磁碟。 |
| maxroot | `20 GB` | PVE 系統根目錄 `/` 的最大容量。 |
| minfree | `4 GB` | 保留在 LVM 中、暫不分配的空間，方便之後調整。 |
| maxvz | 留空 | VM／容器磁碟的空間上限，由安裝程式依其他設定計算。 |

**一定要手動填每一欄嗎？** 不用。第一次練習時，只需確認目標硬碟為 `/dev/vda (80.00 GiB)`、Filesystem 為 `ext4`、`hdsize` 為 `80 GB`；`swapsize`、`maxroot`、`minfree`、`maxvz` 可以全部留空，使用安裝程式預設配置。本次截圖中的 `2／20／4 GB` 是手動配置範例，**不是安裝必要條件**。

**操作：** 設定完成後按 **OK → Next**。安裝會清除所選硬碟上的資料，務必確認選的是 UTM 虛擬硬碟。

**本次截圖（手動填入 2／20／4 GB）：** 圖片位於 `images/06-硬碟分割.png`；調整下方 `width` 數值即可修改顯示大小。

![硬碟分割設定](images/06-硬碟分割.png)
### 3-4 地區和鍵盤

- Country：Taiwan
- Time zone：Asia/Taipei
- Keyboard：U.S. English

![地區和時區](images/05-地區時區.png)
### 3-5 設定管理員

- Password / Confirm：自訂 root 管理密碼，兩格相同。
- Email：用來接收管理通知；預設 `mail@example.invalid` **不是能收信的地址**。正式客戶應使用客戶或公司指定的管理信箱。真正寄通知仍需要郵件傳送設定。

![管理員密碼與 Email](images/07-管理員密碼.png)
### 3-6 設定管理網路

**下面是這次 UTM Lab 的實際畫面值，不是所有機器都照抄：**

| 欄位 | 這次的值 | 用途 |
|---|---|---|
| 管理網卡 | `nic0` | PVE 對外使用的虛擬網卡 |
| 主機名稱 | `pve01.home.arpa` | 建議的本地完整名稱；實際主機名稱以安裝結果為準 |
| 管理 IP | `192.168.64.2/24` | 瀏覽器連入 PVE 的地址；`/24` = `255.255.255.0` |
| Gateway | `192.168.64.1` | UTM Shared Network 的出口 |
| DNS | `192.168.64.1` | 解析網域名稱 |
| Pin interface names | 勾選 | 讓網卡名稱比較穩定 |

![PVE 網路設定](images/08-管理網路.png)
### 3-7 確認並安裝

核對硬碟、IP、主機名稱後按 **Install**，等進度完成。

![安裝摘要](images/09.1-安裝摘要.png)
![PVE 安裝進度](images/09-安裝進度.png)
## 4. 安裝完成卻又跳回安裝選單？

**原因：** UTM 仍掛載 ISO，重新開機又從安裝光碟啟動，**不一定是安裝失敗**。

![重複進入 ISO 安裝選單](images/10-ISO重複啟動畫面.png)
**做法：** 停止 UTM 虛擬機 → 開啟該 VM 設定 → 找到掛載 ISO 的 USB／CD/DVD 裝置 → 點「**清除**」→ 儲存 → 重新啟動。**不要刪除 80 GB VirtIO 系統硬碟。**

![UTM 清除 ISO](images/11-UTM退出ISO.png)
## 5. 登入 PVE，確認安裝成果

在 Mac 瀏覽器開：**`https://192.168.64.2:8006`**。

| 欄位 | 填什麼 |
|---|---|
| 帳號 | `root` |
| 密碼 | 安裝時設定的密碼 |
| 領域 | Linux PAM (`root@pam`) |

**PAM 與 PVE Realm 差別：** PAM 用 Linux 系統帳號；PVE Realm 是 PVE 自己管理的帳號。主管要看時，另外建立有適當權限的展示帳號，不要共用 root。

![PVE 登入介面](images/12-PVE登入.png)
**第一次登入跳「目前沒有技術支援合約」是正常的：** 這代表沒購買企業訂閱，按確定即可，不是試用期到期。

![PVE 首次登入](images/13-PVE管理介面.png)
![PVE 節點摘要](images/07-節點摘要.png)
![儲存清單](images/08-儲存清單.png)
## 6. `apt update` 為什麼失敗？怎麼修好？

當時你執行 `apt update`，Debian 可以正常連線，但 PVE 和 Ceph 的 **Enterprise 來源回傳 401 Unauthorized**：

![apt update 401 錯誤](images/14-apt更新失敗.png)
**原因：** Enterprise 更新庫要有有效付費訂閱。`apt update` 是更新「套件清單」，**不等於**升級所有套件。

**免費來源是不是官方的？是。** `pve-no-subscription` 是 Proxmox **官方提供**的免費更新來源，適合個人 Lab；正式客戶環境應遵循其維運與訂閱政策。

- [Proxmox 官方管理指南（PDF）](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)：搜尋 **Package Repositories → Proxmox VE No-Subscription Repository**，有設定說明及範例。
- [Proxmox 官方套件伺服器](https://download.proxmox.com/debian/pve/)：可看到 `download.proxmox.com` 確實為官方網域。

![官方免費來源的文件](images/09-官方免費來源.png)
### 6-1 先看來源、備份

```bash
ls /etc/apt/sources.list.d/
mkdir -p /root/apt-backup
cp -a /etc/apt/sources.list.d/. /root/apt-backup/
```

### 6-2 停用 Enterprise（有看到檔案才編輯）

```bash
nano /etc/apt/sources.list.d/pve-enterprise.sources
nano /etc/apt/sources.list.d/ceph.sources
```

在**各自的 Enterprise 來源區塊**加入 `Enabled: no`，存檔。

若你的環境是 `.list` 格式，這是另一種 APT 設定格式，可能出現在其他版本或既有環境中。應改為註解掉對應 Enterprise 那一行；**不要直接無差別覆寫檔案**。
例如：
```bash
deb https://enterprise.proxmox.com/debian/pve trixie pve-enterprise
```
這種格式沒有 Enabled: no，而是在該行最前面加上 #：
```bash
# deb https://enterprise.proxmox.com/debian/pve trixie pve-enterprise
```

### 6-3 設定官方免費庫

先檢查是否已存在，避免重複：

```bash
grep -R -n 'pve-no-subscription' /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null
```

如果還沒有，建立：

```bash
nano /etc/apt/sources.list.d/proxmox.sources
```

填入（**PVE 9 / Debian Trixie** 的來源格式）：

```text
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

Ceph 目前不用，先停用它的 Enterprise 來源即可。

### 6-4 驗證

```bash
apt update
```

成功時會看到 `download.proxmox.com/debian/pve trixie InRelease` 正常讀取，而 Enterprise 的 401 不再出現。

---

## 7. 額外課題：Tailscale（正常安裝 PVE 不必做）

**為什麼這次要加？** 你想從外面安全連回家裡 PVE。Tailscale 建立私人 VPN，**不必把路由器的 PVE 8006 埠直接公開在網際網路上**；不過其他人能不能連，仍要依帳號分享與權限設定。

```text
外面的筆電／手機（已授權 Tailscale）
               │ 私人 VPN
               ▼
家裡 Mac mini（保持開機）
  └─ UTM 裡的 PVE（保持運作）
        └─ https://<PVE 的 Tailscale IP>:8006
```

**這不是每個客戶都需要的功能。** 正式客戶部署前，應先經過客戶資安及網管批准，且確認 Tailscale 的使用條款與方案。

**本次已實際執行的安裝指令：**

```bash
curl -fsSL https://tailscale.com/install.sh | sh
systemctl enable --now tailscaled
systemctl is-enabled tailscaled
systemctl is-active tailscaled
tailscale status
```

結果：`enabled`、`active`，但當時 `tailscale status` 顯示 **Logged out**，意即**已裝好但還沒證實完成登入**。

**首次登入與驗證：**

```bash
tailscale up                     # 第一次會提供登入網址
tailscale status                 # 授權後確認狀態
tailscale ip -4                  # 查看 100.x.x.x 位址
```

外面的設備也安裝、登入獲授權後，才可使用 `https://<實際 IP>:8006`。`systemctl enable` 只負責 **PVE 開機時啟動 Tailscale**；Mac 關機、睡眠或 UTM 停止，外部仍連不到。

- [Tailscale 官方 Linux 安裝說明](https://tailscale.com/kb/1031/install-linux)
- [Tailscale 官方裝置分享說明](https://tailscale.com/kb/1084/sharing)
