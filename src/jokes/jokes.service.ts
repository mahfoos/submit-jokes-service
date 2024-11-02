import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument } from '../schemas/joke.schema';
import { CreateJokeDto } from '../dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const createdJoke = new this.jokeModel({
      ...createJokeDto,
      isModerated: false,
    });
    return createdJoke.save();
  }

  async findUnmoderated(): Promise<Joke[]> {
    return this.jokeModel
      .find({
        isModerated: false,
      })
      .sort({ createdAt: 1 })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const deletedJoke = await this.jokeModel.findByIdAndDelete(id).exec();

    if (!deletedJoke) {
      throw new NotFoundException(`Joke with ID ${id} not found`);
    }
  }
}
