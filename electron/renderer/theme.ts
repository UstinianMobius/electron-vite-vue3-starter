const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
        const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
        document.getElementById('default-theme').innerHTML = isDarkMode ? '暗黑模式' : '明亮模式'
    })

    document.getElementById('reset-system-mode').addEventListener('click', async () => {
        await ipcRenderer.invoke('dark-mode:system')
        document.getElementById('default-theme').innerHTML = '系统默认'
    })
})
