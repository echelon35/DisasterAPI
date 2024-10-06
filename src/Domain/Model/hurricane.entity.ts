import { Geometry, Point } from 'geojson';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  MultiLineString,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Source } from './source.entity';
import * as pointQL from 'graphql-geojson-scalar-types';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('hurricanes')
@ObjectType({ description: 'Hurricanes' })
export class Hurricane {
  @PrimaryGeneratedColumn()
  id: number;
  // alea: Alea;
  //Dates in UTC format
  @Column()
  premier_releve: Date;
  @Column()
  dernier_releve: Date;
  @Column({ type: 'geometry' })
  @Field(() => pointQL.Point)
  point: Point;
  @ManyToOne(() => Source, (source) => source.id)
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
  @Column()
  name: string;
  vitesse_max: number;
  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'MultiLineString',
    srid: 4326,
  })
  @Field(() => pointQL.MultiLineString)
  path: MultiLineString;
  @Column({ type: 'geometry', nullable: true })
  @Field(() => pointQL.Geometry)
  surface: Geometry;
  @Column({ type: 'geometry', nullable: true })
  @Field(() => pointQL.Geometry)
  forecast: Geometry;
}