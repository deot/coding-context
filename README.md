[ci-image]: https://github.com/deot/mcp/actions/workflows/ci.yml/badge.svg?branch=main
[ci-url]: https://github.com/deot/mcp/actions/workflows/ci.yml

[![build status][ci-image]][ci-url]

# deot/mcp

用于项目开发的仓库统一环境

所有的相关的开发环境，统一更新，升级时如果有多仓库，仅更新此仓库即可，无需同时更新太多依赖性，以追求最新且稳定的项目开发环境

> 需要依赖当前的`tsconfig.json`, `.eslintrc.cjs`等，这些配置项可以用`extends`导出
> 如果执行`dev`, `test`, `build`需要扩展，可以配置`*.config.ts`来进行扩展
> 具体可以参考以下`demo`

- [demo by @deot/mcp](https://github.com/deot/mcp-demo)
- [site by @deot/mcp](https://github.com/deot/site)

## Monorepo

[npm-cli-image]: https://img.shields.io/npm/v/@deot/mcp-cli
[npm-cli-url]: https://www.npmjs.com/package/@deot/mcp-cli

[npm-web-image]: https://img.shields.io/npm/v/@deot/mcp-web
[npm-web-url]: https://www.npmjs.com/package/@deot/mcp-web

[npm-uni-image]: https://img.shields.io/npm/v/@deot/mcp-uni
[npm-uni-url]: https://www.npmjs.com/package/@deot/mcp-uni

| 包名                        | 版本                                         | 说明                                     |
| ------------------------- | ------------------------------------------ | -------------------------------------- |
| [web](packages/web)     | [![npm][npm-web-image]][npm-web-url]     | 基于@deot/env的mcp                                 |
| [uni](packages/uni)   | [![npm][npm-uni-image]][npm-uni-url]   | 基于@deot/uni的mcp                                 |
| [index](packages/index)   | [![npm][npm-image]][npm-url]               | 当前所有包的合集                               |

## Contributing

这是一个[monorepo](https://en.wikipedia.org/wiki/Monorepo)仓库 ，使用[pnpm](https://pnpm.io/) 管理

- 安装环境

```console
$ npm run init
```

- 添加依赖或添加新的包

```console
$ npm run add
```

- 关联

```console
$ npm run link
```

- 测试

```console
$ npm run test

# 或者 直接添加参数
$ npm run test -- --package-name '**' --watch
```

- 开发

```console
$ npm run dev

# 或者 直接添加参数
$ npm run dev -- --package-name '**'
```

- 打包

```console
$ npm run build
```

- 代码检查

```console
$ npm run lint
```

- 发布

```console
$ npm run release
```

## 关联

[CONTRIBUTING](./.github/CONTRIBUTING.md)

[LICENSE (MIT)](./LICENSE)