// DOM 元素
let elements = {};

// 初始化DOM元素
function initElements() {
    elements = {
        body: document.body,
        themeToggle: document.getElementById('theme-toggle'),
        tutorialBtn: document.getElementById('tutorial-btn'),
        settingsBtn: document.getElementById('settings-btn'),
        closeSettings: document.getElementById('close-settings'),
        settingsPanel: document.getElementById('settings-panel'),
        searchForm: document.getElementById('search-form'),
        searchInput: document.getElementById('search-input'),
        luckyBtn: document.getElementById('lucky-btn'),
        voiceSearch: document.getElementById('voice-search'),
        aiModeBtn: document.getElementById('ai-mode-btn'),
        recentItems: document.getElementById('recent-items'),
        pinnedItems: document.getElementById('pinned-items'),
        unpinnedItems: document.getElementById('recent-items'),
        backgroundImage: document.getElementById('background-image'),
        glassEffect: document.getElementById('glass-effect'),
        backgroundTypeRadios: document.querySelectorAll('input[name="background-type"]'),
        imageUploadSection: document.getElementById('image-upload-section'),
        backgroundUpload: document.getElementById('background-upload'),
        themeRadios: document.querySelectorAll('input[name="theme"]'),
        searchEngineRadios: document.querySelectorAll('input[name="search-engine"]'),
        customEngineSection: document.getElementById('custom-engine-section'),
        customEngineInput: document.getElementById('custom-engine-url'),
        blurSlider: document.getElementById('blur-slider'),
        blurValue: document.getElementById('blur-value'),
        addVisitBtn: document.getElementById('add-visit-btn'),
        restoreHint: document.getElementById('restore-hint'),
        restoreBtn: document.getElementById('restore-btn'),
        backgroundColorPicker: document.getElementById('background-color-picker'),
        backgroundColorHex: document.getElementById('background-color-hex'),
        colorPresets: document.querySelectorAll('.color-preset'),
        clearBackgroundBtn: document.getElementById('clear-background-btn'),
        addVisitModal: document.getElementById('add-visit-modal'),
        closeModal: document.getElementById('close-modal'),
        visitName: document.getElementById('visit-name'),
        visitUrl: document.getElementById('visit-url'),
        cancelAddVisit: document.getElementById('cancel-add-visit'),
        confirmAddVisit: document.getElementById('confirm-add-visit'),
        editVisitBtn: document.getElementById('edit-visit-btn'),
        editModeModal: document.getElementById('edit-mode-modal'),
        closeEditModeModal: document.getElementById('close-edit-mode-modal'),
        editGlobalBtn: document.getElementById('edit-global-btn'),
        editIndividualBtn: document.getElementById('edit-individual-btn'),
        selectItemsModal: document.getElementById('select-items-modal'),
        closeSelectItemsModal: document.getElementById('close-select-items-modal'),
        selectableItemsContainer: document.getElementById('selectable-items-container'),
        cancelSelectItems: document.getElementById('cancel-select-items'),
        confirmSelectItems: document.getElementById('confirm-select-items'),
        editStyleModal: document.getElementById('edit-style-modal'),
        closeEditModal: document.getElementById('close-edit-modal'),
        useDefaultStyle: document.getElementById('use-default-style'),
        customStyleSection: document.getElementById('custom-style-section'),
        itemBgColor: document.getElementById('item-bg-color'),
        itemTextColor: document.getElementById('item-text-color'),
        itemIconBgColor: document.getElementById('item-icon-bg-color'),
        itemOpacity: document.getElementById('item-opacity'),
        itemOpacityValue: document.getElementById('item-opacity-value'),
        itemSize: document.getElementById('item-size'),
        itemSizeValue: document.getElementById('item-size-value'),
        itemIconSize: document.getElementById('item-icon-size'),
        itemIconSizeValue: document.getElementById('item-icon-size-value'),
        itemFontSize: document.getElementById('item-font-size'),
        itemFontSizeValue: document.getElementById('item-font-size-value'),
        cancelEditStyle: document.getElementById('cancel-edit-style'),
        resetEditStyle: document.getElementById('reset-edit-style'),
        confirmEditStyle: document.getElementById('confirm-edit-style'),
        enableLucky: document.getElementById('enable-lucky'),
        enableSound: document.getElementById('enable-sound'),
        incognitoMode: document.getElementById('incognito-mode'),
        unstickyBtn: document.getElementById('unsticky-btn'),
        searchContainer: document.getElementById('search-container'),
        updateBtn: document.getElementById('update-btn'),
        mobileUpdateBtn: document.getElementById('mobile-update-btn'),
        updateModal: document.getElementById('update-modal'),
        closeUpdateModal: document.getElementById('close-update-modal'),
        closeUpdateBtn: document.getElementById('close-update-btn')
    };
}

// 无痕模式状态
let isIncognitoMode = false;

// 存储键
const storageKeys = {
    theme: 'lews-search-theme',
    backgroundType: 'lews-search-background-type',
    backgroundImage: 'lews-search-background-image',
    backgroundColor: 'lews-search-background-color',
    recentVisits: 'lews-search-recent-visits',
    searchEngine: 'lews-search-engine',
    customEngineUrl: 'lews-search-custom-engine-url',
    blurAmount: 'lews-search-blur-amount',
    itemStyle: 'lews-search-item-style',
    individualItemStyles: 'lews-search-individual-item-styles',
    enableLucky: 'lews-search-enable-lucky',
    enableSound: 'lews-search-enable-sound',
    tutorialSeen: 'lews-search-tutorial-seen',
    incognitoMode: 'lews-search-incognito-mode',
    updateSeen: 'lews-search-update-seen-v0.9'
};

// 删除缓存
let deletedVisitCache = null;

// 默认样式设置
const defaultItemStyle = {
    bgColor: '#ffffff',
    textColor: '#202124',
    iconBgColor: '#f1f3f4',
    opacity: 100,
    size: 140,
    iconSize: 48,
    fontSize: 14,
    useDefault: true
};

// 当前全局样式设置
let currentItemStyle = { ...defaultItemStyle };

// 单个项目样式存储
let individualItemStyles = {};

// 当前编辑模式
let currentEditMode = 'global'; // 'global' 或 'individual'
let selectedItemsForEdit = [];

// 搜索引擎配置
const searchEngines = {
    google: {
        name: 'Google',
        baseUrl: 'https://www.google.com/search?q=%s',
        luckyUrl: 'https://www.google.com/search?btnI=1&q=%s'
    },
    bing: {
        name: 'Bing',
        baseUrl: 'https://www.bing.com/search?q=%s',
        luckyUrl: 'https://www.bing.com/search?q=%s'
    },
    baidu: {
        name: '百度',
        baseUrl: 'https://www.baidu.com/s?wd=%s',
        luckyUrl: 'https://www.baidu.com/s?wd=%s'
    },
    bilibili: {
        name: 'B站',
        baseUrl: 'https://search.bilibili.com/all?keyword=%s',
        luckyUrl: 'https://search.bilibili.com/all?keyword=%s'
    },
    douyin: {
        name: '抖音',
        baseUrl: 'https://www.douyin.com/search/%s',
        luckyUrl: 'https://www.douyin.com/search/%s'
    },
    youtube: {
        name: 'YouTube',
        baseUrl: 'https://www.youtube.com/results?search_query=%s',
        luckyUrl: 'https://www.youtube.com/results?search_query=%s'
    },
    tencent: {
        name: '腾讯视频',
        baseUrl: 'https://v.qq.com/x/search/?q=%s',
        luckyUrl: 'https://v.qq.com/x/search/?q=%s'
    },
    yangshipin: {
        name: '央视频',
        baseUrl: 'https://www.yangshipin.cn/search/result?query=%s',
        luckyUrl: ''
    },
    // 音乐网站
    netease: {
        name: '网易云音乐',
        baseUrl: 'https://music.163.com/#/search/m/?s=%s',
        luckyUrl: ''
    },
    qqmusic: {
        name: 'QQ音乐',
        baseUrl: 'https://y.qq.com/n/ryqq/search?w=%s',
        luckyUrl: ''
    },
    kugou: {
        name: '酷狗音乐',
        baseUrl: 'https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=%s',
        luckyUrl: ''
    },
    kuwo: {
        name: '酷我音乐',
        baseUrl: 'https://www.kuwo.cn/search/list?key=%s',
        luckyUrl: ''
    },
    custom: {
        name: '自定义',
        baseUrl: '',
        luckyUrl: ''
    }
};

// 初始化
function init() {
    // 初始化DOM元素
    initElements();
    loadSettings();
    
    loadRecentVisits();
    setupEventListeners();
    // 检查是否首次使用，显示新手教程
    checkFirstTimeUse();
}

// 加载设置
function loadSettings() {
    // 加载主题设置
    const savedTheme = localStorage.getItem(storageKeys.theme) || 'auto';
    updateTheme(savedTheme);
    elements.themeRadios.forEach(radio => {
        if (radio.value === savedTheme) {
            radio.checked = true;
        }
    });
    
    // 加载背景设置
    const savedBackgroundType = localStorage.getItem(storageKeys.backgroundType) || 'none';
    elements.backgroundTypeRadios.forEach(radio => {
        if (radio.value === savedBackgroundType) {
            radio.checked = true;
        }
    });
    updateBackgroundType(savedBackgroundType);
    
    // 加载背景颜色
    const savedBackgroundColor = localStorage.getItem(storageKeys.backgroundColor) || '#ffffff';
    updateBackgroundColor(savedBackgroundColor);
    
    // 加载背景图片
    const savedBackgroundImage = localStorage.getItem(storageKeys.backgroundImage);
    if (savedBackgroundImage) {
        elements.backgroundImage.style.backgroundImage = `url(${savedBackgroundImage})`;
        elements.backgroundImage.classList.add('visible');
    }
    
    // 加载搜索引擎设置
    const savedSearchEngine = localStorage.getItem(storageKeys.searchEngine) || 'google';
    updateSearchEngine(savedSearchEngine);
    elements.searchEngineRadios.forEach(radio => {
        if (radio.value === savedSearchEngine) {
            radio.checked = true;
        }
    });
    
    // 加载自定义搜索引擎URL
    const savedCustomEngineUrl = localStorage.getItem(storageKeys.customEngineUrl) || '';
    elements.customEngineInput.value = savedCustomEngineUrl;
    if (savedCustomEngineUrl) {
        searchEngines.custom.baseUrl = savedCustomEngineUrl;
        searchEngines.custom.luckyUrl = savedCustomEngineUrl;
    }
    
    // 加载磨砂效果强度
    const savedBlurAmount = localStorage.getItem(storageKeys.blurAmount) || '10';
    if (elements.blurSlider) {
        elements.blurSlider.value = savedBlurAmount;
        elements.blurValue.textContent = savedBlurAmount + 'px';
        updateBlurEffect(savedBlurAmount);
    }
    
    // 加载手气不错功能设置
    const savedEnableLucky = localStorage.getItem(storageKeys.enableLucky);
    if (savedEnableLucky !== null) {
        elements.enableLucky.checked = savedEnableLucky === 'true';
        updateLuckyButtonVisibility();
    }
    
    // 加载音效设置
    const savedEnableSound = localStorage.getItem(storageKeys.enableSound);
    if (savedEnableSound !== null) {
        elements.enableSound.checked = savedEnableSound === 'true';
    }
    
    // 加载无痕模式设置
    const savedIncognitoMode = localStorage.getItem(storageKeys.incognitoMode);
    isIncognitoMode = savedIncognitoMode === 'true';
    if (elements.incognitoMode) {
        elements.incognitoMode.checked = isIncognitoMode;
    }
    updateIncognitoModeUI();
    
    // 加载卡片样式设置
    const savedItemStyle = localStorage.getItem(storageKeys.itemStyle);
    if (savedItemStyle) {
        try {
            currentItemStyle = JSON.parse(savedItemStyle);
        } catch (e) {
            console.error('解析样式设置失败:', e);
            currentItemStyle = { ...defaultItemStyle };
        }
    }
    
    // 加载单个项目样式设置
    const savedIndividualStyles = localStorage.getItem(storageKeys.individualItemStyles);
    if (savedIndividualStyles) {
        try {
            individualItemStyles = JSON.parse(savedIndividualStyles);
        } catch (e) {
            console.error('解析单个项目样式设置失败:', e);
            individualItemStyles = {};
        }
    }
    
    applyItemStyle();
}

