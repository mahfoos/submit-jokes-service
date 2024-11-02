import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { Joke, JokeSchema } from '../schemas/joke.schema';
import { TypesService } from './types.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
  controllers: [JokesController],
  providers: [JokesService, TypesService],
})
export class JokesModule {}
