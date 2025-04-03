# mcp-tool

基于 mcp-framework 构建的 Model Context Protocol (MCP) 服务器。

## 快速开始

```bash
# 安装依赖
yarn install

# 构建项目（必须）
yarn build
```

## 项目结构

```
mcp-tool/
├── src/
│   ├── tools/        # MCP 工具目录
│   │   └── SanTool.ts
│   └── index.ts      # 服务器入口文件
├── package.json
└── tsconfig.json
```

## 配置 Claude Desktop

在 Claude Desktop 配置文件中添加以下配置：

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-tool": {
      "command": "node",
      "args": ["/[你的路径]/mcp-tool/dist/index.js"]
    }
  }
}
```

注意：
1. 请将 args 中的路径替换为你自己的项目目录
2. 使用前必须先运行 `yarn build` 构建项目

## 工具开发

工具示例结构：

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface MyToolInput {
  message: string;
}

class MyTool extends MCPTool<MyToolInput> {
  name = "my_tool";
  description = "描述你的工具功能";

  schema = {
    message: {
      type: z.string(),
      description: "参数描述",
    },
  };

  async execute(input: MyToolInput) {
    // 工具逻辑实现
    return `处理结果: ${input.message}`;
  }
}

export default MyTool;
```

## 构建和测试

1. 修改工具代码
2. 运行 `yarn build` 编译
3. 服务器启动时会自动加载你的工具

## 了解更多

- [MCP Framework Github](https://github.com/QuantGeekDev/mcp-framework)
- [MCP Framework Docs](https://mcp-framework.com)