// 应用卡片样式
function applyItemStyle() {
    const style = document.createElement('style');
    style.id = 'item-style-dynamic';
    const existingStyle = document.getElementById('item-style-dynamic');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    let styleContent = '';
    
    // 全局样式（用于没有单独设置的项目）
    if (!currentItemStyle.useDefault) {
        const opacity = currentItemStyle.opacity / 100;
        styleContent += `
            .recent-item {
                background-color: ${hexToRgba(currentItemStyle.bgColor, opacity)} !important;
                width: ${currentItemStyle.size}px !important;
                height: ${currentItemStyle.size}px !important;
            }
            .recent-item-title {
                color: ${currentItemStyle.textColor} !important;
                font-size: ${currentItemStyle.fontSize}px !important;
            }
            .recent-item-icon {
                background-color: ${hexToRgba(currentItemStyle.iconBgColor, opacity)} !important;
                width: ${currentItemStyle.iconSize}px !important;
                height: ${currentItemStyle.iconSize}px !important;
            }
        `;
    }
    
    // 单个项目样式
    Object.keys(individualItemStyles).forEach(itemUrl => {
        const itemStyle = individualItemStyles[itemUrl];
        if (itemStyle && !itemStyle.useDefault) {
            const opacity = itemStyle.opacity / 100;
            // 使用 URL 的哈希值作为选择器，避免特殊字符问题
            const urlHash = btoa(itemUrl).replace(/[^a-zA-Z0-9]/g, '');
            styleContent += `
                .recent-item[data-url-hash="${urlHash}"] {
                    background-color: ${hexToRgba(itemStyle.bgColor, opacity)} !important;
                    width: ${itemStyle.size}px !important;
                    height: ${itemStyle.size}px !important;
                }
                .recent-item[data-url-hash="${urlHash}"] .recent-item-title {
                    color: ${itemStyle.textColor} !important;
                    font-size: ${itemStyle.fontSize}px !important;
                }
                .recent-item[data-url-hash="${urlHash}"] .recent-item-icon {
                    background-color: ${hexToRgba(itemStyle.iconBgColor, opacity)} !important;
                    width: ${itemStyle.iconSize}px !important;
                    height: ${itemStyle.iconSize}px !important;
                }
            `;
        }
    });
    
    style.textContent = styleContent;
    document.head.appendChild(style);
}

// 将十六进制颜色转换为RGBA
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 更新主题
function updateTheme(theme) {
    elements.body.classList.remove('light', 'dark');
    
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        elements.body.classList.add(prefersDark ? 'dark' : 'light');
    } else {
        elements.body.classList.add(theme);
    }
    
    // 更新主题切换按钮图标
    updateThemeToggleIcon();
    
    // 保存设置
    localStorage.setItem(storageKeys.theme, theme);
}

// 更新主题切换按钮图标
function updateThemeToggleIcon() {
    const isDark = elements.body.classList.contains('dark');
    elements.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// 更新背景类型
function updateBackgroundType(type) {
    const colorSection = document.getElementById('color-background-section');
    
    if (type === 'glass') {
        elements.glassEffect.classList.remove('hidden');
        elements.backgroundImage.classList.remove('visible');
        elements.imageUploadSection.classList.add('hidden');
        if (colorSection) colorSection.classList.add('hidden');
    } else if (type === 'image') {
        // 当使用图片背景时，也保持玻璃效果可见
        elements.glassEffect.classList.remove('hidden');
        elements.backgroundImage.classList.add('visible');
        elements.imageUploadSection.classList.remove('hidden');
        if (colorSection) colorSection.classList.add('hidden');
    } else if (type === 'none') {
        // 纯色背景
        elements.glassEffect.classList.add('hidden');
        elements.backgroundImage.classList.remove('visible');
        elements.imageUploadSection.classList.add('hidden');
        if (colorSection) colorSection.classList.remove('hidden');
    }
    
    // 保存设置
    localStorage.setItem(storageKeys.backgroundType, type);
}

// 更新背景颜色
function updateBackgroundColor(color) {
    // 验证颜色格式
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
        color = '#ffffff';
    }
    
    // 更新背景颜色
    elements.body.style.backgroundColor = color;
    
    // 更新颜色选择器和输入框
    if (elements.backgroundColorPicker) {
        elements.backgroundColorPicker.value = color;
    }
    if (elements.backgroundColorHex) {
        elements.backgroundColorHex.value = color;
    }
    
    // 保存设置
    localStorage.setItem(storageKeys.backgroundColor, color);
}

// 更新搜索引擎
function updateSearchEngine(engine) {
    const searchEngine = searchEngines[engine] || searchEngines.google;
    
    // 更新搜索框占位符
    elements.searchInput.placeholder = `在 ${searchEngine.name} 中搜索或输入网址`;
    
    // 定义视频网站列表（这些网站不显示"手气不错"按钮）
    const videoEngines = ['bilibili', 'douyin', 'youtube', 'tencent', 'yangshipin'];
    // 定义音乐网站列表（这些网站不显示"手气不错"按钮）
    const musicEngines = ['netease', 'qqmusic', 'kugou', 'kuwo'];
    
    // 更新"手气不错"按钮显示/隐藏
    // 视频网站、音乐网站和自定义网站都不显示"手气不错"
    if (videoEngines.includes(engine) || musicEngines.includes(engine) || engine === 'custom') {
        elements.luckyBtn.classList.add('hidden');
    } else {
        elements.luckyBtn.classList.remove('hidden');
        elements.luckyBtn.textContent = `${searchEngine.name} 手气不错`;
    }
    
    // 更新 AI 模式按钮
    updateAiModeButton(engine);
    
    // 显示/隐藏自定义搜索引擎输入框
    if (engine === 'custom') {
        elements.customEngineSection.classList.remove('hidden');
    } else {
        elements.customEngineSection.classList.add('hidden');
    }
    
    // 保存设置
    localStorage.setItem(storageKeys.searchEngine, engine);
}

// 更新 AI 模式按钮
function updateAiModeButton(engine) {
    const aiModeBtn = elements.aiModeBtn;
    if (!aiModeBtn) return;
    
    // 定义视频网站列表（这些网站没有AI搜索功能）
    const videoEngines = ['bilibili', 'douyin', 'youtube', 'tencent', 'yangshipin'];
    // 定义音乐网站列表（这些网站没有AI搜索功能）
    const musicEngines = ['netease', 'qqmusic', 'kugou', 'kuwo'];
    
    if (engine === 'google') {
        aiModeBtn.textContent = 'AI模式';
        aiModeBtn.classList.remove('hidden');
    } else if (engine === 'baidu') {
        aiModeBtn.textContent = '问文心';
        aiModeBtn.classList.remove('hidden');
    } else if (videoEngines.includes(engine) || musicEngines.includes(engine) || engine === 'custom') {
        // 视频网站、音乐网站和自定义网站没有AI搜索功能，隐藏AI模式按钮
        aiModeBtn.classList.add('hidden');
    } else {
        aiModeBtn.classList.add('hidden');
    }
}

// 更新磨砂效果 - 只应用于背景玻璃效果层
function updateBlurEffect(amount) {
    const blurAmount = amount + 'px';
    
    // 只更新背景玻璃效果层的磨砂效果
    const glassEffect = document.getElementById('glass-effect');
    if (glassEffect) {
        glassEffect.style.backdropFilter = `blur(${blurAmount})`;
        glassEffect.style.webkitBackdropFilter = `blur(${blurAmount})`;
    }
}

// 更新手气不错按钮的可见性
function updateLuckyButtonVisibility() {
    const isEnabled = elements.enableLucky && elements.enableLucky.checked;
    if (elements.luckyBtn) {
        elements.luckyBtn.style.display = isEnabled ? 'block' : 'none';
    }
}

// 检查是否首次使用
function checkFirstTimeUse() {
    const tutorialSeen = localStorage.getItem(storageKeys.tutorialSeen);
    if (!tutorialSeen) {
        // 首次使用，添加默认访问项数据
        addDefaultVisits();
        showTutorial();
        localStorage.setItem(storageKeys.tutorialSeen, 'true');
    }
}

// 添加默认访问项（首次使用时）
function addDefaultVisits() {
    const defaultVisits = [
        // 国内网站
        { title: '百度', url: 'https://www.baidu.com', pinned: false },
        { title: 'B站', url: 'https://www.bilibili.com', pinned: false },
        { title: '知乎', url: 'https://www.zhihu.com', pinned: false },
        { title: '微博', url: 'https://weibo.com', pinned: false },
        { title: '网易云音乐', url: 'https://music.163.com', pinned: false },
        { title: '豆瓣', url: 'https://www.douban.com', pinned: false },
        { title: '小红书', url: 'https://www.xiaohongshu.com', pinned: false },
        // 国外网站
        { title: 'Google', url: 'https://www.google.com', pinned: false },
        { title: 'GitHub', url: 'https://github.com', pinned: false },
        { title: 'YouTube', url: 'https://www.youtube.com', pinned: false },
        { title: 'Twitter', url: 'https://twitter.com', pinned: false },
        { title: 'Reddit', url: 'https://www.reddit.com', pinned: false },
        { title: 'Stack Overflow', url: 'https://stackoverflow.com', pinned: false },
        { title: 'Wikipedia', url: 'https://www.wikipedia.org', pinned: false },
        { title: 'Amazon', url: 'https://www.amazon.com', pinned: false },
        // 游戏网站
        { title: 'Steam', url: 'https://store.steampowered.com', pinned: false },
        { title: 'Epic Games', url: 'https://www.epicgames.com', pinned: false },
        { title: 'Twitch', url: 'https://www.twitch.tv', pinned: false },
        { title: 'Discord', url: 'https://discord.com', pinned: false },
        { title: 'PlayStation', url: 'https://www.playstation.com', pinned: false },
        { title: 'Xbox', url: 'https://www.xbox.com', pinned: false }
    ];
    
    localStorage.setItem(storageKeys.recentVisits, JSON.stringify(defaultVisits));
    console.log('=== 添加默认访问项 ===');
    console.log('已添加', defaultVisits.length, '个默认访问项');
    console.log('国内网站: 7个');
    console.log('国外网站: 8个');
    console.log('游戏网站: 6个');
    console.log('完整列表:', defaultVisits);
}

