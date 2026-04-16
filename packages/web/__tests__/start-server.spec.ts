import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

type ToolResultLike = {
	content: Array<{ type: string; text?: string }>;
};

const isToolResultLike = (value: unknown): value is ToolResultLike => {
	if (!value || typeof value !== 'object' || !('content' in value)) {
		return false;
	}

	const content = (value as { content: unknown }).content;
	return Array.isArray(content);
};

// @vitest-environment node
describe('startServer integration', () => {
	const currentDir = path.dirname(fileURLToPath(import.meta.url));
	const serverEntry = path.resolve(currentDir, '../src/index.ts');
	const fixtureProjectPath = path.resolve(currentDir, '../../_/web');

	it('should start server and return scanned components', async () => {
		expect.hasAssertions();
		const transport = new StdioClientTransport({
			command: 'npx',
			args: ['tsx', serverEntry],
		});

		const client = new Client({
			name: 'mcp-web-integration-test',
			version: '1.0.0',
		});

		await client.connect(transport);

		const result = await client.callTool({
			name: 'queryComponents',
			arguments: {
				projectPath: fixtureProjectPath,
				platforms: ['vue', 'react'],
			},
		});

		expect(isToolResultLike(result)).toBe(true);
		if (!isToolResultLike(result)) {
			throw new Error('Unexpected MCP tool result shape');
		}

		const textContent = result.content.find(item => item.type === 'text');
		expect(textContent?.type).toBe('text');
		const responseText = textContent?.type === 'text' && typeof textContent.text === 'string' ? textContent.text : '{}';

		console.log(responseText);
		const payload = JSON.parse(responseText) as {
			count: number;
			components: Array<{ name: string; file: string; ext: string }>;
		};

		expect(payload.count).toBe(2);
		expect(payload.components.some(item => item.name === 'hello' && item.ext === '.vue')).toBe(true);
		expect(payload.components.some(item => item.name === 'card' && item.ext === '.tsx')).toBe(true);
		expect(payload.components.some(item => item.file.includes('/dist/ignored.vue'))).toBe(false);

		await client.close();
	}, 60000);
});
