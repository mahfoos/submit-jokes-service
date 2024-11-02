import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from '../dto/create-joke.dto';
import { UpdateJokeDto } from '../dto/update-joke.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new joke' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Joke created successfully',
  })
  create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jokes' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all jokes' })
  findAll() {
    return this.jokesService.findAll();
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
    return this.jokesService.getJokeTypes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a joke by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns a joke' })
  findOne(@Param('id') id: string) {
    return this.jokesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a joke' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Joke updated successfully',
  })
  update(@Param('id') id: string, @Body() updateJokeDto: UpdateJokeDto) {
    return this.jokesService.update(id, updateJokeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a joke' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Joke deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.jokesService.remove(id);
  }
}
