# wallet application 

## getting Start
パッケージマネージャはnpm/yarnを使用していますが他のものでも可能。（yarn v3以降未検証）
```
yarn
yarn vite
```
ビルドツールはViteを使用しています。
プラグインはフレームワークのVueとPWA化のためにVuePWAを使用しています。
また一部にNode.jsのAPIを使用しているためnode-stdlib-browserを使用しています。
```js
...
    {
      ...inject({
        global: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'global',
        ],
        process: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'process',
        ],
        Buffer: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'Buffer',
        ],
      }),
      enforce: 'post',
    },
  ],
...
```
