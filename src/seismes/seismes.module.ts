import { Module } from '@nestjs/common';
import { SeismesResolver } from './seismes.resolver';
import { SeismesService } from './seismes.service';

@Module({
  providers: [SeismesResolver, SeismesService]
})
export class SeismesModule {}