// 显示新手教程
function showTutorial() {
    const tutorialSteps = [
        {
            title: '欢迎使用 LewSearch',
            content: '这是一个本地化搜索起始页，让我们一起了解如何使用它！',
            element: '.main-content'
        },
        {
            title: '搜索功能',
            content: '在搜索框中输入关键词，按回车进行搜索，或点击"手气不错"直接跳转到第一个搜索结果。',
            element: '.search-input'
        },
        {
            title: '手气不错',
            content: '点击或当搜索框有文字时按Shift+Enter快捷键触发，直接跳转到第一个搜索结果。',
            element: '#lucky-btn'
        },
        {
            title: '最近访问',
            content: '这里会显示你最近访问的网页，点击即可快速访问。你可以固定常用的网站，让它们始终显示在顶部。',
            element: '.recent-visited'
        },
        {
            title: '选择要固定的网址',
            content: '勾选你想要固定在顶部的常用网站，这样它们会始终显示在最近访问列表的最前面。',
            element: '.recent-visited',
            customStep: 'selectPinnedVisits'
        },
        {
            title: '新建访问内容',
            content: '点击右上角的"+"按钮，可以添加新的访问记录。输入名称和网址后，会自动打开编辑弹窗让你调整样式。',
            element: '#add-visit-btn'
        },
        {
            title: '编辑功能',
            content: '点击编辑按钮可以修改最近访问项的样式，包括全局编辑和单个编辑。',
            element: '#edit-visit-btn'
        },
        {
            title: '调整外观',
            content: '在编辑弹窗中，你可以调整背景颜色、文字颜色、透明度、大小等样式。修改后实时生效，点击"保存"即可应用。',
            element: '#edit-style-modal'
        },
        {
            title: '主题切换',
            content: '点击左上角的图标可以切换主题模式（白天/夜间/自动）。',
            element: '#theme-toggle'
        },
        {
            title: '设置',
            content: '点击齿轮图标打开设置面板，可以自定义背景、主题等选项。',
            element: '#settings-btn'
        },
        {
            title: '无痕模式',
            content: '在设置面板中可以开启无痕模式。开启后，你的搜索历史和访问记录将不会被显示，保护你的隐私。平时可以通过设置面板随时开启或关闭无痕模式。',
            element: '#settings-btn',
            customStep: 'incognitoMode'
        },
        {
            title: '完成',
            content: '现在你已经了解了 LewSearch 的基本功能，开始使用吧！',
            element: '.main-content'
        }
    ];
    
    let currentStep = 0;
    
    // 创建教程遮罩
    const tutorialOverlay = document.createElement('div');
    tutorialOverlay.className = 'tutorial-overlay';
    document.body.appendChild(tutorialOverlay);
    
    // 点击遮罩层关闭教程
    tutorialOverlay.addEventListener('click', closeTutorial);
    
    // 创建教程弹窗
    const tutorialModal = document.createElement('div');
    tutorialModal.className = 'tutorial-modal';
    document.body.appendChild(tutorialModal);
    
    // 阻止弹窗内的点击事件冒泡到遮罩层
    tutorialModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 关闭教程函数
    function closeTutorial() {
        // 直接关闭教程，不需要确认
        document.body.removeChild(tutorialOverlay);
        document.body.removeChild(tutorialModal);
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
        // 移除键盘事件监听器
        document.removeEventListener('keydown', handleKeyPress);
    }
    
    // 添加ESC键退出教程
    function handleKeyPress(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeTutorial();
        }
    }
    
    // 添加键盘事件监听器
    document.addEventListener('keydown', handleKeyPress);
    
    // 显示当前步骤
    function showCurrentStep() {
        const step = tutorialSteps[currentStep];
        
        // 清除之前的高亮
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
        
        // 高亮当前元素
        if (step.element) {
            const targetElement = document.querySelector(step.element);
            if (targetElement) {
                targetElement.classList.add('tutorial-highlight');
            }
        }
        
        // 检查是否是自定义步骤
        if (step.customStep === 'selectPinnedVisits') {
            showPinnedVisitsSelectionStep();
            return;
        }
        
        // 无痕模式步骤 - 询问是否开启无痕模式
        if (step.customStep === 'incognitoMode') {
            showIncognitoModeStep();
            return;
        }
        
        // 更新弹窗内容
        tutorialModal.innerHTML = `
            <div class="tutorial-header">
                <h3 class="tutorial-title">${step.title}</h3>
                <button class="tutorial-close-btn" title="关闭教程 (ESC)">&times;</button>
            </div>
            <p class="tutorial-content">${step.content}</p>
            <div class="tutorial-buttons">
                ${currentStep > 0 ? '<button class="tutorial-btn prev-btn">上一步</button>' : ''}
                ${currentStep < tutorialSteps.length - 1 ? '<button class="tutorial-btn next-btn">下一步</button>' : '<button class="tutorial-btn finish-btn">完成</button>'}
            </div>
            <div class="tutorial-hint">按 ESC 键可退出教程</div>
        `;
        
        // 添加关闭按钮事件
        const closeBtn = tutorialModal.querySelector('.tutorial-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTutorial);
        }
        
        // 添加按钮事件
        if (currentStep > 0) {
            tutorialModal.querySelector('.prev-btn').addEventListener('click', () => {
                currentStep--;
                showCurrentStep();
            });
        }
        
        if (currentStep < tutorialSteps.length - 1) {
            tutorialModal.querySelector('.next-btn').addEventListener('click', () => {
                currentStep++;
                showCurrentStep();
            });
        } else {
            tutorialModal.querySelector('.finish-btn').addEventListener('click', () => {
                // 完成教程不需要确认
                document.body.removeChild(tutorialOverlay);
                document.body.removeChild(tutorialModal);
                document.querySelectorAll('.tutorial-highlight').forEach(el => {
                    el.classList.remove('tutorial-highlight');
                });
                document.removeEventListener('keydown', handleKeyPress);
            });
        }
    }
    
    // 显示选择固定网址的步骤
    function showPinnedVisitsSelectionStep() {
        // 总是使用默认的预设网站列表
        const defaultVisits = [
            // 国内网站
            { title: '百度', url: 'https://www.baidu.com', pinned: false },
            { title: 'B站', url: 'https://www.bilibili.com', pinned: false },
            { title: '知乎', url: 'https://www.zhihu.com', pinned: false },
            { title: '微博', url: 'https://weibo.com', pinned: false },
            { title: '网易云音乐', url: 'https://music.163.com', pinned: false },
            { title: '豆瓣', url: 'https://www.douban.com', pinned: false },
            { title: '小红书', url: 'https://www.xiaohongshu.com', pinned: false },
            // 国外网站
            { title: 'Google', url: 'https://www.google.com', pinned: false },
            { title: 'GitHub', url: 'https://github.com', pinned: false },
            { title: 'YouTube', url: 'https://www.youtube.com', pinned: false },
            { title: 'Twitter', url: 'https://twitter.com', pinned: false },
            { title: 'Reddit', url: 'https://www.reddit.com', pinned: false },
            { title: 'Stack Overflow', url: 'https://stackoverflow.com', pinned: false },
            { title: 'Wikipedia', url: 'https://www.wikipedia.org', pinned: false },
            { title: 'Amazon', url: 'https://www.amazon.com', pinned: false },
            // 游戏网站
            { title: 'Steam', url: 'https://store.steampowered.com', pinned: false },
            { title: 'Epic Games', url: 'https://www.epicgames.com', pinned: false },
            { title: 'Twitch', url: 'https://www.twitch.tv', pinned: false },
            { title: 'Discord', url: 'https://discord.com', pinned: false },
            { title: 'PlayStation', url: 'https://www.playstation.com', pinned: false },
            { title: 'Xbox', url: 'https://www.xbox.com', pinned: false }
        ];
        
        console.log('=== 教程选择步骤调试 ===');
        console.log('预设网站数量:', defaultVisits.length);
        
        // 生成访问项选择列表HTML
        let visitsListHTML = '';
        defaultVisits.forEach((visit, index) => {
            let domain;
            try {
                domain = new URL(visit.url).hostname;
            } catch (e) {
                domain = visit.url;
            }
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
            
            visitsListHTML += `
                <label class="tutorial-visit-item">
                    <input type="checkbox" class="tutorial-visit-checkbox" data-index="${index}">
                    <img src="${faviconUrl}" alt="" class="tutorial-visit-icon" onerror="this.style.display='none'">
                    <span class="tutorial-visit-name">${visit.title}</span>
                </label>
            `;
        });
        
        console.log('生成的HTML长度:', visitsListHTML.length);
        
        // 更新弹窗内容
        tutorialModal.innerHTML = `
            <div class="tutorial-header">
                <h3 class="tutorial-title">选择要保留的网址</h3>
                <button class="tutorial-close-btn" title="关闭教程 (ESC)">&times;</button>
            </div>
            <p class="tutorial-content">勾选你想要保留的网站，未选择的网站将被删除。你可以在后续步骤中固定常用的网站到顶部。</p>
            <div class="tutorial-visits-list">
                ${visitsListHTML}
            </div>
            <div class="tutorial-buttons">
                <button class="tutorial-btn prev-btn">上一步</button>
                <button class="tutorial-btn next-btn">下一步</button>
            </div>
            <div class="tutorial-hint">按 ESC 键可退出教程</div>
        `;
        
        console.log('教程弹窗已更新，显示', defaultVisits.length, '个网站');
        
        // 添加关闭按钮事件
        const closeBtn = tutorialModal.querySelector('.tutorial-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTutorial);
        }
        
        // 添加上一步按钮事件
        tutorialModal.querySelector('.prev-btn').addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
        });
        
        // 添加下一步按钮事件（将用户选择的网站添加到现有列表并固定）
        tutorialModal.querySelector('.next-btn').addEventListener('click', () => {
            // 获取用户选择的访问项
            const checkboxes = tutorialModal.querySelectorAll('.tutorial-visit-checkbox:checked');
            const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
            
            console.log('用户选择了', selectedIndices.length, '个网站');
            
            // 获取现有的访问列表
            let existingVisits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
            
            // 将用户选择的网站添加到现有列表（去重），并设置为固定
            selectedIndices.forEach(index => {
                const selectedVisit = defaultVisits[index];
                // 检查是否已存在
                const existingIndex = existingVisits.findIndex(v => v.url === selectedVisit.url);
                if (existingIndex !== -1) {
                    // 如果已存在，设置为固定
                    existingVisits[existingIndex].pinned = true;
                } else {
                    // 如果不存在，添加并设置为固定
                    existingVisits.unshift({
                        ...selectedVisit,
                        pinned: true  // 设置为固定
                    });
                }
            });
            
            // 重新排序：固定的在前面
            const pinnedVisits = existingVisits.filter(v => v.pinned);
            const unpinnedVisits = existingVisits.filter(v => !v.pinned);
            
            // 限制非固定的数量
            const limitedUnpinned = unpinnedVisits.slice(0, 30);
            existingVisits = [...pinnedVisits, ...limitedUnpinned];
            
            // 保存到localStorage
            localStorage.setItem(storageKeys.recentVisits, JSON.stringify(existingVisits));
            
            // 重新渲染访问项
            renderRecentVisits(existingVisits);
            
            console.log('已保存', existingVisits.length, '个网站到localStorage，其中固定的:', pinnedVisits.length);
            
            // 进入下一步
            currentStep++;
            showCurrentStep();
        });
    }
    
    // 显示无痕模式步骤
    function showIncognitoModeStep() {
        // 更新弹窗内容
        tutorialModal.innerHTML = `
            <div class="tutorial-header">
                <h3 class="tutorial-title">无痕模式</h3>
                <button class="tutorial-close-btn" title="关闭教程 (ESC)">&times;</button>
            </div>
            <p class="tutorial-content">无痕模式可以保护你的隐私。开启后，你的搜索历史和访问记录将不会被显示。<br><br>平时可以通过设置面板随时开启或关闭无痕模式。</p>
            <div class="tutorial-incognito-options">
                <label class="tutorial-incognito-radio">
                    <input type="radio" name="incognitoChoice" value="enable" checked>
                    <span class="radio-text">开启无痕模式</span>
                </label>
                <label class="tutorial-incognito-radio">
                    <input type="radio" name="incognitoChoice" value="disable">
                    <span class="radio-text">保持正常模式</span>
                </label>
            </div>
            <div class="tutorial-buttons">
                <button class="tutorial-btn prev-btn">上一步</button>
                <button class="tutorial-btn next-btn">下一步</button>
            </div>
            <div class="tutorial-hint">按 ESC 键可退出教程</div>
        `;
        
        // 添加关闭按钮事件
        const closeBtn = tutorialModal.querySelector('.tutorial-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTutorial);
        }
        
        // 添加上一步按钮事件
        tutorialModal.querySelector('.prev-btn').addEventListener('click', () => {
            currentStep--;
            showCurrentStep();
        });
        
        // 添加下一步按钮事件
        tutorialModal.querySelector('.next-btn').addEventListener('click', () => {
            // 获取用户选择
            const selectedChoice = tutorialModal.querySelector('input[name="incognitoChoice"]:checked').value;
            
            // 根据选择设置无痕模式
            if (selectedChoice === 'enable') {
                isIncognitoMode = true;
                localStorage.setItem(storageKeys.incognitoMode, 'true');
                showIncognitoNotification('无痕模式已开启', '您的搜索历史和访问记录将不会被显示');
            } else {
                isIncognitoMode = false;
                localStorage.setItem(storageKeys.incognitoMode, 'false');
                showIncognitoNotification('无痕模式已关闭', '最近访问记录已恢复显示');
            }
            
            // 更新UI
            updateIncognitoModeUI();
            
            // 进入下一步
            currentStep++;
            showCurrentStep();
        });
    }
    
    // 显示第一步
    showCurrentStep();
}

