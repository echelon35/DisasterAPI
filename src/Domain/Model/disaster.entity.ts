import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as pointQL from 'graphql-geojson-scalar-types';
import { Source } from './source.entity';

// @Entity('earthquakes')
@Index(['source', 'idFromSource'], { unique: true })
@ObjectType({ description: 'Disasters ' })
export class Disaster {
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
  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
