// scripts/create-placeholder-icons.js
/**
 * 创建占位 PNG 图标
 * 由于 Node.js 版本限制，使用 base64 编码的简单 PNG 图标
 */

const fs = require('fs')
const path = require('path')

const imagesDir = path.resolve(__dirname, '../images')

// 简单的 81x81 PNG 图标（灰色，1x）
// 这是一个最小的有效 PNG 文件（1x1 像素，透明背景，放大到 81x81）
const placeholderPNG1x = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
)

// 162x162 PNG 图标（@2x）
// 使用更大的占位图标
const placeholderPNG2x = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
)

/**
 * 创建简单的彩色 PNG 图标
 * 使用纯色填充作为占位符
 */
function createColoredPNG(color, size = 162) {
  // 这是一个简单的 PNG 文件结构
  // 实际应该使用图片处理库，这里创建一个最小可用的 PNG
  // 注意：这是一个占位符，实际使用时应该替换为真实图标
  
  // 对于小程序，我们可以创建一个简单的纯色 PNG
  // 但由于 Node.js 版本限制，我们使用 base64 编码的简单图标
  
  // 返回一个基本的 PNG 数据（透明背景）
  return placeholderPNG2x
}

/**
 * 从 SVG 读取并创建简单的 PNG 占位符
 */
function createPlaceholderIcons() {
  console.log('🎨 创建占位 PNG 图标...\n')
  
  const icons = [
    { name: 'home', color: '#9CA3AF' },
    { name: 'home-active', color: '#9333EA' },
    { name: 'consult', color: '#9CA3AF' },
    { name: 'consult-active', color: '#9333EA' },
    { name: 'diagnosis', color: '#9CA3AF' },
    { name: 'diagnosis-active', color: '#9333EA' },
    { name: 'appointment', color: '#9CA3AF' },
    { name: 'appointment-active', color: '#9333EA' },
    { name: 'profile', color: '#9CA3AF' },
    { name: 'profile-active', color: '#9333EA' }
  ]
  
  let successCount = 0
  
  icons.forEach(icon => {
    const pngPath = path.join(imagesDir, `${icon.name}.png`)
    
    try {
      // 检查是否已存在
      if (fs.existsSync(pngPath)) {
        console.log(`⏭️  跳过（已存在）: ${icon.name}.png`)
        return
      }
      
      // 创建占位 PNG（使用 @2x 尺寸）
      const pngData = createColoredPNG(icon.color, 162)
      fs.writeFileSync(pngPath, pngData)
      
      console.log(`✅ 创建: ${icon.name}.png (占位图标)`)
      successCount++
    } catch (error) {
      console.error(`❌ 创建失败: ${icon.name}.png`, error.message)
    }
  })
  
  console.log('\n' + '='.repeat(50))
  console.log('📊 创建统计:')
  console.log(`   ✅ 成功: ${successCount} 个占位图标`)
  console.log('='.repeat(50))
  console.log('\n⚠️  注意：')
  console.log('   这些是占位图标，建议替换为真实图标')
  console.log('   可以使用以下方法获取真实图标：')
  console.log('   1. 在线工具: https://svgtopng.com/')
  console.log('   2. 从 SVG 文件转换')
  console.log('   3. 使用设计工具导出')
}

// 运行
if (require.main === module) {
  createPlaceholderIcons()
}

module.exports = { createPlaceholderIcons }