// 添加测试数据（用于开发测试）
function addTestData() {
    const testVisits = [
        { title: 'Google', url: 'https://www.google.com', pinned: false },
        { title: '百度', url: 'https://www.baidu.com', pinned: false },
        { title: 'B站', url: 'https://www.bilibili.com', pinned: false },
        { title: 'GitHub', url: 'https://github.com', pinned: false },
        { title: '知乎', url: 'https://www.zhihu.com', pinned: false },
        { title: '微博', url: 'https://weibo.com', pinned: false },
        { title: '网易云音乐', url: 'https://music.163.com', pinned: false },
        { title: 'QQ音乐', url: 'https://y.qq.com', pinned: false },
        { title: 'Bing', url: 'https://www.bing.com', pinned: false },
        { title: 'YouTube', url: 'https://www.youtube.com', pinned: false },
        { title: '抖音', url: 'https://www.douyin.com', pinned: false },
        { title: '腾讯视频', url: 'https://v.qq.com', pinned: false },
        { title: '豆瓣', url: 'https://www.douban.com', pinned: false },
        { title: '小红书', url: 'https://www.xiaohongshu.com', pinned: false },
        { title: 'Stack Overflow', url: 'https://stackoverflow.com', pinned: false }
    ];
    
    localStorage.setItem(storageKeys.recentVisits, JSON.stringify(testVisits));
    console.log('已添加15个测试访问项');
}

// 加载最近访问
function loadRecentVisits() {
    const recentVisits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    renderRecentVisits(recentVisits);
}

// 渲染项目选择列表（用于单独编辑模式）
function renderItemSelectionList() {
    const visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    
    if (elements.selectableItemsContainer) {
        elements.selectableItemsContainer.innerHTML = '';
        
        visits.forEach((visit, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-select-row';
            
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(visit.url)}&sz=32`;
            // 使用 URL 作为标识
            const urlHash = btoa(visit.url).replace(/[^a-zA-Z0-9]/g, '');
            
            itemDiv.innerHTML = `
                <label class="item-select-label">
                    <input type="checkbox" class="item-select-checkbox" data-url="${visit.url}" data-url-hash="${urlHash}">
                    <img src="${faviconUrl}" alt="" class="item-select-icon" onerror="this.style.display='none'">
                    <span class="item-select-name">${visit.title}</span>
                </label>
            `;
            
            elements.selectableItemsContainer.appendChild(itemDiv);
        });
    }
}

// 切换样式输入框的禁用状态
function toggleStyleInputsDisabled(disabled) {
    const inputs = [
        elements.itemBgColor,
        elements.itemTextColor,
        elements.itemIconBgColor,
        elements.itemOpacity,
        elements.itemSize,
        elements.itemIconSize,
        elements.itemFontSize
    ];
    
    inputs.forEach(input => {
        if (input) {
            input.disabled = disabled;
            if (disabled) {
                input.parentElement.classList.add('disabled');
            } else {
                input.parentElement.classList.remove('disabled');
            }
        }
    });
}

// 渲染最近访问
function renderRecentVisits(visits) {
    // 清空两个容器
    if (elements.pinnedItems) elements.pinnedItems.innerHTML = '';
    if (elements.unpinnedItems) elements.unpinnedItems.innerHTML = '';
    
    // 调试：打印访问项数据
    console.log('=== 访问项数据调试 ===');
    console.log('总访问项数量:', visits.length);
    console.log('访问项详情:', visits);
    
    if (visits.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'recent-empty';
        emptyMessage.textContent = '最近没有访问记录';
        elements.unpinnedItems.appendChild(emptyMessage);
        return;
    }
    
    // 分离固定项和非固定项
    const pinnedVisits = visits.filter(v => v.pinned);
    const unpinnedVisits = visits.filter(v => !v.pinned);
    
    // 如果有删除缓存，显示恢复提示（在非固定容器末尾）
    if (deletedVisitCache) {
        const restoreHint = document.createElement('div');
        restoreHint.className = 'restore-hint';
        restoreHint.innerHTML = `
            <span>手滑了，点击此处可恢复</span>
            <button class="restore-btn">恢复内容</button>
        `;
        restoreHint.querySelector('.restore-btn').addEventListener('click', restoreDeletedVisit);
        elements.unpinnedItems.appendChild(restoreHint);
    }
    
    // 渲染单个项目的辅助函数
    function renderItem(visit, index, container) {
        const item = document.createElement('div');
        item.className = 'recent-item';
        item.dataset.index = index;
        // 使用 URL 的哈希值作为标识，避免特殊字符问题
        item.dataset.urlHash = btoa(visit.url).replace(/[^a-zA-Z0-9]/g, '');
        
        // 获取网站favicon - 尝试多个源
        let domain;
        try {
            domain = new URL(visit.url).hostname;
        } catch (e) {
            domain = visit.url;
        }
        // 备用favicon源列表（按优先级排序）
        const faviconSources = [
            // 尝试直接获取网站的favicon
            `https://${domain}/favicon.ico`,
            // 使用Google Favicon服务（需要翻墙）
            `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`,
            // 使用DuckDuckGo Icons服务
            `https://icons.duckduckgo.com/ip3/${domain}.ico`
        ];
        
        // 截断标题：中日韩文超过4个字显示省略号，英文等首单词超过6个字母显示省略号
        const cjkRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
        const isCJK = cjkRegex.test(visit.title);

        let displayTitle;
        if (isCJK) {
            // 中日韩文：超过4个字显示省略号
            displayTitle = visit.title.length > 4 ? visit.title.substring(0, 4) + '...' : visit.title;
        } else {
            // 英文等：首单词超过6个字母显示省略号
            const firstWord = visit.title.split(' ')[0];
            displayTitle = firstWord.length > 6 ? firstWord.substring(0, 6) + '...' : visit.title;
        }
        
        item.innerHTML = `
            <div class="recent-content">
                <div class="recent-icon">
                    <img class="favicon-img" alt="${visit.title}" style="display: none;">
                    <div class="fallback-icon">${visit.title.charAt(0).toUpperCase()}</div>
                </div>
                <div class="recent-title" title="${visit.title}">${displayTitle}</div>
            </div>`;
        
        // 动态加载favicon，支持多源回退
        const faviconImg = item.querySelector('.favicon-img');
        const fallbackIcon = item.querySelector('.fallback-icon');
        let sourceIndex = 0;
        
        function tryLoadFavicon() {
            if (sourceIndex >= faviconSources.length) {
                // 所有源都失败，显示默认图标
                faviconImg.style.display = 'none';
                fallbackIcon.style.display = 'flex';
                return;
            }
            
            faviconImg.src = faviconSources[sourceIndex];
            sourceIndex++;
        }
        
        faviconImg.onload = function() {
            faviconImg.style.display = 'block';
            fallbackIcon.style.display = 'none';
        };
        
        faviconImg.onerror = function() {
            tryLoadFavicon();
        };
        
        // 开始尝试加载
        tryLoadFavicon();
        
        // 添加固定标记样式
        if (visit.pinned) {
            item.classList.add('pinned');
        }
        
        // 添加操作按钮
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'recent-actions';
        actionsDiv.innerHTML = `
            <a href="${visit.url}" target="_blank" class="action-btn open-btn" title="打开">
                <i class="fas fa-external-link-alt"></i>
                <span>打开</span>
            </a>
            <button class="action-btn pin-btn ${visit.pinned ? 'pinned' : ''}" title="${visit.pinned ? '取消固定' : '固定'}">
                <i class="fas fa-thumbtack"></i>
                <span>${visit.pinned ? '取消固定' : '固定'}</span>
            </button>
            <button class="action-btn delete-btn" title="删除">
                <i class="fas fa-trash-alt"></i>
                <span>删除</span>
            </button>
        `;
        item.appendChild(actionsDiv);
        
        // 固定按钮点击事件
        const pinBtn = item.querySelector('.pin-btn');
        pinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePinVisitByUrl(visit.url);
        });
        
        // 删除按钮点击事件
        const deleteBtn = item.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteRecentVisitByUrl(visit.url);
        });
        
        // 移动端点击显示/隐藏操作按钮
        let isActionsVisible = false;
        item.addEventListener('click', (e) => {
            // 如果点击的是操作按钮，不处理
            if (e.target.closest('.action-btn')) {
                return;
            }

            // 检测是否为触摸设备
            if (window.matchMedia('(pointer: coarse)').matches) {
                e.preventDefault();
                e.stopPropagation();

                // 先关闭所有其他项目的操作按钮
                document.querySelectorAll('.recent-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherActions = otherItem.querySelector('.recent-actions');
                        otherActions.style.transform = 'translateX(-50%) translateY(100%)';
                        otherActions.style.opacity = '0';
                        otherActions.style.pointerEvents = 'none';
                    }
                });

                // 切换当前项目的操作按钮
                isActionsVisible = !isActionsVisible;
                const actions = item.querySelector('.recent-actions');
                if (isActionsVisible) {
                    actions.style.transform = 'translateX(-50%) translateY(0)';
                    actions.style.opacity = '1';
                    actions.style.pointerEvents = 'auto';
                } else {
                    actions.style.transform = 'translateX(-50%) translateY(100%)';
                    actions.style.opacity = '0';
                    actions.style.pointerEvents = 'none';
                }
            }
        });

        // 点击其他地方关闭操作按钮
        document.addEventListener('click', (e) => {
            if (!window.matchMedia('(pointer: coarse)').matches) return;

            // 如果点击的不是当前项目或操作按钮，关闭操作按钮
            if (!item.contains(e.target)) {
                const actions = item.querySelector('.recent-actions');
                actions.style.transform = 'translateX(-50%) translateY(100%)';
                actions.style.opacity = '0';
                actions.style.pointerEvents = 'none';
                isActionsVisible = false;
            }
        });
        
        container.appendChild(item);
    }
    
    // 渲染固定项目
    pinnedVisits.forEach((visit, index) => {
        renderItem(visit, index, elements.pinnedItems);
    });
    
    // 渲染非固定项目
    unpinnedVisits.forEach((visit, index) => {
        renderItem(visit, index, elements.unpinnedItems);
    });
    
    // 渲染完成后应用样式
    applyItemStyle();
    
    // 检测是否需要显示滑动提示（移动端）
    updateScrollHint();
}

