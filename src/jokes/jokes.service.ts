import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joke, JokeDocument } from '../schemas/joke.schema';
import { CreateJokeDto } from '../dto/create-joke.dto';
import { UpdateJokeDto } from '../dto/update-joke.dto';

@Injectable()
export class JokesService {
  constructor(@InjectModel(Joke.name) private jokeModel: Model<JokeDocument>) {}

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const createdJoke = new this.jokeModel(createJokeDto);
    return createdJoke.save();
  }

  async findAll(): Promise<Joke[]> {
    return this.jokeModel.find({ isActive: true }).exec();
  }

  async findUnmoderated(): Promise<Joke[]> {
    return this.jokeModel
      .find({
        isModerated: false,
        isActive: true,
      })
      .exec();
  }

  async findOne(id: string): Promise<Joke> {
    const joke = await this.jokeModel.findById(id).exec();
    if (!joke) {
      throw new NotFoundException(`Joke with ID ${id} not found`);
    }
    return joke;
  }

  async update(id: string, updateJokeDto: UpdateJokeDto): Promise<Joke> {
    const updatedJoke = await this.jokeModel
      .findByIdAndUpdate(id, updateJokeDto, { new: true })
      .exec();
    if (!updatedJoke) {
      throw new NotFoundException(`Joke with ID ${id} not found`);
    }
    return updatedJoke;
  }

  async remove(id: string): Promise<Joke> {
    const deletedJoke = await this.jokeModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
    if (!deletedJoke) {
      throw new NotFoundException(`Joke with ID ${id} not found`);
    }
    return deletedJoke;
  }

  async getJokeTypes(): Promise<string[]> {
    const types = await this.jokeModel.distinct('type').exec();
    return types;
  }
}
