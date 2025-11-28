// utils/icon-helper.js
/**
 * 图标辅助工具
 * 用于在小程序中使用 SVG 图标
 */

// Lucide React 图标对应的 SVG 路径数据
// 这些是从 lucide-react 提取的 SVG 路径
const iconPaths = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  messageCircle: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  stethoscope: 'M4.5 3v4M4.5 7h5M19 10a7 7 0 1 1-14 0M19 10v6a3 3 0 0 1-3 3h-1M12 17v-2',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  search: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'
}

/**
 * 生成 SVG 字符串
 * @param {string} iconName - 图标名称
 * @param {string} color - 颜色，默认 #9CA3AF
 * @param {number} size - 尺寸，默认 24
 * @returns {string} SVG 字符串
 */
function generateSVG(iconName, color = '#9CA3AF', size = 24) {
  const path = iconPaths[iconName]
  if (!path) {
    console.warn(`Icon ${iconName} not found`)
    return ''
  }
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="${path}"/>
  </svg>`
}

/**
 * 将 SVG 转换为 base64 数据 URL
 * @param {string} iconName - 图标名称
 * @param {string} color - 颜色
 * @param {number} size - 尺寸
 * @returns {string} base64 数据 URL
 */
function getSVGDataURL(iconName, color = '#9CA3AF', size = 24) {
  const svg = generateSVG(iconName, color, size)
  if (!svg) return ''
  
  // 在小程序中，可以直接使用 SVG 字符串
  // 或者转换为 base64
  const base64 = wx.arrayBufferToBase64(
    new TextEncoder().encode(svg)
  )
  return `data:image/svg+xml;base64,${base64}`
}

module.exports = {
  generateSVG,
  getSVGDataURL,
  iconPaths
}

