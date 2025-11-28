#!/usr/bin/env python3
"""
SVG 转 PNG 转换脚本
将生成的 SVG 图标转换为 PNG 格式（用于 TabBar）

依赖安装：
  pip3 install cairosvg pillow

或者使用：
  pip3 install svglib reportlab
"""

import os
import sys
from pathlib import Path

def convert_with_cairosvg():
    """使用 cairosvg 转换（推荐）"""
    try:
        import cairosvg
        print('📦 使用 cairosvg 进行转换...\n')
        
        images_dir = Path(__file__).parent.parent / 'images'
        svg_files = [
            'home.svg', 'home-active.svg',
            'consult.svg', 'consult-active.svg',
            'diagnosis.svg', 'diagnosis-active.svg',
            'appointment.svg', 'appointment-active.svg',
            'profile.svg', 'profile-active.svg'
        ]
        
        success_count = 0
        error_count = 0
        
        for svg_file in svg_files:
            svg_path = images_dir / svg_file
            png_path = images_dir / svg_file.replace('.svg', '.png')
            
            if not svg_path.exists():
                print(f'⚠️  SVG 文件不存在: {svg_file}')
                continue
            
            try:
                # 转换为 PNG (162px × 162px, @2x)
                cairosvg.svg2png(
                    url=str(svg_path),
                    write_to=str(png_path),
                    output_width=162,
                    output_height=162
                )
                
                size_kb = png_path.stat().st_size / 1024
                print(f'✅ 转换: {svg_file} → {svg_file.replace(".svg", ".png")} ({size_kb:.2f} KB)')
                success_count += 1
            except Exception as e:
                print(f'❌ 转换失败: {svg_file} - {str(e)}')
                error_count += 1
        
        print('\n' + '=' * 50)
        print('📊 转换统计:')
        print(f'   ✅ 成功: {success_count} 个文件')
        print(f'   ❌ 失败: {error_count} 个文件')
        print('=' * 50)
        
        return success_count > 0
    except ImportError:
        print('⚠️  cairosvg 未安装')
        return False

def convert_with_svglib():
    """使用 svglib 转换（备选）"""
    try:
        from svglib.svglib import svg2rlg
        from reportlab.graphics import renderPM
        print('📦 使用 svglib 进行转换...\n')
        
        images_dir = Path(__file__).parent.parent / 'images'
        svg_files = [
            'home.svg', 'home-active.svg',
            'consult.svg', 'consult-active.svg',
            'diagnosis.svg', 'diagnosis-active.svg',
            'appointment.svg', 'appointment-active.svg',
            'profile.svg', 'profile-active.svg'
        ]
        
        success_count = 0
        error_count = 0
        
        for svg_file in svg_files:
            svg_path = images_dir / svg_file
            png_path = images_dir / svg_file.replace('.svg', '.png')
            
            if not svg_path.exists():
                print(f'⚠️  SVG 文件不存在: {svg_file}')
                continue
            
            try:
                # 读取 SVG
                drawing = svg2rlg(str(svg_path))
                
                # 调整尺寸
                if drawing:
                    drawing.width = 162
                    drawing.height = 162
                    drawing.scale(162 / drawing.width, 162 / drawing.height)
                
                # 渲染为 PNG
                renderPM.drawToFile(drawing, str(png_path), fmt='PNG')
                
                size_kb = png_path.stat().st_size / 1024
                print(f'✅ 转换: {svg_file} → {svg_file.replace(".svg", ".png")} ({size_kb:.2f} KB)')
                success_count += 1
            except Exception as e:
                print(f'❌ 转换失败: {svg_file} - {str(e)}')
                error_count += 1
        
        print('\n' + '=' * 50)
        print('📊 转换统计:')
        print(f'   ✅ 成功: {success_count} 个文件')
        print(f'   ❌ 失败: {error_count} 个文件')
        print('=' * 50)
        
        return success_count > 0
    except ImportError:
        print('⚠️  svglib 未安装')
        return False

def main():
    print('🔄 开始将 SVG 转换为 PNG...\n')
    
    images_dir = Path(__file__).parent.parent / 'images'
    
    # 检查 SVG 文件是否存在
    svg_files = [
        'home.svg', 'home-active.svg',
        'consult.svg', 'consult-active.svg',
        'diagnosis.svg', 'diagnosis-active.svg',
        'appointment.svg', 'appointment-active.svg',
        'profile.svg', 'profile-active.svg'
    ]
    
    existing_svg = [f for f in svg_files if (images_dir / f).exists()]
    
    if not existing_svg:
        print('❌ 未找到 SVG 文件，请先运行: node scripts/generate-tabbar-icons.js')
        return
    
    print(f'📋 找到 {len(existing_svg)} 个 SVG 文件\n')
    
    # 尝试使用 cairosvg
    success = convert_with_cairosvg()
    
    if not success:
        # 尝试使用 svglib
        success = convert_with_svglib()
    
    if not success:
        print('\n' + '=' * 50)
        print('⚠️  自动转换失败')
        print('=' * 50)
        print('\n请使用以下方法之一：')
        print('\n方法 1: 安装 Python 依赖')
        print('  pip3 install cairosvg')
        print('  python3 scripts/svg_to_png.py')
        print('\n方法 2: 使用在线工具')
        print('  访问: https://svgtopng.com/')
        print('  上传 SVG 文件，下载 PNG 格式')
        print('  尺寸设置为: 162px × 162px')
        print('\n方法 3: 使用设计工具')
        print('  在 Figma/Sketch 中打开 SVG')
        print('  导出为 PNG，尺寸 162px × 162px')

if __name__ == '__main__':
    main()

