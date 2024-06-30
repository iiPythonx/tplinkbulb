// Copyright (c) 2024 iiPython

// Modules
import ReinventedColorWheel from "https://cdn.jsdelivr.net/npm/reinvented-color-wheel@0.4.0/es/reinvented-color-wheel.bundle.min.js";

// Fetch current status
(async () => {
    const status = await window._api.getStatus();

    // Setup event listening and color wheel
    new ReinventedColorWheel({
        appendTo: document.getElementById("wheel"),
        hsv: status.hsv,
        wheelDiameter: 200,
        wheelThickness: 20,
        handleDiameter: 16,
        wheelReflectsSaturation: true,
        onChange: (c) => {
            window._api.sendLightPayload({ type: "hsv", hsv: c.hsv });
        }
    });
    document.getElementById("switch").checked = status.on;
    document.getElementById("switch").addEventListener("change", (e) => {
        window._api.sendLightPayload({ type: "led", on: e.currentTarget.checked });
    });
})();