// 更新滑动提示
function updateScrollHint() {
    const recentlyUsed = document.querySelector('.recently-used');
    if (!recentlyUsed) return;
    
    // 检查是否为移动端
    if (window.innerWidth > 768) {
        recentlyUsed.classList.remove('has-more');
        return;
    }
    
    // 检测固定项目容器是否超出容器宽度（横向滚动）
    const pinnedItems = elements.pinnedItems;
    const unpinnedItems = elements.unpinnedItems;
    let hasOverflow = false;
    
    if (pinnedItems && pinnedItems.scrollWidth > pinnedItems.clientWidth) {
        hasOverflow = true;
    }
    if (unpinnedItems && unpinnedItems.scrollWidth > unpinnedItems.clientWidth) {
        hasOverflow = true;
    }
    
    if (hasOverflow) {
        recentlyUsed.classList.add('has-more');
    } else {
        recentlyUsed.classList.remove('has-more');
    }
}

// 删除最近访问（通过索引）
function deleteRecentVisit(index) {
    let visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    if (index >= 0 && index < visits.length) {
        const deletedUrl = visits[index].url;
        
        // 保存到缓存
        deletedVisitCache = {
            visit: visits[index],
            index: index
        };
        
        // 从数组中删除
        visits.splice(index, 1);
        
        // 保存到本地存储
        localStorage.setItem(storageKeys.recentVisits, JSON.stringify(visits));
        
        // 删除对应的样式
        if (individualItemStyles[deletedUrl]) {
            delete individualItemStyles[deletedUrl];
            localStorage.setItem(storageKeys.individualItemStyles, JSON.stringify(individualItemStyles));
        }
        
        // 重新渲染
        renderRecentVisits(visits);
        
        // 显示恢复提示
        elements.restoreHint.classList.remove('hidden');
    }
}

// 删除最近访问（通过 URL）
function deleteRecentVisitByUrl(url) {
    let visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    const index = visits.findIndex(v => v.url === url);
    if (index !== -1) {
        // 保存到缓存
        deletedVisitCache = {
            visit: visits[index],
            index: index
        };
        
        // 从数组中删除
        visits.splice(index, 1);
        
        // 保存到本地存储
        localStorage.setItem(storageKeys.recentVisits, JSON.stringify(visits));
        
        // 删除对应的样式
        if (individualItemStyles[url]) {
            delete individualItemStyles[url];
            localStorage.setItem(storageKeys.individualItemStyles, JSON.stringify(individualItemStyles));
        }
        
        // 重新渲染
        renderRecentVisits(visits);
        
        // 显示恢复提示
        elements.restoreHint.classList.remove('hidden');
    }
}

// 恢复删除的访问
function restoreDeletedVisit() {
    if (!deletedVisitCache) return;
    
    let visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    
    // 恢复到原来的位置
    visits.splice(deletedVisitCache.index, 0, deletedVisitCache.visit);
    
    // 限制数量：固定的不计入限制
    const pinnedCount = visits.filter(v => v.pinned).length;
    const unpinnedVisits = visits.filter(v => !v.pinned);
    const limitedUnpinned = unpinnedVisits.slice(0, 30);
    visits = [...visits.filter(v => v.pinned), ...limitedUnpinned];
    
    // 保存到本地存储
    localStorage.setItem(storageKeys.recentVisits, JSON.stringify(visits));
    
    // 清空缓存
    deletedVisitCache = null;
    
    // 重新渲染
    renderRecentVisits(visits);
    
    // 隐藏恢复提示
    elements.restoreHint.classList.add('hidden');
}

// 切换固定状态（通过索引）
function togglePinVisit(index) {
    let visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    if (index >= 0 && index < visits.length) {
        visits[index].pinned = !visits[index].pinned;
        
        // 重新排序：固定的在前面，按固定时间倒序
        const pinnedVisits = visits.filter(v => v.pinned);
        const unpinnedVisits = visits.filter(v => !v.pinned);
        
        // 限制非固定的数量
        const limitedUnpinned = unpinnedVisits.slice(0, 30);
        visits = [...pinnedVisits, ...limitedUnpinned];
        
        localStorage.setItem(storageKeys.recentVisits, JSON.stringify(visits));
        renderRecentVisits(visits);
    }
}

// 切换固定状态（通过 URL）
function togglePinVisitByUrl(url) {
    let visits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    const index = visits.findIndex(v => v.url === url);
    if (index !== -1) {
        visits[index].pinned = !visits[index].pinned;
        
        // 重新排序：固定的在前面，按固定时间倒序
        const pinnedVisits = visits.filter(v => v.pinned);
        const unpinnedVisits = visits.filter(v => !v.pinned);
        
        // 限制非固定的数量
        const limitedUnpinned = unpinnedVisits.slice(0, 30);
        visits = [...pinnedVisits, ...limitedUnpinned];
        
        localStorage.setItem(storageKeys.recentVisits, JSON.stringify(visits));
        renderRecentVisits(visits);
    }
}

// 添加最近访问
function addRecentVisit(title, url, autoPin = true) {
    if (!url || url === 'about:blank') return;
    
    let recentVisits = JSON.parse(localStorage.getItem(storageKeys.recentVisits) || '[]');
    
    // 检查是否已存在（包括固定的）
    const existingIndex = recentVisits.findIndex(visit => visit.url === url);
    if (existingIndex !== -1) {
        // 如果已存在，移到开头并保持固定状态（如果已固定）
        const visit = recentVisits.splice(existingIndex, 1)[0];
        recentVisits.unshift(visit);
    } else {
        // 添加到开头，根据autoPin参数决定是否自动固定
        recentVisits.unshift({ title, url, pinned: autoPin });
    }
    
    // 限制数量：固定的不计入限制，只限制非固定的
    const pinnedCount = recentVisits.filter(v => v.pinned).length;
    const unpinnedVisits = recentVisits.filter(v => !v.pinned);

    // 非固定的最多保留30条
    const limitedUnpinned = unpinnedVisits.slice(0, 30);
    recentVisits = [...recentVisits.filter(v => v.pinned), ...limitedUnpinned];
    
    // 保存并渲染
    localStorage.setItem(storageKeys.recentVisits, JSON.stringify(recentVisits));
    renderRecentVisits(recentVisits);
}

// AI 模式 URL 配置
const aiModeUrls = {
    google: 'https://www.google.com/search?sourceid=chrome&udm=50&aep=42&source=chrome.crn.rb&q=',
    baidu: 'https://chat.baidu.com/search?isShowHello=1&extParamsJson=%7B%22enter_type%22%3A%22home_aiinput_askai%22%7D&word='
};

// 获取 AI 模式基础 URL（不含查询参数）
function getAiModeBaseUrl(engine) {
    if (engine === 'baidu') {
        // 移除末尾的 word= 参数，因为我们会在后面重新添加
        return 'https://chat.baidu.com/search?isShowHello=1&extParamsJson=%7B%22enter_type%22%3A%22home_aiinput_askai%22%7D';
    }
    return aiModeUrls[engine];
}

// 搜索功能
function performSearch(query, lucky = false) {
    const currentEngine = localStorage.getItem(storageKeys.searchEngine) || 'google';
    const engine = searchEngines[currentEngine];
    
    // 检查是否为 AI 模式
    if (query.trim() === 'ai模式') {
        let aiUrl;
        if (currentEngine === 'google') {
            aiUrl = aiModeUrls.google;
        } else if (currentEngine === 'baidu') {
            aiUrl = aiModeUrls.baidu;
        }
        
        if (aiUrl) {
            window.location.href = aiUrl;
            addRecentVisit('AI模式', aiUrl, false);  // 搜索历史不自动固定
            return;
        }
    }
    
    let baseUrl;
    if (lucky && currentEngine === 'google') {
        baseUrl = engine.luckyUrl;
    } else {
        baseUrl = engine.baseUrl;
    }
    
    // 替换查询参数
    const url = baseUrl.replace('%s', encodeURIComponent(query));
    
    window.location.href = url;
    addRecentVisit(query, url, false);  // 搜索历史不自动固定
}

