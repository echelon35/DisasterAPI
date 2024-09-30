import { Module } from '@nestjs/common';
import { AleasResolver } from './aleas.resolver';
import { AleasService } from './aleas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alea } from './entities/alea.entity/alea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alea])],
  providers: [AleasResolver, AleasService],
})
export class AleasModule {}
