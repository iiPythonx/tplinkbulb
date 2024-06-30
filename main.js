// Copyright (c) 2024 iiPython

// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
if (require("electron-squirrel-startup")) app.quit();

const TPLSmartDevice = require("tplink-lightbulb");
const path = require("node:path");

// Initialization
const source = path.join(__dirname, "src");

// Handle electron creation
const createWindow = async () => {

    // Scan and save our lightbulb
    const light = await (new Promise(resolve => {
        const scan = TPLSmartDevice.scan()
            .on("light", (light) => { scan.stop(); resolve(light); });
    }));

    // Setup and configure window
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 400,
        webPreferences: {
            preload: path.join(source, "preload.js")
        }
    });
    mainWindow.setMenu(null);
    mainWindow.setResizable(false);
    mainWindow.setMaximizable(false);

    // Handle IPC
    ipcMain.on("send-light-payload", (event, payload) => {
        switch (payload.type) {
            case "hsv":
                light.power(true, 0, {
                    color_temp: 0,
                    hue: Math.round(payload.hsv[0]),
                    saturation: Math.round(payload.hsv[1]),
                    brightness: Math.round(payload.hsv[2])
                });
            case "led":
                light.power(payload.on);
        }
    });
    ipcMain.handle("get-status", async () => {
        const status = await light.info();
        return {
            hsv: [ status.light_state.hue, status.light_state.saturation, status.light_state.brightness ],
            on: status.light_state.on_off
        };
    });

    // Load html
    mainWindow.loadFile(path.join(source, "index.html"));
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') app.quit();
});