// 设置事件监听器
function setupEventListeners() {
    // 主题切换按钮
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem(storageKeys.theme) || 'auto';
            let newTheme;
            
            if (currentTheme === 'auto') {
                newTheme = elements.body.classList.contains('dark') ? 'light' : 'dark';
            } else if (currentTheme === 'light') {
                newTheme = 'dark';
            } else {
                newTheme = 'light';
            }
            
            updateTheme(newTheme);
            elements.themeRadios.forEach(radio => {
                if (radio.value === newTheme) {
                    radio.checked = true;
                }
            });
        });
    }
    
    // 移动端主题切换按钮
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem(storageKeys.theme) || 'auto';
            let newTheme;
            
            if (currentTheme === 'auto') {
                newTheme = elements.body.classList.contains('dark') ? 'light' : 'dark';
            } else if (currentTheme === 'light') {
                newTheme = 'dark';
            } else {
                newTheme = 'light';
            }
            
            updateTheme(newTheme);
            elements.themeRadios.forEach(radio => {
                if (radio.value === newTheme) {
                    radio.checked = true;
                }
            });
        });
    }
    
    // 移动端新手教程按钮
    const mobileTutorialBtn = document.getElementById('mobile-tutorial-btn');
    if (mobileTutorialBtn) {
        mobileTutorialBtn.addEventListener('click', () => {
            showTutorial();
        });
    }
    
    // 移动端设置按钮
    const mobileSettingsBtn = document.getElementById('mobile-settings-btn');
    if (mobileSettingsBtn) {
        mobileSettingsBtn.addEventListener('click', () => {
            elements.settingsPanel.classList.add('open');
        });
    }
    
    // 新手教程按钮
    console.log('tutorialBtn element:', elements.tutorialBtn);
    if (elements.tutorialBtn) {
        elements.tutorialBtn.addEventListener('click', () => {
            console.log('Tutorial button clicked');
            showTutorial();
        });
    } else {
        console.error('tutorialBtn element not found');
    }
    
    // 设置面板
    if (elements.settingsBtn) {
        elements.settingsBtn.addEventListener('click', () => {
            elements.settingsPanel.classList.add('open');
        });
    }
    
    elements.closeSettings.addEventListener('click', () => {
        elements.settingsPanel.classList.remove('open');
    });
    
    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
        // 检查设置面板是否打开
        if (!elements.settingsPanel.classList.contains('open')) return;
        
        // 检查点击的目标是否在设置面板内
        const isClickInside = elements.settingsPanel.contains(e.target);
        const isClickOnSettingsBtn = elements.settingsBtn.contains(e.target);
        
        // 如果点击在面板外部且不是点击设置按钮，则关闭面板
        if (!isClickInside && !isClickOnSettingsBtn) {
            elements.settingsPanel.classList.remove('open');
        }
    });
    
    // 最近更新弹窗
    function openUpdateModal() {
        elements.updateModal.classList.add('open');
        // 标记已查看更新
        localStorage.setItem(storageKeys.updateSeen, 'true');
        // 移除按钮上的小红点
        if (elements.updateBtn) {
            elements.updateBtn.style.setProperty('--dot-display', 'none');
        }
    }
    
    function closeUpdateModal() {
        elements.updateModal.classList.remove('open');
    }
    
    if (elements.updateBtn) {
        elements.updateBtn.addEventListener('click', openUpdateModal);
    }
    
    if (elements.mobileUpdateBtn) {
        elements.mobileUpdateBtn.addEventListener('click', openUpdateModal);
    }
    
    if (elements.closeUpdateModal) {
        elements.closeUpdateModal.addEventListener('click', closeUpdateModal);
    }
    
    if (elements.closeUpdateBtn) {
        elements.closeUpdateBtn.addEventListener('click', closeUpdateModal);
    }
    
    // 点击弹窗外部关闭
    elements.updateModal.addEventListener('click', (e) => {
        if (e.target === elements.updateModal) {
            closeUpdateModal();
        }
    });
    
    // 搜索表单
    elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = elements.searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });
    
    // 手气不错按钮双击检测（手机端）
    let lastClickTime = 0;
    const doubleClickDelay = 300; // 双击间隔时间（毫秒）

    elements.luckyBtn.addEventListener('click', (e) => {
        // 检测是否为手机端
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // 手机端：双击触发
            const currentTime = Date.now();
            if (currentTime - lastClickTime < doubleClickDelay) {
                // 双击成功，执行手气不错功能
                lastClickTime = 0;
                performLuckySearch(e);
            } else {
                // 第一次点击，记录时间并显示提示
                lastClickTime = currentTime;
                showMobileHint();
            }
        } else {
            // 桌面端：单击触发
            performLuckySearch(e);
        }
    });

    // 显示手机端提示
    function showMobileHint() {
        // 移除已存在的提示
        const existingHint = document.querySelector('.mobile-hint');
        if (existingHint) {
            existingHint.remove();
        }

        // 创建提示元素
        const hint = document.createElement('div');
        hint.className = 'mobile-hint';
        hint.textContent = '要双击两次才能触发哦！';

        // 获取按钮位置
        const btnRect = elements.luckyBtn.getBoundingClientRect();
        hint.style.left = btnRect.left + 'px';
        hint.style.top = (btnRect.bottom + 10) + 'px';

        // 添加到页面
        document.body.appendChild(hint);

        // 1秒后移除
        setTimeout(() => {
            hint.remove();
        }, 1000);
    }

    // 执行手气不错搜索
    function performLuckySearch(e) {
        // 检查音效开关
        const soundEnabled = elements.enableSound && elements.enableSound.checked;
        if (soundEnabled) {
            playClickSound();
        }

        // 检查是否有搜索文字
        const query = elements.searchInput.value.trim();
        const hasQuery = !!query;

        // 如果已经滚动到下方，先平滑滚动回顶部
        if (window.pageYOffset > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // 创建星星粒子效果
        createStarParticles(hasQuery);

        // 创建爆炸粒子效果
        createExplosionParticles(e, hasQuery);

        // 创建波纹效果
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = elements.luckyBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        elements.luckyBtn.appendChild(ripple);

        // 移除波纹元素
        setTimeout(() => ripple.remove(), 600);

        // 检查是否有搜索文字
        if (query) {
            // 添加加载状态
            elements.luckyBtn.classList.add('loading');

            // 延迟执行搜索以显示加载效果
            setTimeout(() => {
                performSearch(query, true);
                elements.luckyBtn.classList.remove('loading');
            }, 500);
        }
    }

    // 播放点击音效
    function playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // 设置音调 - 从高到低的快速变化
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

            // 设置音量包络
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (e) {
            // 如果音频API不可用，静默失败
            console.log('Audio API not available');
        }
    }

    // 手气不错按钮悬停时创建星星
    elements.luckyBtn.addEventListener('mouseenter', () => {
        createStarParticles(false);
    });

    // 创建星星粒子效果函数
    function createStarParticles(hasQuery = false) {
        const btn = elements.luckyBtn;
        const rect = btn.getBoundingClientRect();

        // 根据是否有搜索文字调整星星数量和效果
        const starCount = hasQuery ? Math.floor(Math.random() * 8) + 15 : Math.floor(Math.random() * 5) + 8;
        const sizeMultiplier = hasQuery ? 1.5 : 1;
        const animationDuration = hasQuery ? 2000 : 1500;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // 随机位置
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            star.style.left = x + 'px';
            star.style.top = y + 'px';

            // 随机大小（根据是否有搜索文字调整）
            const size = (Math.random() * 4 + 2) * sizeMultiplier;
            star.style.width = size + 'px';
            star.style.height = size + 'px';

            // 随机动画延迟
            star.style.animationDelay = Math.random() * 0.5 + 's';

            btn.appendChild(star);

            // 动画结束后移除
            setTimeout(() => star.remove(), animationDuration);
        }
    }

    // 创建爆炸粒子效果函数
    function createExplosionParticles(e, hasQuery = false) {
        const btn = elements.luckyBtn;
        const rect = btn.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        createExplosionParticlesAtPoint(clickX, clickY, hasQuery);
    }

    // 在指定位置创建爆炸粒子效果
    function createExplosionParticlesAtPoint(x, y, hasQuery = false) {
        const btn = elements.luckyBtn;

        // 根据是否有搜索文字调整粒子数量和效果
        const particleCount = hasQuery ? Math.floor(Math.random() * 20) + 50 : Math.floor(Math.random() * 11) + 30;
        const sizeMultiplier = hasQuery ? 1.5 : 1;
        const distanceMultiplier = hasQuery ? 1.5 : 1;
        const animationDuration = hasQuery ? 1200 : 1000;

        const colors = ['#ff0000', '#ff7300', '#fffb00', '#48ff00', '#00ffd5', '#002bff', '#7a00ff', '#ff00c8', '#ff6b6b', '#ffd93d'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // 随机颜色
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            // 从指定位置开始
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            // 随机大小（根据是否有搜索文字调整）
            const size = (Math.random() * 10 + 6) * sizeMultiplier;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // 随机爆炸方向（根据是否有搜索文字调整距离）
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            const distance = (Math.random() * 120 + 100) * distanceMultiplier;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            btn.appendChild(particle);

            // 动画结束后移除
            setTimeout(() => particle.remove(), animationDuration);
        }
    }
    
    // AI 模式按钮
    if (elements.aiModeBtn) {
        elements.aiModeBtn.addEventListener('click', () => {
            const currentEngine = localStorage.getItem(storageKeys.searchEngine) || 'google';
            const query = elements.searchInput.value.trim();
            let aiUrl;
            
            if (currentEngine === 'google') {
                aiUrl = aiModeUrls.google + encodeURIComponent(query);
            } else if (currentEngine === 'baidu') {
                // 使用基础 URL + word 参数
                aiUrl = getAiModeBaseUrl('baidu') + '&word=' + encodeURIComponent(query);
            }
            
            if (aiUrl) {
                window.location.href = aiUrl;
                addRecentVisit(query || 'AI模式', aiUrl);
            }
        });
    }
    
    // 语音搜索
    elements.voiceSearch.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'zh-CN';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                elements.searchInput.value = transcript;
                performSearch(transcript);
            };
            recognition.start();
        } else {
            alert('您的浏览器不支持语音搜索');
        }
    });
    
    // 背景类型切换
    elements.backgroundTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                updateBackgroundType(radio.value);
            }
        });
    });
    
    // 背景颜色选择器
    if (elements.backgroundColorPicker) {
        elements.backgroundColorPicker.addEventListener('input', (e) => {
            updateBackgroundColor(e.target.value);
        });
    }
    
    // 背景颜色十六进制输入
    if (elements.backgroundColorHex) {
        elements.backgroundColorHex.addEventListener('input', (e) => {
            let color = e.target.value;
            if (color && !color.startsWith('#')) {
                color = '#' + color;
            }
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                updateBackgroundColor(color);
            }
        });
    }
    
    // 预设颜色点击
    elements.colorPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            updateBackgroundColor(color);
        });
    });
    
    // 取消背景图片
    if (elements.clearBackgroundBtn) {
        elements.clearBackgroundBtn.addEventListener('click', () => {
            localStorage.removeItem(storageKeys.backgroundImage);
            elements.backgroundImage.style.backgroundImage = '';
            elements.backgroundImage.classList.remove('visible');
            elements.backgroundUpload.value = '';
        });
    }
    
    // 背景图片上传
    elements.backgroundUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                elements.backgroundImage.style.backgroundImage = `url(${imageUrl})`;
                localStorage.setItem(storageKeys.backgroundImage, imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 主题设置
    elements.themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                updateTheme(radio.value);
            }
        });
    });
    
    // 恢复按钮
    if (elements.restoreBtn) {
        elements.restoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            restoreDeletedVisit();
        });
    }
    
    // 点击恢复提示文字也可以恢复
    if (elements.restoreHint) {
        elements.restoreHint.addEventListener('click', (e) => {
            // 如果点击的是恢复按钮，不重复处理
            if (e.target === elements.restoreBtn || e.target.closest('.restore-btn')) {
                return;
            }
            restoreDeletedVisit();
        });
    }
    
    // 添加记录按钮
    if (elements.addVisitBtn) {
        elements.addVisitBtn.addEventListener('click', () => {
            elements.addVisitModal.classList.add('open');
            elements.visitName.value = '';
            elements.visitUrl.value = '';
            // 清除错误状态
            elements.visitName.parentElement.classList.remove('has-error');
            elements.visitUrl.parentElement.classList.remove('has-error');
            elements.visitName.focus();
        });
    }
    
    // 输入框获得焦点时清除错误状态
    if (elements.visitName) {
        elements.visitName.addEventListener('focus', () => {
            elements.visitName.parentElement.classList.remove('has-error');
        });
    }
    
    if (elements.visitUrl) {
        elements.visitUrl.addEventListener('focus', () => {
            elements.visitUrl.parentElement.classList.remove('has-error');
        });
    }
    
    // 关闭弹窗
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', () => {
            elements.addVisitModal.classList.remove('open');
        });
    }
    
    // 取消添加
    if (elements.cancelAddVisit) {
        elements.cancelAddVisit.addEventListener('click', () => {
            elements.addVisitModal.classList.remove('open');
        });
    }
    
    // 确认添加
    if (elements.confirmAddVisit) {
        elements.confirmAddVisit.addEventListener('click', () => {
            const name = elements.visitName.value.trim();
            let url = elements.visitUrl.value.trim();
            
            // 清除之前的错误状态
            elements.visitName.parentElement.classList.remove('has-error');
            elements.visitUrl.parentElement.classList.remove('has-error');
            
            // 验证输入
            let hasError = false;
            
            if (!name) {
                elements.visitName.parentElement.classList.add('has-error');
                hasError = true;
            }
            
            if (!url) {
                elements.visitUrl.parentElement.classList.add('has-error');
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // 自动添加https://
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            
            // 添加到最近访问
            addRecentVisit(name, url);
            
            // 关闭添加弹窗
            elements.addVisitModal.classList.remove('open');
            
            // 自动打开编辑样式弹窗（全局编辑模式）
            currentEditMode = 'global';
            
            // 加载全局样式到编辑弹窗
            elements.useDefaultStyle.checked = currentItemStyle.useDefault;
            elements.itemBgColor.value = currentItemStyle.bgColor;
            elements.itemTextColor.value = currentItemStyle.textColor;
            elements.itemIconBgColor.value = currentItemStyle.iconBgColor;
            elements.itemOpacity.value = currentItemStyle.opacity;
            elements.itemOpacityValue.textContent = currentItemStyle.opacity + '%';
            elements.itemSize.value = currentItemStyle.size;
            elements.itemSizeValue.textContent = currentItemStyle.size + 'px';
            elements.itemIconSize.value = currentItemStyle.iconSize;
            elements.itemIconSizeValue.textContent = currentItemStyle.iconSize + 'px';
            elements.itemFontSize.value = currentItemStyle.fontSize;
            elements.itemFontSizeValue.textContent = currentItemStyle.fontSize + 'px';
            
            // 根据默认效果选项禁用/启用其他设置
            toggleStyleInputsDisabled(currentItemStyle.useDefault);
            
            // 打开编辑样式弹窗
            elements.editStyleModal.classList.add('open');
        });
    }
    
    // 点击弹窗外部关闭
    if (elements.addVisitModal) {
        elements.addVisitModal.addEventListener('click', (e) => {
            if (e.target === elements.addVisitModal) {
                elements.addVisitModal.classList.remove('open');
            }
        });
    }
    
    // 编辑样式按钮
    if (elements.editVisitBtn) {
        elements.editVisitBtn.addEventListener('click', () => {
            // 打开编辑模式选择弹窗
            elements.editModeModal.classList.add('open');
        });
    }
    
    // 编辑模式选择 - 全局设置
    if (elements.editGlobalBtn) {
        elements.editGlobalBtn.addEventListener('click', () => {
            currentEditMode = 'global';
            elements.editModeModal.classList.remove('open');
            
            // 加载全局样式到编辑弹窗
            elements.useDefaultStyle.checked = currentItemStyle.useDefault;
            elements.itemBgColor.value = currentItemStyle.bgColor;
            elements.itemTextColor.value = currentItemStyle.textColor;
            elements.itemIconBgColor.value = currentItemStyle.iconBgColor;
            elements.itemOpacity.value = currentItemStyle.opacity;
            elements.itemOpacityValue.textContent = currentItemStyle.opacity + '%';
            elements.itemSize.value = currentItemStyle.size;
            elements.itemSizeValue.textContent = currentItemStyle.size + 'px';
            elements.itemIconSize.value = currentItemStyle.iconSize;
            elements.itemIconSizeValue.textContent = currentItemStyle.iconSize + 'px';
            elements.itemFontSize.value = currentItemStyle.fontSize;
            elements.itemFontSizeValue.textContent = currentItemStyle.fontSize + 'px';
            
            // 根据默认效果选项禁用/启用其他设置
            toggleStyleInputsDisabled(currentItemStyle.useDefault);
            
            elements.editStyleModal.classList.add('open');
        });
    }
    
    // 编辑模式选择 - 单独设置
    if (elements.editIndividualBtn) {
        elements.editIndividualBtn.addEventListener('click', () => {
            currentEditMode = 'individual';
            elements.editModeModal.classList.remove('open');
            
            // 渲染项目选择列表
            renderItemSelectionList();
            
            elements.selectItemsModal.classList.add('open');
        });
    }
    
    // 关闭编辑模式弹窗
    if (elements.closeEditModeModal) {
        elements.closeEditModeModal.addEventListener('click', () => {
            elements.editModeModal.classList.remove('open');
        });
    }
    
    // 点击编辑模式弹窗外部关闭
    if (elements.editModeModal) {
        elements.editModeModal.addEventListener('click', (e) => {
            if (e.target === elements.editModeModal) {
                elements.editModeModal.classList.remove('open');
            }
        });
    }
    
    // 关闭选择项目弹窗
    if (elements.closeSelectItemsModal) {
        elements.closeSelectItemsModal.addEventListener('click', () => {
            elements.selectItemsModal.classList.remove('open');
        });
    }
    
    // 取消选择项目
    if (elements.cancelSelectItems) {
        elements.cancelSelectItems.addEventListener('click', () => {
            elements.selectItemsModal.classList.remove('open');
        });
    }
    
    // 确认选择项目
    if (elements.confirmSelectItems) {
        elements.confirmSelectItems.addEventListener('click', () => {
            // 获取选中的项目
            selectedItemsForEdit = [];
            const checkboxes = elements.selectableItemsContainer.querySelectorAll('.item-select-checkbox:checked');
            checkboxes.forEach(checkbox => {
                selectedItemsForEdit.push(checkbox.dataset.url);
            });
            
            if (selectedItemsForEdit.length === 0) {
                alert('请至少选择一个项目');
                return;
            }
            
            elements.selectItemsModal.classList.remove('open');
            
            // 加载第一个选中项目的样式（如果有）或默认样式
            const firstUrl = selectedItemsForEdit[0];
            const itemStyle = individualItemStyles[firstUrl] || { ...defaultItemStyle };
            
            elements.useDefaultStyle.checked = itemStyle.useDefault;
            elements.itemBgColor.value = itemStyle.bgColor;
            elements.itemTextColor.value = itemStyle.textColor;
            elements.itemIconBgColor.value = itemStyle.iconBgColor;
            elements.itemOpacity.value = itemStyle.opacity;
            elements.itemOpacityValue.textContent = itemStyle.opacity + '%';
            elements.itemSize.value = itemStyle.size;
            elements.itemSizeValue.textContent = itemStyle.size + 'px';
            elements.itemIconSize.value = itemStyle.iconSize;
            elements.itemIconSizeValue.textContent = itemStyle.iconSize + 'px';
            elements.itemFontSize.value = itemStyle.fontSize;
            elements.itemFontSizeValue.textContent = itemStyle.fontSize + 'px';
            
            toggleStyleInputsDisabled(itemStyle.useDefault);
            
            elements.editStyleModal.classList.add('open');
        });
    }
    
    // 点击选择项目弹窗外部关闭
    if (elements.selectItemsModal) {
        elements.selectItemsModal.addEventListener('click', (e) => {
            if (e.target === elements.selectItemsModal) {
                elements.selectItemsModal.classList.remove('open');
            }
        });
    }
    
    // 默认效果复选框变化
    if (elements.useDefaultStyle) {
        elements.useDefaultStyle.addEventListener('change', (e) => {
            toggleStyleInputsDisabled(e.target.checked);
        });
    }
    
    // 透明度滑块实时更新
    if (elements.itemOpacity) {
        elements.itemOpacity.addEventListener('input', (e) => {
            elements.itemOpacityValue.textContent = e.target.value + '%';
        });
    }
    
    // 关闭编辑样式弹窗
    if (elements.closeEditModal) {
        elements.closeEditModal.addEventListener('click', () => {
            elements.editStyleModal.classList.remove('open');
        });
    }
    
    // 取消编辑样式
    if (elements.cancelEditStyle) {
        elements.cancelEditStyle.addEventListener('click', () => {
            elements.editStyleModal.classList.remove('open');
        });
    }
    
    // 重置样式
    if (elements.resetEditStyle) {
        elements.resetEditStyle.addEventListener('click', () => {
            // 重置为默认值
            elements.useDefaultStyle.checked = defaultItemStyle.useDefault;
            elements.itemBgColor.value = defaultItemStyle.bgColor;
            elements.itemTextColor.value = defaultItemStyle.textColor;
            elements.itemIconBgColor.value = defaultItemStyle.iconBgColor;
            elements.itemOpacity.value = defaultItemStyle.opacity;
            elements.itemOpacityValue.textContent = defaultItemStyle.opacity + '%';
            elements.itemSize.value = defaultItemStyle.size;
            elements.itemSizeValue.textContent = defaultItemStyle.size + 'px';
            elements.itemIconSize.value = defaultItemStyle.iconSize;
            elements.itemIconSizeValue.textContent = defaultItemStyle.iconSize + 'px';
            elements.itemFontSize.value = defaultItemStyle.fontSize;
            elements.itemFontSizeValue.textContent = defaultItemStyle.fontSize + 'px';
            
            toggleStyleInputsDisabled(defaultItemStyle.useDefault);
        });
    }
    
    // 应用样式
    if (elements.confirmEditStyle) {
        elements.confirmEditStyle.addEventListener('click', () => {
            const newStyle = {
                bgColor: elements.itemBgColor.value,
                textColor: elements.itemTextColor.value,
                iconBgColor: elements.itemIconBgColor.value,
                opacity: parseInt(elements.itemOpacity.value),
                size: parseInt(elements.itemSize.value),
                iconSize: parseInt(elements.itemIconSize.value),
                fontSize: parseInt(elements.itemFontSize.value),
                useDefault: elements.useDefaultStyle.checked
            };
            
            if (currentEditMode === 'global') {
                // 全局设置
                currentItemStyle = { ...newStyle };
                localStorage.setItem(storageKeys.itemStyle, JSON.stringify(currentItemStyle));
            } else if (currentEditMode === 'individual') {
                // 单独设置 - 应用到选中的项目
                selectedItemsForEdit.forEach(url => {
                    individualItemStyles[url] = { ...newStyle };
                });
                localStorage.setItem(storageKeys.individualItemStyles, JSON.stringify(individualItemStyles));
            }
            
            // 应用样式
            applyItemStyle();
            
            // 关闭弹窗
            elements.editStyleModal.classList.remove('open');
            
            // 清空选中列表
            selectedItemsForEdit = [];
        });
    }
    
    // 滑块值实时更新
    if (elements.itemSize) {
        elements.itemSize.addEventListener('input', (e) => {
            elements.itemSizeValue.textContent = e.target.value + 'px';
        });
    }
    
    if (elements.itemIconSize) {
        elements.itemIconSize.addEventListener('input', (e) => {
            elements.itemIconSizeValue.textContent = e.target.value + 'px';
        });
    }
    
    if (elements.itemFontSize) {
        elements.itemFontSize.addEventListener('input', (e) => {
            elements.itemFontSizeValue.textContent = e.target.value + 'px';
        });
    }
    
    // 点击编辑样式弹窗外部关闭
    if (elements.editStyleModal) {
        elements.editStyleModal.addEventListener('click', (e) => {
            if (e.target === elements.editStyleModal) {
                elements.editStyleModal.classList.remove('open');
            }
        });
    }
    
    // 搜索引擎设置
    elements.searchEngineRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                updateSearchEngine(radio.value);
            }
        });
    });
    
    // 自定义搜索引擎URL
    elements.customEngineInput.addEventListener('input', () => {
        const customUrl = elements.customEngineInput.value.trim();
        if (customUrl) {
            searchEngines.custom.baseUrl = customUrl;
            searchEngines.custom.luckyUrl = customUrl;
            localStorage.setItem(storageKeys.customEngineUrl, customUrl);
        }
    });
    
    // 磨砂效果滑块
    if (elements.blurSlider) {
        elements.blurSlider.addEventListener('input', (e) => {
            const amount = e.target.value;
            elements.blurValue.textContent = amount + 'px';
            updateBlurEffect(amount);
            localStorage.setItem(storageKeys.blurAmount, amount);
        });
    }
    
    // 手气不错功能开关
    if (elements.enableLucky) {
        elements.enableLucky.addEventListener('change', (e) => {
            localStorage.setItem(storageKeys.enableLucky, e.target.checked);
            updateLuckyButtonVisibility();
        });
    }
    
    // 音效开关
    if (elements.enableSound) {
        elements.enableSound.addEventListener('change', (e) => {
            localStorage.setItem(storageKeys.enableSound, e.target.checked);
        });
    }
    
    // 无痕模式开关
    if (elements.incognitoMode) {
        elements.incognitoMode.addEventListener('change', (e) => {
            isIncognitoMode = e.target.checked;
            localStorage.setItem(storageKeys.incognitoMode, isIncognitoMode);
            updateIncognitoModeUI();
            
            // 显示开启/关闭提醒
            if (isIncognitoMode) {
                showIncognitoNotification('无痕模式已开启', '您的搜索历史和访问记录将不会被显示');
            } else {
                showIncognitoNotification('无痕模式已关闭', '最近访问记录已恢复显示');
            }
        });
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentTheme = localStorage.getItem(storageKeys.theme);
        if (currentTheme === 'auto') {
            updateTheme('auto');
        }
    });
    
    // 监听窗口大小变化，更新滑动提示
    window.addEventListener('resize', () => {
        updateScrollHint();
    });
    
    // 监听输入框键盘事件
    elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = elements.searchInput.value.trim();
            if (query) {
                if (e.shiftKey) {
                    // Shift + Enter 触发手气不错
                    // 检查音效开关
                    const soundEnabled = elements.enableSound && elements.enableSound.checked;
                    if (soundEnabled) {
                        playClickSound();
                    }

                    // 创建星星粒子效果（有搜索文字，增强效果）
                    createStarParticles(true);

                    // 创建爆炸粒子效果（在按钮中心，有搜索文字，增强效果）
                    const rect = elements.luckyBtn.getBoundingClientRect();
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    createExplosionParticlesAtPoint(centerX, centerY, true);

                    // 创建波纹效果（模拟点击）
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = centerX - size / 2 + 'px';
                    ripple.style.top = centerY - size / 2 + 'px';
                    elements.luckyBtn.appendChild(ripple);

                    // 移除波纹元素
                    setTimeout(() => ripple.remove(), 600);

                    // 添加加载状态
                    elements.luckyBtn.classList.add('loading');

                    // 延迟执行搜索以显示加载效果
                    setTimeout(() => {
                        performSearch(query, true);
                        elements.luckyBtn.classList.remove('loading');
                    }, 500);
                } else {
                    // 普通 Enter 执行搜索
                    performSearch(query);
                }
            }
        }
    });
    
    // 检查是否是新标签页打开
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD || 
        performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
        // 尝试获取当前页面的标题和URL（如果不是新标签页）
        if (document.referrer) {
            try {
                const referrerUrl = new URL(document.referrer);
                addRecentVisit(referrerUrl.hostname, referrerUrl.href);
            } catch (e) {
                console.error('无法解析referrer URL:', e);
            }
        }
    }
    
    // 设置搜索框滚动监听
    setupSearchContainerScrollListener();
}

