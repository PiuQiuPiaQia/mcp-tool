<template>
  <div class="detailed-view">
    <!-- 浏览器栏 -->
    <div class="browser-bar">
      <div class="browser-icons">
        <button class="browser-icon"><img src="@/assets/leading-icon.svg" alt="back"></button>
        <button class="browser-icon"><img src="@/assets/trailing-icon-1.svg" alt="forward"></button>
        <button class="browser-icon"><img src="@/assets/trailing-icon-2.svg" alt="refresh"></button>
      </div>
      <div class="address-bar">
        <div class="url">
          <span class="lock-icon">🔒</span>
          <span class="url-text">www.url.com</span>
        </div>
        <button class="star-icon">⭐</button>
      </div>
      <div class="avatar">M</div>
      <button class="more-icon">⋮</button>
    </div>

    <div class="main-content">
      <!-- 导航侧边栏 -->
      <nav class="navigation-rail">
        <div class="menu-fab">
          <button class="menu-button">
            <img src="@/assets/menu-icon.svg" alt="menu">
          </button>
          <button class="fab-button">
            <img src="@/assets/fab-icon.svg" alt="fab">
          </button>
        </div>
        <div class="nav-items">
          <button 
            v-for="(item, index) in navItems" 
            :key="index"
            class="nav-item"
            :class="{ active: activeNavIndex === index }"
            @click="handleNavClick(index)"
          >
            <img :src="item.icon" alt="nav">
            <span>{{ item.label }}</span>
          </button>
        </div>
      </nav>

      <!-- 内容区域 -->
      <main class="content">
        <!-- 顶部应用栏 -->
        <div class="top-app-bar">
          <button class="leading-icon">
            <img src="@/assets/leading-icon.svg" alt="menu">
          </button>
          <h1 class="title">Title</h1>
          <div class="trailing-icons">
            <button class="trailing-icon">
              <img src="@/assets/trailing-icon-1.svg" alt="action">
            </button>
            <button class="trailing-icon">
              <img src="@/assets/trailing-icon-2.svg" alt="action">
            </button>
          </div>
        </div>

        <!-- 头部区域 -->
        <header class="header">
          <div class="header-image"></div>
          <div class="header-content">
            <div class="header-text">
              <h1>Headline</h1>
              <p class="published-date">Published date</p>
              <p class="supporting-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button class="download-button">Download</button>
          </div>
        </header>

        <!-- 卡片网格 -->
        <section class="card-grid">
          <div class="section-header">
            <h2>Section title</h2>
            <button class="section-icon">
              <img src="@/assets/section-icon.svg" alt="more">
            </button>
          </div>
          <div class="card-list">
            <div v-for="(card, index) in cards" :key="index" class="card">
              <div class="card-image"></div>
              <div class="card-content">
                <div class="card-text">
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.description }}</p>
                </div>
                <div class="card-meta">
                  <div class="meta-left">
                    <img src="@/assets/date-icon.svg" alt="date">
                    <span>{{ card.date }}</span>
                    <span>•</span>
                    <span>{{ card.duration }}</span>
                  </div>
                  <img src="@/assets/list-item-icon.svg" alt="action" class="meta-action">
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- 媒体播放器 -->
    <div class="media-player">
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="player-content">
        <div class="track-image"></div>
        <div class="track-info">
          <div class="track-title">Title</div>
          <div class="track-artist">Artist</div>
        </div>
        <div class="playback-controls">
          <button class="control-button">⏮</button>
          <button class="control-button" @click="togglePlay">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
          <button class="control-button">⏭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航状态
const activeNavIndex = ref(0)

// 播放器状态
const isPlaying = ref(false)
const progress = ref(45)

// 导航项数据
const navItems = [
  { label: 'Label 1', icon: '@/assets/nav-icon-1.svg' },
  { label: 'Label 2', icon: '@/assets/nav-icon-1.svg' },
  { label: 'Label 3', icon: '@/assets/nav-icon-1.svg' },
  { label: 'Label 4', icon: '@/assets/nav-icon-1.svg' }
]

// 卡片数据
const cards = [
  {
    title: 'Card Title 1',
    description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.',
    date: 'Today',
    duration: '23 min'
  },
  {
    title: 'Card Title 2',
    description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.',
    date: 'Today',
    duration: '23 min'
  },
  {
    title: 'Card Title 3',
    description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.',
    date: 'Today',
    duration: '23 min'
  }
]

// 处理导航项点击
const handleNavClick = (index: number) => {
  activeNavIndex.value = index
}

// 处理播放/暂停
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// 处理进度条更新
const updateProgress = (newProgress: number) => {
  progress.value = Math.max(0, Math.min(100, newProgress))
}
</script>

<style scoped>
.detailed-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #FEF7FF;
}

/* Browser Bar Styles */
.browser-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #FEF7FF;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.browser-icons {
  display: flex;
  gap: 12px;
}

.browser-icon {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
}

.address-bar {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  background-color: #F3EDF7;
  border-radius: 46px;
}

.url {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  background-color: #79747E;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main Content Styles */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Navigation Rail Styles */
.navigation-rail {
  width: 72px;
  padding: 44px 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background-color: #FEF7FF;
}

.menu-fab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.menu-button,
.fab-button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fab-button {
  background-color: #FFD8E4;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: #49454F;
}

.nav-item.active {
  background-color: #E8DEF8;
  border-radius: 100px;
}

/* Content Area Styles */
.content {
  flex: 1;
  padding: 0;
  background-color: white;
  border-radius: 28px;
  overflow-y: auto;
}

.top-app-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  background-color: #FEF7FF;
}

.trailing-icons {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

/* Header Styles */
.header {
  display: flex;
  gap: 24px;
  padding: 8px 24px;
}

.header-image {
  width: 200px;
  height: 200px;
  background-color: #E8DEF8;
  border-radius: 28px;
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.download-button {
  align-self: flex-start;
  padding: 10px 24px;
  background-color: #65558F;
  color: white;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

/* Card Grid Styles */
.card-grid {
  padding: 0 0 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
}

.card-list {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #FEF7FF;
}

.card-image {
  width: 100px;
  height: 100px;
  background-color: #E8DEF8;
  border-radius: 16px;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #49454F;
}

/* Media Player Styles */
.media-player {
  background-color: #FEF7FF;
  border-radius: 2px 2px 16px 16px;
}

.progress-bar {
  height: 4px;
  background-color: #E8DEF8;
}

.progress {
  height: 100%;
  background-color: #65558F;
}

.player-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  height: 64px;
}

.track-image {
  width: 48px;
  height: 48px;
  background-color: #E8DEF8;
}

.track-info {
  flex: 1;
}

.track-title {
  font-weight: 500;
}

.track-artist {
  color: #49454F;
}

.playback-controls {
  display: flex;
  gap: 8px;
}

.control-button {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
}
</style> 