const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')
const img = document.getElementById('image')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
  img.src = filePath
})