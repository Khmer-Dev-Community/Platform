declare module 'vue-grid-layout'
declare module 'qrcodejs2-fixes'
declare module 'splitpanes'
declare module 'js-cookie'
declare module '@wangeditor/editor-for-vue'
declare module 'js-table2excel'
declare module 'qs'
declare module 'sortablejs'

declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module '*.scss'
declare module '*.ts'
declare module '*.js'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  nextLoading: boolean
  BMAP_SATELLITE_MAP: any
  BMap: any
}

declare type RouteItem<T = any> = {
  path: string
  name?: string | symbol | undefined | null
  redirect?: string
  k?: T
  meta?: {
    title?: string
    isLink?: string
    isHide?: boolean
    isKeepAlive?: boolean
    isAffix?: boolean
    isIframe?: boolean
    roles?: string[]
    icon?: string
    isDynamic?: boolean
    isDynamicPath?: string
    isIframeOpen?: string
    loading?: boolean
    isDir?: boolean
  }
  children: T[]
  query?: { [key: string]: T }
  params?: { [key: string]: T }
  contextMenuClickId?: string | number
  commonUrl?: string
  isFnClick?: boolean
  url?: string
  transUrl?: string
  title?: string
  id?: string | number
}

declare interface RouteToFrom<T = any> extends RouteItem {
  path?: string
  children?: T[]
}

declare type RouteItems<T extends RouteItem = any> = T[]

declare type RefType<T = any> = T | null

declare type HtmlType = HTMLElement | string | undefined | null

declare type ChilType<T = any> = {
  children?: T[]
}

declare type EmptyArrayType<T = any> = T[]

declare type EmptyObjectType<T = any> = {
  [key: string]: T
}

declare type SelectOptionType = {
  value: string | number
  label: string | number
}

declare interface WheelEventType extends WheelEvent {
  wheelDelta: number
}

declare interface TableType<T = any> {
  total: number
  loading: boolean

  query: {
    page: number
    limit: number
    [key: string]: T
  }
}

declare interface ThemeConfigState {
  themeConfig: {
    isDrawer: boolean
    primary: string
    topBar: string
    topBarColor: string
    isTopBarColorGradual: boolean
    menuBar: string
    menuBarColor: string
    menuBarActiveColor: string
    isMenuBarColorGradual: boolean
    columnsMenuBar: string
    columnsMenuBarColor: string
    columnsMenuBarActiveColor: string
    isColumnsMenuBarColorGradual: boolean
    isColumnsMenuHoverPreload: boolean
    isCollapse: boolean
    isUniqueOpened: boolean
    isFixedHeader: boolean
    isFixedHeaderChange: boolean
    isClassicSplitMenu: boolean
    isLockScreen: boolean
    lockScreenTime: number
    isShowLogo: boolean
    isShowLogoChange: boolean
    isBreadcrumb: boolean
    isTagsview: boolean
    isBreadcrumbIcon: boolean
    isTagsviewIcon: boolean
    isCacheTagsView: boolean
    isSortableTagsView: boolean
    isShareTagsView: boolean
    isFooter: boolean
    isGrayscale: boolean
    isInvert: boolean
    isIsDark: boolean
    isWatermark: boolean
    watermarkText: string
    tagsStyle: string
    animation: string
    columnsAsideStyle: string
    columnsAsideLayout: string
    layout: string
    isRequestRoutes: boolean
    globalTitle: string
    globalViceTitle: string
    globalViceTitleMsg: string
    globalI18n: string
    globalComponentSize: string
    isCreateWebHistory: boolean
  }
}
