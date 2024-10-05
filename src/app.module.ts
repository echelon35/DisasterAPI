import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AleasModule } from './Modules/aleas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EarthquakesModule } from './Modules/earthquakes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DISASTER_API_DB_HOST,
      port: parseInt(process.env.DISASTER_API_DB_PORT),
      username: process.env.DISASTER_API_DB_USER,
      password: process.env.DISASTER_API_DB_PASSWORD,
      database: process.env.DISASTER_API_DB_NAME,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    AleasModule,
    EarthquakesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
