import {MCPTool} from 'mcp-framework';
import {z} from 'zod';

interface SanInput {
    componentName: string;
    features?: string; // 逗号分隔的特性字符串
    description?: string;
    selectedComponents?: string[]; // 选择使用的组件列表
}

/**
 * SanTool - 用于生成 SanJS 组件代码的辅助工具
 */
class SanTool extends MCPTool<SanInput> {
    name = 'san';
    description = '生成 SanJS 组件的基础代码结构，包括组件模板、样式和逻辑';

    // Cosmic组件列表
    private readonly cosmicComponents = [
        'Avatar',
        'AvatarGroup',
        'Badge',
        'Button',
        'ImageUploader',
        'Drawer',
        'Dialog',
        'Empty',
        'Fold',
        'FoldSwitch',
        'Icon',
        'Image',
        'Input',
        'Loading',
        'MoreLink',
        'Popover',
        'Rank',
        'RichVideoPlayer',
        'Score',
        'Swiper',
        'SwiperItem',
        'Switcher',
        'Tag',
        'Textarea',
        'Toast',
        'Tabs',
        'Tab',
        'TabPane',
        'AudioPlayer',
        'Tooltip',
        'Vote',
        'Checkbox',
        'CheckboxGroup',
        'Radio',
        'RadioGroup',
        'Select',
        'Cascader',
        'Table',
        'Price',
        'Accordion',
        'AccordionPanel',
        'Calendar',
        'DatePicker',
        'Timeline',
        'TimelineItem',
        'CitySelector',
        'Pagination',
        'TimePicker',
        'PickerViewColumn',
        'PickerView',
        'DateTimePicker',
    ];

    schema = {
        componentName: {
            type: z.string(),
            description: '组件名称（使用PascalCase命名规范）',
        },
        features: {
            type: z.string().optional(),
            description:
                '需要包含的特性，使用逗号分隔：template-模板, style-样式, computed-计算属性, lifecycle-生命周期, typescript-TypeScript支持。默认包含 typescript 和 style。',
        },
        description: {
            type: z.string().optional(),
            description: '组件的功能描述（可选）',
        },
        selectedComponents: {
            type: z.array(z.string()).optional(),
            description: '选择使用的组件列表，不传则返回可用组件列表',
        },
    };

    private generateImports(components: string[]): string {
        return components
            .map(
                name =>
                    `import ${name} from '@baidu/cosmic/${this.toKebabCase(name)}';`
            )
            .join('\n');
    }

    private generateComponentRegistrations(components: string[]): string {
        const registrations = components
            .map(name => `        'cos-${this.toKebabCase(name)}': ${name}`)
            .join(',\n');
        return `static components = {\n${registrations}\n    };`;
    }

    private readonly defaultTemplate = `import { Component } from 'san';
import Button from '@baidu/cosmic/button';
import './index.less';
// 导入cosmic组件
{{imports}}

interface Props {
    // 在这里定义组件的props类型
}

interface State {
    // 在这里定义组件的state类型
}

export default class {{componentName}} extends Component<Props, State> {
    static template = /* html */\`
        <div class="{{componentName}}">
            <!-- Button组件使用示例 -->
            <cos-button type="primary" on-click="handleClick">点击按钮</cos-button>
            
            <!-- 在这里编写组件模板 -->
        </div>
    \`;

    // 注册cosmic组件
    static components = {
        'cos-button': Button
    };
    {{components}}

    initData(): State {
        return {
            // 初始化组件状态
        };
    }

    handleClick(): void {
        // 按钮点击处理
        console.log('按钮被点击');
    }

    // 在这里添加组件方法
}`;

    private readonly defaultStyle = `
.{{componentName}} {
    /* 在这里编写组件样式 */
    display: flex;
    justify-content: space-between;
    padding: 16px;

    :global(.cos-button) {
        // cosmic样式覆盖
    }
}`;

    async execute({
        componentName,
        features = '',
        description = '',
        selectedComponents = [],
    }: SanInput) {
        try {
            // 如果没有提供componentName，则返回组件列表
            if (!componentName) {
                return {
                    message: '获取Cosmic组件列表成功',
                    components: this.cosmicComponents,
                };
            }

            // 确保Button组件总是被包含在selectedComponents中
            const finalComponents = [
                ...new Set(['Button', ...selectedComponents]),
            ];

            const {tsCode} = this.generateComponentCode(
                componentName,
                description,
                finalComponents
            );

            return {
                message: `成功生成 ${componentName} 组件代码`,
                components: this.cosmicComponents,
                files: [
                    {
                        code: tsCode,
                        filename: `${componentName}/index.ts`,
                    },
                    {
                        code: this.defaultStyle.replace(
                            /{{componentName}}/g,
                            this.toKebabCase(componentName)
                        ),
                        filename: `${componentName}/index.less`,
                    },
                ],
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`生成组件代码失败: ${error.message}`);
            }
            throw new Error('生成组件代码失败：未知错误');
        }
    }

    private toKebabCase(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    private generateComponentCode(
        componentName: string,
        description: string,
        selectedComponents: string[]
    ): {tsCode: string} {
        // 使用默认模板
        let tsCode = this.defaultTemplate;

        // 生成导入语句和组件注册
        const imports =
            selectedComponents.length > 0
                ? this.generateImports(selectedComponents)
                : '';
        const components =
            selectedComponents.length > 0
                ? this.generateComponentRegistrations(selectedComponents)
                : '';

        // 替换模板中的变量
        tsCode = tsCode.replace('{{imports}}', imports);
        tsCode = tsCode.replace('{{components}}', components);
        tsCode = tsCode.replace(/Props/g, `${componentName}Props`);
        tsCode = tsCode.replace(/State/g, `${componentName}State`);
        tsCode = tsCode.replace(/{{componentName}}/g, componentName);

        // 添加注释
        const componentComment = `/**\n * ${componentName} 组件\n${description ? ` * ${description}\n` : ''} */\n`;
        tsCode = componentComment + tsCode;

        return {tsCode};
    }
}

export default SanTool;
