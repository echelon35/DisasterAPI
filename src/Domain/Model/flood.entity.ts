import { Geometry, Point } from 'geojson';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Source } from './source.entity';
import * as pointQL from 'graphql-geojson-scalar-types';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('floods')
@ObjectType({ description: 'Floods ' })
export class Flood {
  @PrimaryGeneratedColumn()
  id: number;
  // alea: Alea;
  //Dates in UTC format
  @Column()
  premier_releve: Date;
  @Column()
  dernier_releve: Date;
  @Column({ type: 'geometry' })
  @Field((type) => pointQL.Point)
  point: Point;
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
  niveau_alerte: number;
  @Column({ type: 'geometry', nullable: true })
  @Field((type) => pointQL.Geometry)
  surface: Geometry;
}
