import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadFile(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'products' }, (error: any, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        })
        .end(file.buffer);
    });
  }
}