// 搜索框滚动监听
function setupSearchContainerScrollListener() {
    const searchContainer = document.getElementById('search-container');
    const pinnedItems = document.getElementById('pinned-items');
    const unpinnedItems = document.getElementById('recent-items');
    
    if (!searchContainer) return;
    
    // 辅助函数：处理滚动事件
    function handleScroll(container) {
        if (!container) return;
        const scrollTop = container.scrollTop;
        
        if (scrollTop > 50) {
            // 滚动超过阈值，添加sticky类
            searchContainer.classList.add('sticky');
        } else {
            // 滚动回到顶部，移除sticky类
            searchContainer.classList.remove('sticky');
        }
    }
    
    // 监听固定项目容器的滚动事件
    if (pinnedItems) {
        pinnedItems.addEventListener('scroll', () => handleScroll(pinnedItems));
    }
    
    // 监听非固定项目容器的滚动事件
    if (unpinnedItems) {
        unpinnedItems.addEventListener('scroll', () => handleScroll(unpinnedItems));
    }
    
    // 点击置顶搜索框返回顶部
    // 使用 mousedown 事件替代 click，更可靠
    searchContainer.addEventListener('mousedown', (e) => {
        // 如果搜索框处于置顶状态
        if (searchContainer.classList.contains('sticky')) {
            // 获取点击的目标元素
            const clickedElement = e.target;
            
            // 检查点击的目标或其父元素是否是交互元素
            const isInteractive = 
                clickedElement.tagName === 'INPUT' || 
                clickedElement.tagName === 'BUTTON' ||
                clickedElement.closest('input') ||
                clickedElement.closest('button') ||
                clickedElement.closest('.search-input-container') ||
                clickedElement.closest('.search-buttons');
            
            // 只有点击非交互元素时才返回顶部
            if (!isInteractive) {
                console.log('点击搜索框背景，返回顶部');
                // 阻止默认行为，避免触发其他事件
                e.preventDefault();
                // 平滑滚动到顶部
                if (pinnedItems) {
                    pinnedItems.scrollTo({ top: 0, behavior: 'smooth' });
                }
                if (unpinnedItems) {
                    unpinnedItems.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    });
    
    // 恢复按钮点击事件 - 返回顶部并恢复默认状态
    const unstickyBtn = document.getElementById('unsticky-btn');
    if (unstickyBtn) {
        // 使用 click 事件
        unstickyBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            e.preventDefault();  // 阻止默认行为
            console.log('点击恢复按钮，返回顶部');
            
            // 先移除 sticky 类，让搜索框回到原位
            searchContainer.classList.remove('sticky');
            
            // 滚动到顶部
            if (pinnedItems) {
                pinnedItems.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (unpinnedItems) {
                unpinnedItems.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // 同时滚动主容器到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 显示无痕模式通知
function showIncognitoNotification(title, message) {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.incognito-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'incognito-notification';
    notification.innerHTML = `
        <div class="incognito-notification-icon">
            <i class="fas fa-user-secret"></i>
        </div>
        <div class="incognito-notification-content">
            <div class="incognito-notification-title">${title}</div>
            <div class="incognito-notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 动画显示
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // 双击通知关闭无痕模式
    notification.addEventListener('dblclick', () => {
        if (isIncognitoMode) {
            isIncognitoMode = false;
            localStorage.setItem(storageKeys.incognitoMode, 'false');
            updateIncognitoModeUI();
            showIncognitoNotification('无痕模式已关闭', '最近访问记录已恢复显示');
        }
    });
}

// 更新无痕模式UI
function updateIncognitoModeUI() {
    const body = document.body;
    const recentVisited = document.querySelector('.recent-visited');
    const incognitoIndicator = document.querySelector('.incognito-indicator');
    const recentSection = document.querySelector('.recent-section');
    const recentHeader = document.querySelector('.recent-header');
    
    // 更新设置面板中的开关状态
    if (elements.incognitoMode) {
        elements.incognitoMode.checked = isIncognitoMode;
    }
    
    if (isIncognitoMode) {
        body.classList.add('incognito-mode');
        // 无痕模式下：隐藏最近访问内容，但显示指示器
        if (recentSection) {
            recentSection.classList.add('hidden');
        }
        if (recentHeader) {
            recentHeader.classList.add('hidden');
        }
        if (recentVisited) {
            recentVisited.classList.remove('hidden');
        }
        
        // 为指示器添加单击和双击事件
        if (incognitoIndicator) {
            let clickTimer = null;
            
            incognitoIndicator.addEventListener('click', function handleClick(e) {
                if (clickTimer) {
                    // 双击：关闭无痕模式
                    clearTimeout(clickTimer);
                    clickTimer = null;
                    isIncognitoMode = false;
                    localStorage.setItem(storageKeys.incognitoMode, 'false');
                    updateIncognitoModeUI();
                    showIncognitoNotification('无痕模式已关闭', '最近访问记录已恢复显示');
                } else {
                    // 单击：提醒需要双击
                    clickTimer = setTimeout(() => {
                        showIncognitoNotification('无痕模式已开启', '双击此处可关闭无痕模式');
                        clickTimer = null;
                    }, 250);
                }
            });
        }
    } else {
        body.classList.remove('incognito-mode');
        // 显示最近访问内容
        if (recentSection) {
            recentSection.classList.remove('hidden');
        }
        if (recentHeader) {
            recentHeader.classList.remove('hidden');
        }
    }
}

// 检查是否已查看更新
function checkUpdateStatus() {
    const updateSeen = localStorage.getItem(storageKeys.updateSeen);
    if (updateSeen) {
        // 已查看过更新，隐藏小红点
        if (elements.updateBtn) {
            elements.updateBtn.classList.add('update-seen');
        }
    }
}

// 初始化应用
init();

// 检查更新状态
checkUpdateStatus();