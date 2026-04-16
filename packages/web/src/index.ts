import path from 'node:path';
import fg from 'fast-glob';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const PLATFORM_ENUM = ['vue', 'uni', 'react', 'mini'] as const;

export type Platform = (typeof PLATFORM_ENUM)[number];

export type QueryComponentsInput = {
	projectPath: string;
	platforms?: Platform[];
};

export type ComponentMeta = {
	name: string;
	file: string;
	ext: string;
};

export const resolveComponentPatterns = (platforms: Platform[] = [...PLATFORM_ENUM]): string[] => {
	const patterns: string[] = [];

	if (platforms.includes('vue') || platforms.includes('uni')) {
		patterns.push('**/*.vue');
	}

	if (platforms.includes('react')) {
		patterns.push('**/*.{jsx,tsx}');
	}

	if (platforms.includes('mini')) {
		patterns.push('**/*.{wxml,axml,swan,ttml}');
	}

	return patterns;
};

export const queryComponents = async ({
	projectPath,
	platforms = [...PLATFORM_ENUM],
}: QueryComponentsInput): Promise<ComponentMeta[]> => {
	const patterns = resolveComponentPatterns(platforms);

	const files = await fg(patterns, {
		cwd: projectPath,
		absolute: true,
		ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
	});

	return files.map((file) => {
		const ext = path.extname(file);
		const name = path.basename(file, ext);

		return { name, file, ext };
	});
};

export const createServer = (): McpServer => {
	const server = new McpServer({
		name: '@deot/mcp-web',
		version: '1.0.0',
	});

	server.registerTool(
		'queryComponents',
		{
			description: '查询项目中的组件文件',
			inputSchema: {
				projectPath: z.string(),
				platforms: z.array(z.enum(PLATFORM_ENUM)).optional(),
			},
		},
		async ({ projectPath, platforms }) => {
			const components = await queryComponents({ projectPath, platforms });

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify({ count: components.length, components }),
					}
				],
			};
		}
	);

	return server;
};

export const startServer = async (): Promise<void> => {
	const server = createServer();
	const transport = new StdioServerTransport();
	await server.connect(transport);
};

// 直接启动 server
startServer().catch(() => process.exit(1));
