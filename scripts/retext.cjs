// 截圖換字：用背景色蓋掉指定區域，再寫上新文字（例如把真實帳號改成 test）
// 用法：node scripts/retext.cjs <輸入.png> <輸出.png> x y 寬 高 "新文字" 文字X 基線Y 字級px
// 背景色取區域左上角像素，文字顏色取區域內最深的像素
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const [inp, out, ...rest] = process.argv.slice(2);
  const [x, y, w, h] = rest.slice(0, 4).map(Number);
  const text = rest[4];
  const [tx, ty, fontPx] = rest.slice(5, 8).map(Number);
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(inp).toString('base64');
  const res = await page.evaluate(
    async (data, x, y, w, h, text, tx, ty, fontPx) => {
      const img = new Image();
      img.src = data;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0);
      const px = g.getImageData(x, y, w, h).data;
      const bg = [px[0], px[1], px[2]];
      let dark = [255, 255, 255];
      let min = Infinity;
      for (let i = 0; i < px.length; i += 4) {
        const l = px[i] + px[i + 1] + px[i + 2];
        if (l < min) {
          min = l;
          dark = [px[i], px[i + 1], px[i + 2]];
        }
      }
      g.fillStyle = `rgb(${bg})`;
      g.fillRect(x, y, w, h);
      g.fillStyle = `rgb(${dark})`;
      g.font = `${fontPx}px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      g.fillText(text, tx, ty);
      return c.toDataURL('image/png').split(',')[1];
    },
    data, x, y, w, h, text, tx, ty, fontPx,
  );
  fs.writeFileSync(out, Buffer.from(res, 'base64'));
  await browser.close();
})();
