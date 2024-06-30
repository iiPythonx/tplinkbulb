const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
    packagerConfig: {
        asar: true,
        icon: "assets/icon"
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                authors: "iiPython",
                description: "Basic TP-Link lightbulb controller written with Electron.",
                iconUrl: "https://github.com/iiPythonx/tplinkbulb/raw/main/assets/icon.ico",
                name: "TP-Link Bulb UI"
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["linux", "darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                options: {
                    categories: ["Utility"],
                    description: "Basic TP-Link lightbulb controller written with Electron.",
                    maintainer: "iiPython",
                    homepage: "https://github.com/iiPythonx/tplinkbulb"
                }
            },
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {
                options: {
                    categories: ["Utility"],
                    description: "Basic TP-Link lightbulb controller written with Electron.",
                    homepage: "https://github.com/iiPythonx/tplinkbulb"
                }
            },
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },

        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};
