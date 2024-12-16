import { Column, Entity } from 'typeorm';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Disaster } from './disaster.entity';

@Entity('earthquakes')
@ObjectType({ description: 'Earthquakes ' })
export class Earthquake extends Disaster {
  @Column({ type: 'float' })
  @Field(() => Float)
  magnitude: number;
  precision: number;
  type_magnitude: string;
  profondeur_epicentre: number;
  tsunami: boolean;
  intensite: number;
}
