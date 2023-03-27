import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ReclamosService } from './reclamos.service';
import { Reclamo } from './entities/reclamo.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { ReclamosResolver } from './reclamos.resolver';
import { DetalleDeCompra } from './entities/detalledecompra.entity';


@Module({
  providers: [
    ReclamosResolver, 
    ReclamosService
  ],
  imports: [
    TypeOrmModule.forFeature([ Reclamo, DetalleDeCompra])
  ],
  exports: [
    ReclamosService,
    TypeOrmModule,
  ]
})
export class ReclamosModule {}
