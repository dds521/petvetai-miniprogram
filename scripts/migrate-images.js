// scripts/migrate-images.js
/**
 * 图片资源迁移脚本
 * 将 pet_medical_ai 项目中的图片迁移到小程序项目
 */

const fs = require('fs')
const path = require('path')

// 源项目路径
const sourceDir = path.resolve(__dirname, '../../pet_medical_ai/src/assets')
// 目标项目路径
const targetDir = path.resolve(__dirname, '../images')

// 支持的图片格式
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']

/**
 * 检查并创建目录
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ 创建目录: ${dirPath}`)
  }
}

/**
 * 复制文件
 */
function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target)
    const stats = fs.statSync(source)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`✅ 复制: ${path.basename(source)} (${sizeKB} KB)`)
    return true
  } catch (error) {
    console.error(`❌ 复制失败: ${source}`, error.message)
    return false
  }
}

/**
 * 检查文件大小（小程序限制）
 */
function checkFileSize(filePath) {
  const stats = fs.statSync(filePath)
  const sizeMB = stats.size / (1024 * 1024)
  
  // 小程序单个文件建议不超过 2MB
  if (sizeMB > 2) {
    console.warn(`⚠️  文件较大: ${path.basename(filePath)} (${sizeMB.toFixed(2)} MB)`)
    return false
  }
  
  return true
}

/**
 * 主函数
 */
function migrateImages() {
  console.log('🚀 开始迁移图片资源...\n')
  
  // 确保目标目录存在
  ensureDir(targetDir)
  
  // 检查源目录
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ 源目录不存在: ${sourceDir}`)
    return
  }
  
  // 读取源目录中的所有文件
  const files = fs.readdirSync(sourceDir)
  let copiedCount = 0
  let skippedCount = 0
  let errorCount = 0
  
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase()
    
    // 检查是否为图片文件
    if (imageExtensions.includes(ext)) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)
      
      // 检查目标文件是否已存在
      if (fs.existsSync(targetPath)) {
        console.log(`⏭️  跳过（已存在）: ${file}`)
        skippedCount++
        return
      }
      
      // 检查文件大小
      if (!checkFileSize(sourcePath)) {
        errorCount++
        return
      }
      
      // 复制文件
      if (copyFile(sourcePath, targetPath)) {
        copiedCount++
      } else {
        errorCount++
      }
    }
  })
  
  // 输出统计信息
  console.log('\n' + '='.repeat(50))
  console.log('📊 迁移统计:')
  console.log(`   ✅ 成功复制: ${copiedCount} 个文件`)
  console.log(`   ⏭️  跳过: ${skippedCount} 个文件`)
  console.log(`   ❌ 失败: ${errorCount} 个文件`)
  console.log('='.repeat(50))
  
  // 检查小程序图片要求
  console.log('\n📋 小程序图片要求检查:')
  checkMiniProgramRequirements()
}

/**
 * 检查小程序图片要求
 */
function checkMiniProgramRequirements() {
  const requirements = {
    'TabBar 图标 (PNG)': [
      'home.png', 'home-active.png',
      'consult.png', 'consult-active.png',
      'diagnosis.png', 'diagnosis-active.png',
      'appointment.png', 'appointment-active.png',
      'profile.png', 'profile-active.png'
    ],
    '其他图片': []
  }
  
  const existingFiles = fs.readdirSync(targetDir)
  
  console.log('\nTabBar 图标状态:')
  requirements['TabBar 图标 (PNG)'].forEach(file => {
    if (existingFiles.includes(file)) {
      console.log(`  ✅ ${file}`)
    } else {
      console.log(`  ❌ ${file} (缺失)`)
    }
  })
  
  console.log('\n其他图片文件:')
  existingFiles.forEach(file => {
    if (!requirements['TabBar 图标 (PNG)'].includes(file)) {
      console.log(`  📄 ${file}`)
    }
  })
}

// 运行迁移
if (require.main === module) {
  migrateImages()
}

module.exports = { migrateImages }

