import {MCPTool} from 'mcp-framework';
import {z} from 'zod';

interface SanInput {
    componentName: string;
    features?: string; // 逗号分隔的特性字符串
    description?: string;
}

/**
 * SanTool - 用于生成 SanJS 组件代码的辅助工具
 */
class SanTool extends MCPTool<SanInput> {
    name = 'san';
    description = '生成 SanJS 组件的基础代码结构，包括组件模板、样式和逻辑';

    private readonly validFeatures = [
        'template',
        'style',
        'computed',
        'lifecycle',
        'store',
        'typescript'
    ] as const;

    schema = {
        componentName: {
            type: z.string(),
            description: '组件名称（使用PascalCase命名规范）',
        },
        features: {
            type: z.string().optional(),
            description:
                '需要包含的特性，使用逗号分隔：template-模板, style-样式, computed-计算属性, lifecycle-生命周期, store-状态管理, typescript-TypeScript支持。默认包含 typescript 和 style。',
        },
        description: {
            type: z.string().optional(),
            description: '组件的功能描述（可选）',
        },
    };

    async execute({componentName, features = '', description = ''}: SanInput) {
        try {
            // 解析特性字符串
            const featureList = features
                .split(',')
                .map(f => f.trim())
                .filter(f => f && this.validFeatures.includes(f as any));

            // 确保默认包含 typescript 和 style
            const defaultFeatures = ['typescript', 'style'];
            const mergedFeatures = Array.from(new Set([...defaultFeatures, ...featureList])) as Array<
                'template' | 'style' | 'computed' | 'lifecycle' | 'store' | 'typescript'
            >;

            const { tsCode, lessCode } = this.generateComponentCode(
                componentName,
                mergedFeatures,
                description
            );
            
            const result: any = {
                message: `成功生成 ${componentName} 组件代码`
            };

            // 创建组件文件夹和文件
            result.files = [{
                code: tsCode,
                filename: `${componentName}/index.ts`,
            }];

            // 如果有样式文件，也一并返回
            if (lessCode) {
                result.files.push({
                    code: lessCode,
                    filename: `${componentName}/index.less`,
                });
            }

            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`生成组件代码失败: ${error.message}`);
            }
            throw new Error('生成组件代码失败：未知错误');
        }
    }

    private toKebabCase(str: string): string {
        return str
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();
    }

    private generateComponentCode(
        componentName: string,
        features: Array<
            | 'template'
            | 'style'
            | 'computed'
            | 'lifecycle'
            | 'store'
            | 'typescript'
        >,
        description: string
    ): { tsCode: string; lessCode?: string } {
        const hasTypeScript = features.includes('typescript');
        const hasStore = features.includes('store');
        const hasComputed = features.includes('computed');
        const hasLifecycle = features.includes('lifecycle');
        const hasStyle = features.includes('style');
        const className = this.toKebabCase(componentName);

        let tsCode = '';

        // 添加注释
        tsCode += `/**\n * ${componentName} 组件\n`;
        if (description) {
            tsCode += ` * ${description}\n`;
        }
        tsCode += ' */\n\n';

        // 导入语句
        tsCode += "import { defineComponent } from 'san';\n";
        if (hasStore) {
            tsCode += "import { connect } from 'san-store';\n";
        }
        // 如果有样式，添加样式导入
        if (hasStyle) {
            tsCode += `import './index.less';\n`;
        }
        tsCode += '\n';

        // 类型定义（如果使用 TypeScript）
        if (hasTypeScript) {
            tsCode += `type ${componentName}Props = {\n  // TODO: 定义组件属性类型\n};\n\n`;
            tsCode += `type ${componentName}State = {\n  // TODO: 定义组件状态类型\n};\n\n`;
        }

        // store 连接配置
        if (hasStore) {
            tsCode += `const connectConfig = {\n  // TODO: 配置 store 连接\n};\n\n`;
        }

        // 组件定义
        if (hasTypeScript) {
            tsCode += `const ${componentName} = defineComponent<${componentName}Props, ${componentName}State>({\n`;
        } else {
            tsCode += `const ${componentName} = defineComponent({\n`;
        }

        // 组件模板
        if (features.includes('template')) {
            tsCode += `  template: \`
    <div class="${className}">
        <!-- TODO: 添加组件模板 -->
    </div>
\`,\n\n`;
        } else {
            tsCode += "  template: '<div></div>',\n\n";
        }

        // 初始化数据
        tsCode +=
            '  initData() {\n    return {\n      // TODO: 初始化组件数据\n    };\n  },\n\n';

        // 计算属性
        if (hasComputed) {
            tsCode += '  computed: {\n    // TODO: 添加计算属性\n  },\n\n';
        }

        // 生命周期方法
        if (hasLifecycle) {
            tsCode += `  attached() {\n    // 组件被附加到页面\n  },\n\n`;
            tsCode += `  detached() {\n    // 组件被从页面移除\n  },\n\n`;
        }

        // 组件方法
        tsCode += '  // TODO: 添加组件方法\n';

        tsCode += '});\n\n';

        // 添加 store 连接
        if (hasStore) {
            tsCode += `const Connected${componentName} = connect(connectConfig)(${componentName});\n`;
            tsCode += `export default Connected${componentName};\n`;
        } else {
            tsCode += `export default ${componentName};\n`;
        }

        // 生成独立的样式文件内容
        let lessCode: string | undefined;
        if (hasStyle) {
            lessCode = `// ${componentName} 组件样式
.${className} {
    // TODO: 添加组件样式
}
`;
        }

        return { tsCode, lessCode };
    }
}

export default SanTool;
