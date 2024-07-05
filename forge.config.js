const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require("node:path");

module.exports = {
  packagerConfig: {
    asar: {
      unpack: "*.{node,dll,so}"
    },
    name:"Sourcepool",
    icon:"./src/shared/assets/logo/sourcepool-icon",
    description: "A self-hosted content manager for TTRPG games.",
    productDescription: "A self-hosted content manager for TTRPG games.",
    extraResource: [
      "./src/shared/assets/logo/"
    ]
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {
    //     // Only need these if using electron-winstaller directly instead?? 
    //     // certificateFile: './cert.pfx', 
    //     // certificatePassword: process.env.CERTIFICATE_PASSWORD 
    //     name: "PatronSimulator",
    //     title: "Patron Simulator",
    //     setupIcon: "./src/assets/logo/patron-simulator.ico",
    //     icon: "./src/assets/logo/patron-simulator.ico",
    //     iconUrl: "https://bigfootds.github.io/Branding/assets/Patron%20Simulator/patron-simulator.ico"
    //   },
    // },
    {
      name: "@rabbitholesyndrome/electron-forge-maker-portable",
      config: {
        portable: {
          artifactName: "Sourcepool.exe",
        }
      }
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "BigfootDS",
          homepage: "https://bigfootds.com",
          bin: "Sourcepool",
          name: "bigfootds/sourcepool",
          productName: "Sourcepool",
          productDescription: "A self-hosted content manager for TTRPG games.",
          description: "A self-hosted content manager for TTRPG games.",
          icon: path.resolve("./src/shared/assets/logo/android-chrome-384x384.png"),
          packageCategory: ["Game"],
          categories: ["Game"],
          maintainer: "BigfootDS",
          section: "games",
          // desktopTemplate: path.resolve("./src/shared/UbuntuDesktopTemplate.desktop")
        }
      }
    },
    
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/reactapp/public/index.html',
              js: './src/backend/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/backend/preload.js',
              },
            },
          ],
        },
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: false,
    }),
    
  ],
};