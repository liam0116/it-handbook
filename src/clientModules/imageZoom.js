// 點文件內的圖片 → 全螢幕放大檢視；點任意處或按 Esc 關閉
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  let overlay = null;

  const close = () => {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = '';
  };

  const open = (img) => {
    overlay = document.createElement('div');
    overlay.className = 'img-zoom-overlay';
    const big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.appendChild(big);
    if (img.alt) {
      const caption = document.createElement('div');
      caption.className = 'img-zoom-caption';
      caption.textContent = img.alt;
      overlay.appendChild(caption);
    }
    overlay.addEventListener('click', close);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  };

  document.addEventListener('click', (e) => {
    const img = e.target.closest?.('.markdown img');
    // 被連結包住的圖片維持原本的連結行為
    if (!img || img.closest('a')) return;
    e.preventDefault();
    open(img);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

export function onRouteDidUpdate() {
  document.querySelector('.img-zoom-overlay')?.click();
}
