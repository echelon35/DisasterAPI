import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Nearest city' })
export class NearestTownDto {
  @Field()
  ville: string;
  @Field(() => Float)
  distance: number;
  @Field()
  pays: string;
}
