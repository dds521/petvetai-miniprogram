// scripts/generate-tabbar-icons.js
/**
 * 生成 TabBar 图标脚本
 * 从 Lucide Icons 的 SVG 路径生成 PNG 图标
 */

const fs = require('fs')
const path = require('path')

// Lucide Icons 的 SVG 路径数据
const lucideIcons = {
  home: {
    path: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    viewBox: '0 0 24 24'
  },
  messageCircle: {
    path: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
    viewBox: '0 0 24 24'
  },
  stethoscope: {
    path: 'M4.5 3v4M4.5 7h5M19 10a7 7 0 1 1-14 0M19 10v6a3 3 0 0 1-3 3h-1M12 17v-2',
    viewBox: '0 0 24 24'
  },
  calendar: {
    path: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    viewBox: '0 0 24 24'
  },
  user: {
    path: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    viewBox: '0 0 24 24'
  }
}

// 颜色配置
const colors = {
  normal: '#9CA3AF',  // 灰色（未选中）
  selected: '#9333EA' // 紫色（选中）
}

// 图标配置
const iconConfig = [
  { name: 'home', lucideKey: 'home' },
  { name: 'consult', lucideKey: 'messageCircle' },
  { name: 'diagnosis', lucideKey: 'stethoscope' },
  { name: 'appointment', lucideKey: 'calendar' },
  { name: 'profile', lucideKey: 'user' }
]

/**
 * 生成 SVG 字符串
 * @param {Object} iconData - 图标数据
 * @param {string} color - 颜色
 * @param {boolean} isDiagnosisSelected - 是否为"AI诊断"选中状态（需要圆形背景）
 * @param {number} size - 尺寸
 */
function generateSVG(iconData, color, isDiagnosisSelected = false, size = 81) {
  const { path: iconPath, viewBox } = iconData
  
  if (isDiagnosisSelected) {
    // "AI诊断"选中状态：白色轮廓图标 + 紫色圆形背景
    // 圆形背景更大，占据更多空间，形成"弹出"效果
    const circleSize = size * 0.95; // 圆形背景更大，接近整个图标尺寸
    const circleX = size / 2;
    const circleY = size / 2;
    const circleRadius = circleSize / 2;
    
    // 图标尺寸进一步放大，在圆形背景中更突出
    const iconScale = 1.5; // 放大 50%，让图标在圆形中更明显
    const iconSize = 24 * iconScale; // 图标实际尺寸
    const iconOffset = (size - iconSize) / 2; // 居中偏移
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- 紫色圆形背景（更大，形成弹出效果） -->
  <circle cx="${circleX}" cy="${circleY}" r="${circleRadius}" fill="${colors.selected}"/>
  <!-- 白色轮廓图标（放大，更突出） -->
  <g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconScale})">
    <path d="${iconPath}" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`
  } else {
    // 普通状态：轮廓样式（描边，无填充）
    // 直接使用原始 viewBox，让图标自然填充
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
  <path d="${iconPath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }
}

/**
 * 生成所有图标
 */
function generateIcons() {
  const imagesDir = path.resolve(__dirname, '../images')
  
  // 确保目录存在
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  
  console.log('🎨 开始生成 TabBar 图标...\n')
  
  let successCount = 0
  let errorCount = 0
  
  iconConfig.forEach(config => {
    const { name, lucideKey } = config
    const iconData = lucideIcons[lucideKey]
    
    if (!iconData) {
      console.error(`❌ 图标数据不存在: ${lucideKey}`)
      errorCount++
      return
    }
    
    // 判断是否为"AI诊断"图标
    const isDiagnosis = name === 'diagnosis'
    
    // 生成普通状态图标（灰色轮廓）
    const normalSVG = generateSVG(iconData, colors.normal, false)
    const normalPath = path.join(imagesDir, `${name}.svg`)
    
    // 生成选中状态图标
    // "AI诊断"选中状态：白色轮廓 + 紫色圆形背景
    // 其他图标选中状态：紫色轮廓
    const selectedSVG = generateSVG(iconData, colors.selected, isDiagnosis)
    const selectedPath = path.join(imagesDir, `${name}-active.svg`)
    
    try {
      fs.writeFileSync(normalPath, normalSVG, 'utf8')
      console.log(`✅ 生成: ${name}.svg (普通状态)`)
      
      fs.writeFileSync(selectedPath, selectedSVG, 'utf8')
      console.log(`✅ 生成: ${name}-active.svg (选中状态)`)
      
      successCount++
    } catch (error) {
      console.error(`❌ 生成失败: ${name}`, error.message)
      errorCount++
    }
  })
  
  console.log('\n' + '='.repeat(50))
  console.log('📊 生成统计:')
  console.log(`   ✅ 成功: ${successCount * 2} 个 SVG 文件`)
  console.log(`   ❌ 失败: ${errorCount} 个`)
  console.log('='.repeat(50))
  
  console.log('\n⚠️  注意：')
  console.log('   1. 已生成 SVG 格式图标')
  console.log('   2. TabBar 需要 PNG 格式，请使用以下方法转换：')
  console.log('      - 在线工具: https://svgtopng.com/')
  console.log('      - 设计工具: Figma/Sketch 导出为 PNG')
  console.log('      - 命令行: 使用 sharp 或 imagemagick')
  console.log('   3. 建议尺寸: 81px × 81px (@2x: 162px × 162px)')
}

// 运行
if (require.main === module) {
  generateIcons()
}

module.exports = { generateIcons, generateSVG }

