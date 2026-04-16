import { mergeConfig, defineConfig } from 'vitest/config';
import type { UserConfig } from 'vite';
import configShared from './node_modules/@deot/dev-tester/shared.config';

const config: UserConfig = mergeConfig(
	configShared,
	defineConfig({
		test: {
			coverage: {
				provider: 'istanbul',
				exclude: [
					`packages/uni/src/**/*.ts`, // TODO: 后续移除
					`packages/web/src/**/*.ts`
				]
			}
		}
	})
);

export default config;
