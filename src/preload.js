// Copyright (c) 2024 iiPython

// Modules
const { contextBridge, ipcRenderer } = require('electron/renderer')

// Handle bridging
contextBridge.exposeInMainWorld("_api", {
    sendLightPayload: (payload) => ipcRenderer.send("send-light-payload", payload),
    getStatus: () => ipcRenderer.invoke("get-status")
});
