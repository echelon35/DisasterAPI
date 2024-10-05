import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Source } from './source.entity';
import { Point } from 'geojson';

@Entity('earthquakes')
@ObjectType({ description: 'Earthquakes ' })
export class Earthquake {
  @PrimaryGeneratedColumn()
  id: number;
  // alea: Alea;
  //Dates in UTC format
  @Column()
  premier_releve: Date;
  @Column()
  dernier_releve: Date;
  // @Column({ type: 'geometry' })
  // @Field(() => JSON)
  // point: Point;
  @ManyToOne((type) => Source, (source) => source.id)
  @JoinColumn({ name: 'source' })
  source: Source;
  @Column()
  idFromSource: string;
  @Column({ nullable: true })
  lien_source: string;
  @Column({ default: 0 })
  nb_ressenti: number;
  @Column({ default: true })
  visible: boolean;
  nb_stations: number;
  @Column({ type: 'float' })
  @Field(() => Float)
  magnitude: number;
  precision: number;
  type_magnitude: string;
  profondeur_epicentre: number;
  tsunami: boolean;
  intensite: number;
}
