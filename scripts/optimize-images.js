import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/Noodle Toss');
const outputDir = path.join(__dirname, '../public/Noodle Toss Optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach((file) => {
        if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const inputPath = path.join(inputDir, file);
            // Change extension to .jpg
            const outputFilename = file.replace(/\.[^.]+$/, '.jpg');
            const outputPath = path.join(outputDir, outputFilename);

            sharp(inputPath)
                .resize({ width: 1280 }) // 720p width ample for web bg
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(outputPath)
                .then(() => console.log(`Optimized: ${file}`))
                .catch((err) => console.error(`Error processing ${file}:`, err));
        }
    });
});
