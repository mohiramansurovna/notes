import path from 'path';
import { readdirSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    const stickersDir = path.join(process.cwd(),'public/stickers');
    const stickerFiles = readdirSync(stickersDir);

    const stickers = stickerFiles.map(file => {
        return file.replace(/\.[^/.]+$/, ""); 
    });
    return NextResponse.json(stickers);
}