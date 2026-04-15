<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import SearchBar from '@/components/Common/SearchBar.vue'

interface ModuleCategory {
  label: string
  path: string
}

interface ModuleItem {
  label: string
  base: string
  categories: ModuleCategory[]
}

const modules: ModuleItem[] = [
  { label: '态势总览', base: '/dashboard', categories: [] },
  { label: '数据感知', base: '/data-perception', categories: [] },
  {
    label: '舆情监测',
    base: '/monitor',
    categories: [],
  },
  {
    label: '舆情生成',
    base: '/public-opinion-output',
    categories: []
  },
  { label: '安全态势', base: '/security', categories: [] },
  { label: '智能体中心', base: '/agent-center', categories: [] },
]

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const activePath = computed(() => route.path)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="top-row">
      <div class="left">
        <div class="title-group">
          <div class="main-title">舆情智析</div>
          <div class="sub-title">基于多智能体协同的舆情分析系统</div>
        </div>
        <div class="search-bar-wrap">
          <SearchBar />
        </div>
        <nav class="module-nav">
          <div
            v-for="mod in modules"
            :key="mod.base"
            class="module-wrapper"
          >
              <router-link
              class="module-item" 
              :class="{ active: activePath.startsWith(mod.base) }"
                :to="mod.base"
            >
              {{ mod.label }}
              <i class="el-icon-arrow-down"></i>
              </router-link>
            <div class="module-dropdown">
              <router-link
                v-for="cat in mod.categories"
                :key="cat.path"
                :to="cat.path"
                class="dropdown-item"
              >
                {{ cat.label }}
              </router-link>
            </div>
          </div>
        </nav>
      </div>
      <div class="right">
        <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="username">{{ userStore.userName }}</span>
        <button class="logout-btn" @click="handleLogout">退出</button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "sass:color";

.app-header {
  position: relative;
  z-index: 9999;
  background: rgba(19, 26, 42, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;

  .top-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      gap: 20px;

      .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 0;

        .main-title {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 1px;
          line-height: 1.1;
          text-shadow: 0 2px 8px #00F0FF33;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 320px;
        }

        .sub-title {
          font-size: 12px;
          font-weight: 500;
          color: #94A3B8;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 320px;
        }
      }

      .module-nav {
        display: flex;
        gap: 8px;
        
        .module-wrapper {
          position: relative;
          
          .module-item {
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 4px;
            color: #94A3B8;
            font-weight: 500;
            font-size: 17px; /* 增大字号 */
            white-space: nowrap; /* 不换行 */
            
            &:hover {
              background: rgba(0,240,255,0.08);
              color: #00F0FF;
            }
            
            &.active {
              background: rgba(0,240,255,0.15);
              color: #00F0FF;
              font-weight: 600;
              box-shadow: 0 2px 8px #00F0FF22;
            }
          }
          
          .module-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: #131A2A;
            border: 1px solid rgba(0, 240, 255, 0.12);
            border-radius: 4px;
            box-shadow: 0 2px 8px #00F0FF22;
            min-width: 160px;
            z-index: 9999;
            display: none;
            flex-direction: column;
            padding: 4px 0;
            
            .dropdown-item {
              padding: 8px 16px;
              color: #94A3B8;
              text-decoration: none;
              transition: all 0.2s;
              
              &:hover {
                background: rgba(0,240,255,0.08);
                color: #00F0FF;
              }
            }
          }
          
          &:hover .module-dropdown {
            display: flex;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 8px;

      .username {
        font-size: 14px;
        color: #E2E8F0;
      }
      
      .logout-btn {
        padding: 6px 12px;
        background: #00F0FF;
        color: #131A2A;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
        font-weight: 600;
        
        &:hover {
          background: #00bcd4;
          color: #fff;
        }
      }
    }
  }
}
</style>
