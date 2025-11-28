// scripts/svg-to-png.js
/**
 * SVG 转 PNG 转换脚本
 * 将生成的 SVG 图标转换为 PNG 格式（用于 TabBar）
 * 
 * 使用方法：
 * 1. 安装依赖: npm install sharp (推荐) 或使用 ImageMagick
 * 2. 运行脚本: node scripts/svg-to-png.js
 */

const fs = require('fs')
const path = require('path')

const imagesDir = path.resolve(__dirname, '../images')
const svgFiles = [
  'home.svg', 'home-active.svg',
  'consult.svg', 'consult-active.svg',
  'diagnosis.svg', 'diagnosis-active.svg',
  'appointment.svg', 'appointment-active.svg',
  'profile.svg', 'profile-active.svg'
]

/**
 * 使用 sharp 库转换（推荐）
 */
async function convertWithSharp() {
  try {
    const sharp = require('sharp')
    console.log('📦 使用 sharp 库进行转换...\n')
    
    let successCount = 0
    let errorCount = 0
    
    for (const svgFile of svgFiles) {
      const svgPath = path.join(imagesDir, svgFile)
      const pngPath = path.join(imagesDir, svgFile.replace('.svg', '.png'))
      
      if (!fs.existsSync(svgPath)) {
        console.warn(`⚠️  SVG 文件不存在: ${svgFile}`)
        continue
      }
      
      try {
        // 读取 SVG 文件
        const svgBuffer = fs.readFileSync(svgPath)
        
        // 转换为 PNG (81px × 81px，@2x 为 162px × 162px)
        await sharp(svgBuffer)
          .resize(162, 162) // @2x 尺寸
          .png()
          .toFile(pngPath)
        
        const stats = fs.statSync(pngPath)
        const sizeKB = (stats.size / 1024).toFixed(2)
        console.log(`✅ 转换: ${svgFile} → ${svgFile.replace('.svg', '.png')} (${sizeKB} KB)`)
        successCount++
      } catch (error) {
        console.error(`❌ 转换失败: ${svgFile}`, error.message)
        errorCount++
      }
    }
    
    console.log('\n' + '='.repeat(50))
    console.log('📊 转换统计:')
    console.log(`   ✅ 成功: ${successCount} 个文件`)
    console.log(`   ❌ 失败: ${errorCount} 个文件`)
    console.log('='.repeat(50))
    
    return successCount > 0
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('⚠️  sharp 库未安装')
      return false
    }
    throw error
  }
}

/**
 * 使用 ImageMagick 转换（备选方案）
 */
function convertWithImageMagick() {
  const { execSync } = require('child_process')
  
  try {
    // 检查 ImageMagick 是否安装
    execSync('which convert || which magick', { stdio: 'ignore' })
    console.log('📦 使用 ImageMagick 进行转换...\n')
    
    const convertCmd = execSync('which convert', { encoding: 'utf8' }).trim() || 'magick'
    let successCount = 0
    let errorCount = 0
    
    for (const svgFile of svgFiles) {
      const svgPath = path.join(imagesDir, svgFile)
      const pngPath = path.join(imagesDir, svgFile.replace('.svg', '.png'))
      
      if (!fs.existsSync(svgPath)) {
        console.warn(`⚠️  SVG 文件不存在: ${svgFile}`)
        continue
      }
      
      try {
        // 使用 ImageMagick 转换
        execSync(`${convertCmd} -background none -resize 162x162 "${svgPath}" "${pngPath}"`, {
          stdio: 'ignore'
        })
        
        const stats = fs.statSync(pngPath)
        const sizeKB = (stats.size / 1024).toFixed(2)
        console.log(`✅ 转换: ${svgFile} → ${svgFile.replace('.svg', '.png')} (${sizeKB} KB)`)
        successCount++
      } catch (error) {
        console.error(`❌ 转换失败: ${svgFile}`, error.message)
        errorCount++
      }
    }
    
    console.log('\n' + '='.repeat(50))
    console.log('📊 转换统计:')
    console.log(`   ✅ 成功: ${successCount} 个文件`)
    console.log(`   ❌ 失败: ${errorCount} 个文件`)
    console.log('='.repeat(50))
    
    return successCount > 0
  } catch (error) {
    console.log('⚠️  ImageMagick 未安装或不可用')
    return false
  }
}

/**
 * 主函数
 */
async function convertSVGToPNG() {
  console.log('🔄 开始将 SVG 转换为 PNG...\n')
  
  // 检查 SVG 文件是否存在
  const existingSvgFiles = svgFiles.filter(file => 
    fs.existsSync(path.join(imagesDir, file))
  )
  
  if (existingSvgFiles.length === 0) {
    console.error('❌ 未找到 SVG 文件，请先运行: node scripts/generate-tabbar-icons.js')
    return
  }
  
  console.log(`📋 找到 ${existingSvgFiles.length} 个 SVG 文件\n`)
  
  // 尝试使用 sharp
  const sharpSuccess = await convertWithSharp()
  
  if (!sharpSuccess) {
    // 如果 sharp 不可用，尝试 ImageMagick
    const magickSuccess = convertWithImageMagick()
    
    if (!magickSuccess) {
      console.log('\n' + '='.repeat(50))
      console.log('⚠️  自动转换失败')
      console.log('='.repeat(50))
      console.log('\n请使用以下方法之一手动转换：')
      console.log('\n方法 1: 安装 sharp 库')
      console.log('  npm install sharp')
      console.log('  node scripts/svg-to-png.js')
      console.log('\n方法 2: 使用在线工具')
      console.log('  访问: https://svgtopng.com/')
      console.log('  上传 SVG 文件，下载 PNG 格式')
      console.log('  尺寸设置为: 162px × 162px')
      console.log('\n方法 3: 使用设计工具')
      console.log('  在 Figma/Sketch 中打开 SVG')
      console.log('  导出为 PNG，尺寸 162px × 162px')
      console.log('\n方法 4: 安装 ImageMagick')
      console.log('  macOS: brew install imagemagick')
      console.log('  Linux: apt-get install imagemagick')
      console.log('  Windows: 下载安装包')
    }
  }
}

// 运行
if (require.main === module) {
  convertSVGToPNG().catch(console.error)
}

module.exports = { convertSVGToPNG }

