import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as path from "node:path";
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: {
      unpack: "*.{node,dll,so}"
    },
    name:"Sourcepool",
    icon:"./src/shared/assets/logo/sourcepool-icon",
    extraResource: [
      "./src/shared/assets/logo/"
    ]
  },
  rebuildConfig: {},
  makers: [
    
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
          section: "games",
          // desktopTemplate: path.resolve("./src/shared/UbuntuDesktopTemplate.desktop")
        }
      }
    }
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html:'./src/reactapp/public/index.html',
            js: './src/electronapp/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/electronapp/preload.ts',
            },
          },
        ],
      },
    }),
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

export default config;
