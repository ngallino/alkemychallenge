import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './fileFilter.helper';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';


@Controller('imagen')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
 
  @UseGuards( JwtAuthGuard )
  @Post('upload/:reclamoId')
  @UseInterceptors(FileInterceptor('imagen', {
    fileFilter: fileFilter,
    limits: { fileSize: 3000000 },
  })) 
  uploadImage( 
    @UploadedFile() file: Express.Multer.File,
    @Param('reclamoId', ParseUUIDPipe) reclamoId: string,
    @CurrentUser() user: User
    ){
    return this.filesService.upload( reclamoId, user, file );
  }

}
