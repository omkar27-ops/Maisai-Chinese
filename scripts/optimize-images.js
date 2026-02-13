
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/Toss-jpg');
const outputDir = path.join(__dirname, '../public/Toss-WebP');

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
            const outputFilename = file.replace(/\.[^.]+$/, '.webp');
            const outputPath = path.join(outputDir, outputFilename);

            sharp(inputPath)
                .resize({ width: 1280 }) // Keep reasonable width
                .webp({ quality: 90 }) // High quality WebP

                .toFile(outputPath)
                .then(() => console.log(`Optimized: ${file}`))
                .catch((err) => console.error(`Error processing ${file}:`, err));
        }
    });
});
