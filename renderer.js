// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const ipc = require('electron').ipcRenderer

// Tell main process to show the menu when demo button is clicked
const contextMenuBtn = document.getElementById('context-menu')
contextMenuBtn.addEventListener('click', function () {
    ipc.send('show-context-menu')
})

//clipboard

const clipboard = require('electron').clipboard

const copyBtn = document.getElementById('copy-to')
const copyInput = document.getElementById('copy-to-input')

copyBtn.addEventListener('click', function () {
    if (copyInput.value !== '') copyInput.value = ''
    copyInput.placeholder = 'Copied! Paste here to see.'
    clipboard.writeText('Electron Demo!')
})