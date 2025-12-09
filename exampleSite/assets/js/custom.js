function sendMessage(message) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}


window.addEventListener('theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
  const giscus = document.getElementById('giscus');
  if (giscus) {
  giscus.dataset.theme = e.detail.theme === 'dark' ? 'dark' : 'light';
  }
  sendMessage({
    setConfig: {
      theme: e.detail.theme === 'dark' ? 'dark' : 'light',
    }
  });
});


const setMoriConfig = window['setMoriConfig'];
const getMoriConfig = window['getMoriConfig'];
const origGuessImgSize = getMoriConfig().guessImgSize;
setMoriConfig({
  guessImgSize: (img) => {
    console.log("new guessImgSize");
    return origGuessImgSize(img);
  }
})
