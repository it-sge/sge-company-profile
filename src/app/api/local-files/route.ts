import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePathParam = searchParams.get('path');

    if (!filePathParam || !filePathParam.startsWith('/uploads/')) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const absolutePath = path.join(process.cwd(), 'public', filePathParam);
    
    // Basic security check to prevent directory traversal
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!absolutePath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const fileBuffer = await readFile(absolutePath);
    
    let mimeType = 'application/octet-stream';
    const ext = absolutePath.split('.').pop()?.toLowerCase();
    
    if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
    else if (ext === 'png') mimeType = 'image/png';
    else if (ext === 'webp') mimeType = 'image/webp';
    else if (ext === 'avif') mimeType = 'image/avif';
    else if (ext === 'gif') mimeType = 'image/gif';
    else if (ext === 'pdf') mimeType = 'application/pdf';
    else if (ext === 'svg') mimeType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 });
  }
}
