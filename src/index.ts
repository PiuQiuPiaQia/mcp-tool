import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import * as sanTool from './tools/san/index.js';

async function main() {
    const server = new McpServer({
        name: 'san-mcp-server',
        version: '1.0.0',
    });

    // 注册 San 工具
    server.tool('san', sanTool.schema, sanTool.execute);

    // 启动服务器
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(console.error);
