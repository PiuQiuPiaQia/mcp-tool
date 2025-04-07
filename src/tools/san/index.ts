import {z} from 'zod';
import {
    COMPONENT_TEMPLATE,
    STYLE_TEMPLATE,
    COSMIC_COMPONENTS,
} from './config/index.js';

// 工具函数
function toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateImports(components: string[]): string {
    return components
        .map(
            name => `import ${name} from '@baidu/cosmic/${toKebabCase(name)}';`
        )
        .join('\n');
}

function generateComponentRegistrations(components: string[]): string {
    const registrations = components
        .map(name => `        'cos-${toKebabCase(name)}': ${name}`)
        .join(',\n');
    return `static components = {\n${registrations}\n    };`;
}

// 工具配置
export const schema = {
    componentName: z.string().describe('组件名称（使用PascalCase命名规范）'),
    features: z
        .string()
        .optional()
        .describe(
            '需要包含的特性，使用逗号分隔：template-模板, style-样式, computed-计算属性, lifecycle-生命周期, typescript-TypeScript支持。'
        ),
    description: z.string().optional().describe('组件的功能描述（可选）'),
    selectedComponents: z
        .array(z.string())
        .optional()
        .describe('选择使用的组件列表'),
};

export type SanToolParams = {
    componentName: string;
    description?: string;
    features?: string;
    selectedComponents?: string[];
};

// 工具执行函数
export async function execute(args: SanToolParams) {
    try {
        const {componentName, description = ''} = args;

        // 如果没有提供componentName，返回组件列表
        if (!componentName) {
            return {
                content: [
                    {
                        type: 'text' as const,
                        text: JSON.stringify(
                            {
                                message: '获取Cosmic组件列表成功',
                                components: COSMIC_COMPONENTS,
                            },
                            null,
                            2
                        ),
                    },
                ],
            };
        }

        // 确保Button组件总是被包含
        const finalComponents = [...new Set(['Button'])];

        // 生成组件代码
        let tsCode = COMPONENT_TEMPLATE;
        const imports =
            finalComponents.length > 0 ? generateImports(finalComponents) : '';
        const components =
            finalComponents.length > 0
                ? generateComponentRegistrations(finalComponents)
                : '';

        // 替换模板变量
        tsCode = tsCode.replace('{{imports}}', imports);
        tsCode = tsCode.replace('{{components}}', components);
        tsCode = tsCode.replace(/Props/g, `${componentName}Props`);
        tsCode = tsCode.replace(/State/g, `${componentName}State`);
        tsCode = tsCode.replace(/{{componentName}}/g, `${componentName}`);

        // 添加注释
        const componentComment = `/**\n * ${componentName} 组件\n${description ? ` * ${description}\n` : ''} */\n`;
        tsCode = componentComment + tsCode;

        // 生成样式代码
        const styleCode = STYLE_TEMPLATE.replace(
            /{{componentName}}/g,
            toKebabCase(`${componentName}`)
        );

        return {
            content: [
                {
                    type: 'text' as const,
                    text: JSON.stringify(
                        {
                            message: `成功生成 ${componentName} 组件代码`,
                            components: COSMIC_COMPONENTS,
                            files: [
                                {
                                    code: tsCode,
                                    filename: `${componentName}/index.ts`,
                                },
                                {
                                    code: styleCode,
                                    filename: `${componentName}/index.less`,
                                },
                            ],
                        },
                        null,
                        2
                    ),
                },
            ],
        };
    } catch (error) {
        return {
            content: [
                {
                    type: 'text' as const,
                    text: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
                },
            ],
            isError: true,
        };
    }
}
