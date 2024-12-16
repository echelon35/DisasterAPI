import { Module } from '@nestjs/common';
import { EarthquakesResolver } from '../Resolvers/earthquakes.resolver';
import { EarthquakesService } from '../Application/earthquakes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from 'src/Domain/Model/source.entity';
import { Earthquake } from 'src/Domain/Model/earthquake.entity';
import { CitiesModule } from './cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Earthquake, Source]), CitiesModule],
  providers: [EarthquakesResolver, EarthquakesService],
})
export class EarthquakesModule {}
