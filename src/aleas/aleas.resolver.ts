import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Alea } from './entities/alea.entity/alea.entity';
import { AleasService } from './aleas.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class AleasResolver {
  constructor(private readonly aleaService: AleasService) {}

  @Query(() => [Alea], { name: 'aleas' })
  async FindAll() {
    return this.aleaService.findAll();
  }

  @Query(() => [Alea], { name: 'alea' })
  async FindOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.aleaService.findOne(id);
  }
}
