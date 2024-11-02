import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJokeDto {
  @ApiProperty({
    description: 'The content of the joke',
    example:
      'Why did the programmer quit his job? Because he didnt get arrays!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The type/category of the joke',
    example: 'programming',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}
