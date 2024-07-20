import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiDocsPagination } from 'src/setup-swagger';
import { Public } from '../auth/decorators';

@ApiTags('Destination')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @ApiOperationCustom('Destination', 'post')
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    try {
      return await this.destinationService.create(createDestinationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiOperationCustom('Destination', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('seeDetail') seeDetail) {
    return this.destinationService.findAll(pagination, seeDetail);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Destination', 'patch')
  async update(@Param('id') id: string, @Body() updateDestinationDto: UpdateDestinationDto) {
    try {
      return await this.destinationService.update(+id, updateDestinationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Destination', 'delete')
  remove(@Param('id') id: string) {
    return this.destinationService.remove(+id);
  }
}
