import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function optimizeImages() {
  const dirPath = path.join(process.cwd(), 'public', 'project');
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Only process images, skip pdfs and already webp
    if (['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('.webp')) {
      const oldPath = path.join(dirPath, file);
      
      // Clean up the name if it has multiple extensions like .jpg.jpeg
      let baseName = file;
      baseName = baseName.replace(/\.jpg\.jpeg$/i, '');
      baseName = baseName.replace(/\.jpeg$/i, '');
      baseName = baseName.replace(/\.jpg$/i, '');
      baseName = baseName.replace(/\.png$/i, '');
      
      const newFileName = `${baseName}.webp`;
      const newPath = path.join(dirPath, newFileName);

      console.log(`Converting: ${file} -> ${newFileName}`);
      
      try {
        await sharp(oldPath)
          .resize({ width: 1920, withoutEnlargement: true }) // Prevent upscaling
          .webp({ quality: 80 })
          .toFile(newPath);
          
        console.log(`✅ Success: ${newFileName}`);
        
        // Delete the original file to save space
        await fs.unlink(oldPath);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err);
      }
    }
  }
}

optimizeImages().then(() => console.log('Done optimizing images!'));
