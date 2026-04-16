import { PLACEHOLDER } from '@deot/mcp-uni';

// @vitest-environment node
describe('index.ts', () => {
	it('any', () => {
		expect(typeof PLACEHOLDER).toBe('string');
	});
});
