// 组件模板配置
export const COMPONENT_TEMPLATE = `import { Component } from 'san';
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

export const STYLE_TEMPLATE = `
.{{componentName}} {
    /* 在这里编写组件样式 */
    display: flex;
    justify-content: space-between;
    padding: 16px;

    :global(.cos-button) {
        // cosmic样式覆盖
    }
}`;

// Cosmic组件列表
export const COSMIC_COMPONENTS = [
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
] as const; 