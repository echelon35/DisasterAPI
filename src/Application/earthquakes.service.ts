import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Earthquake } from 'src/Domain/Model/earthquake.entity';
import { NearestTownDto } from 'src/DTO/NearestTown.dto';
import { Repository } from 'typeorm';
import { CitiesService } from './cities.service';

@Injectable()
export class EarthquakesService {
  constructor(
    @InjectRepository(Earthquake)
    private readonly earthquakeRepository: Repository<Earthquake>,
    private readonly cityService: CitiesService,
  ) {}

  async findAll() {
    return this.earthquakeRepository.find();
  }

  async findOne(id: number) {
    const earthquake = this.earthquakeRepository
      .createQueryBuilder('earthquake')
      .leftJoinAndSelect('earthquake.source', 'source')
      .where({ id: id })
      .getOne();
    if (!earthquake) {
      throw new UserInputError(`Earthquake ${id} does not exist`);
    }
    return earthquake;
  }

  async findNearestTown(id: number): Promise<NearestTownDto[]> {
    const eq = await this.findOne(id);
    if (eq == null) {
      throw new NotFoundException('Seisme non trouvé');
    }

    let population = 100000; //km
    let nearestCity = [];

    while (population > 0 && nearestCity?.length == 0) {
      nearestCity = await this.cityService.searchNearestCityOfPointInPerimeter(
        eq.point,
        population,
      );
      console.log(population);
      population = population === 1 ? 0 : population / 10;
    }

    return nearestCity;
  }
}
