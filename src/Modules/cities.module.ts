import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City, Country } from 'disaster-models';
import { CitiesService } from 'src/Application/cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country])],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
