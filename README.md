# mcp-tool

基于 @modelcontextprotocol/sdk 构建的 San 组件生成工具。

## 功能特点

- 快速生成 San 组件基础结构
- 支持 TypeScript 类型定义
- 自动集成 Cosmic UI 组件库
- 提供组件样式文件生成

## 快速开始

```bash
# 全局安装
npm install -g mcp-tool

# 或者使用 yarn
yarn global add mcp-tool
```

## 项目结构

```
mcp-tool/
├── src/
│   ├── tools/          # MCP 工具目录
│   │   └── san/        # San 组件生成工具
│   │       ├── config/     # 配置文件
│   │       └── index.ts    # 工具实现
│   └── index.ts        # 服务器入口文件
├── package.json
└── tsconfig.json
```

## 配置 Cursor

在 Cursor 配置中添加以下配置：

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

## San 工具使用

工具支持以下参数：

```typescript
{
    componentName: string;       // 组件名称（使用 PascalCase 命名规范）
    description?: string;       // 组件的功能描述（可选）
    features?: string;         // 需要包含的特性，支持：
                              // - template: 模板
                              // - style: 样式
                              // - computed: 计算属性
                              // - lifecycle: 生命周期
                              // - typescript: TypeScript支持
    selectedComponents?: string[]; // 选择使用的 Cosmic 组件列表
}
```

### 使用示例

1. 查询可用组件：

```typescript
// 不传入 componentName 时，返回所有可用的 Cosmic 组件列表
{
    "componentName": ""
}
```

2. 生成组件：

```typescript
{
    "componentName": "MyComponent",
    "description": "这是一个示例组件",
    "features": "template,style,typescript"
}
```

## 开发指南

1. 克隆项目

```bash
git clone [项目地址]
cd mcp-tool
```

2. 安装依赖

```bash
yarn install
```

3. 开发模式

```bash
yarn watch
```

4. 构建项目

```bash
yarn build
```

## 注意事项

1. 生成的组件默认包含 Button 组件作为示例
2. 组件名称必须使用 PascalCase 命名规范
3. 样式文件使用 Less 预处理器

## License

MIT
