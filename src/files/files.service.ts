import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ReclamosService } from 'src/reclamos/reclamos.service';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class FilesService {

    constructor(private readonly reclamoService: ReclamosService) {}
    
    async upload(reclamoId: string, user:User, file: Express.Multer.File){
        const s3 = new S3();
        const uploadParams = {
            Bucket:'s3nicolasgallino',
            Body: file.buffer,
            Key:`imagenes/${user.email}/${reclamoId}-${file.originalname}`,
            ContentType: file.mimetype
        }

        const img = await s3.upload(uploadParams).promise();

        await this.reclamoService.addImage (reclamoId, user, img.Location);

        return img.Location;
    }

}
