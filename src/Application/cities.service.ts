import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'disaster-models';
import { Point } from 'geojson';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async searchNearestCityOfPointInPerimeter(
    point: Point,
    population: number = 100000,
    citiesToDisplay = 10,
  ) {
    const perimeter = 2688221;
    const nearestCity = await this.cityRepository.query(`
      SELECT c.namefr as ville, countries.namefr as pays, ST_Distance(ST_GeomFromGeoJSON('${JSON.stringify(point)}')::geography, c.geom) as distance
          FROM cities c LEFT JOIN countries on countries.id = c."paysId" WHERE c.population > ${population} AND ST_DWithin(ST_GeomFromGeoJSON('${JSON.stringify(point)}')::geography, c.geom::geography, ${perimeter}) ORDER BY ST_Distance(ST_GeomFromGeoJSON('${JSON.stringify(point)}')::geography, c.geom::geography) LIMIT ${citiesToDisplay};
      `);
    return nearestCity;
  }
}
