// 截圖打馬賽克：用隨機灰階方塊蓋住指定區域（看起來像馬賽克，但不含原始內容，無法還原）
// 用法：node scripts/mosaic.cjs <輸入.png> <輸出.png> '[[x,y,寬,高], ...]' [方塊大小=8]
// 座標可用 OCR 找：tesseract <圖.png> - --psm 11 tsv（第 7–10 欄是 left/top/width/height）
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const [, , inp, out, rects, block = '8'] = process.argv;
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(inp).toString('base64');
  const res = await page.evaluate(
    async (data, rects, block) => {
      const img = new Image();
      img.src = data;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0);
      for (const [rx, ry, rw, rh] of rects) {
        for (let by = ry; by < ry + rh; by += block) {
          for (let bx = rx; bx < rx + rw; bx += block) {
            const v = 110 + Math.floor(Math.random() * 110);
            g.fillStyle = `rgb(${v},${v},${v})`;
            g.fillRect(bx, by, Math.min(block, rx + rw - bx), Math.min(block, ry + rh - by));
          }
        }
      }
      return c.toDataURL('image/png').split(',')[1];
    },
    data,
    JSON.parse(rects),
    Number(block),
  );
  fs.writeFileSync(out, Buffer.from(res, 'base64'));
  await browser.close();
})();
