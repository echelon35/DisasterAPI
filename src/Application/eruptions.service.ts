import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Eruption } from 'src/Domain/Model/eruption.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EruptionsService {
  constructor(
    @InjectRepository(Eruption)
    private readonly eruptionRepository: Repository<Eruption>,
  ) {}

  async findAll() {
    return this.eruptionRepository.find();
  }

  async findOne(id: number) {
    const eruption = await this.eruptionRepository.findOne({
      where: { id },
    });
    if (!eruption) {
      throw new UserInputError(`Eruption ${id} does not exist`);
    }
    return eruption;
  }
}
