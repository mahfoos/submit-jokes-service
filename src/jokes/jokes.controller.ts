import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from '../dto/create-joke.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TypesService } from './types.service';

@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(
    private readonly jokesService: JokesService,
    private readonly typesService: TypesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new joke' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Joke created successfully',
  })
  async create(@Body() createJokeDto: CreateJokeDto) {
    // Validate joke type against available types
    const availableTypes = await this.typesService.getTypes();
    if (!availableTypes.includes(createJokeDto.type)) {
      throw new BadRequestException(
        `Invalid joke type. Available types: ${availableTypes.join(', ')}`,
      );
    }
    return this.jokesService.create(createJokeDto);
  }

  @Get('unmoderated')
  @ApiOperation({ summary: 'Get unmoderated jokes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns unmoderated jokes',
  })
  findUnmoderated() {
    return this.jokesService.findUnmoderated();
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all joke types' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all joke types' })
  getJokeTypes() {
    return this.typesService.getTypes();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a joke (used by moderator)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Joke deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.jokesService.remove(id);
  }
}
