import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './fileNamer.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image:/reclamoId')
  @UseInterceptors(FileInterceptor('imagen', {
    fileFilter: fileFilter,
    limits: { fileSize: 3000 },
    storage: diskStorage ({
      destination: './static/imagenes',
      filename: fileNamer
    }) 
  })) 
  uploadImage( 
    @UploadedFile() file: Express.Multer.File,
    @Param('reclamoId', ParseUUIDPipe) reclamoId: string 
    ){
    
    return { fieldName: file.originalname, reclamoId };

  }

}
