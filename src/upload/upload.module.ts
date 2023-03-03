import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, resolve } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../images'),
        filename: (_, file, callback) => {
          const filePath = `${Date.now()}${extname(file.originalname)}`;
          return callback(null, filePath);
        },
      }),
    }),
  ],

  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
