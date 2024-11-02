import { PartialType } from '@nestjs/swagger';
import { CreateJokeDto } from './create-joke.dto';

export class UpdateJokeDto extends PartialType(CreateJokeDto) {}
