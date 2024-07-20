import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { CreateItinerariesDto } from './dto/create-itineraries.dto';
import { UpdateItinerariesDto } from './dto/update-itineraries.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

@ApiTags('Itineraries')
@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post()
  @ApiOperationCustom('Itineraries', 'Post')
  async create(@Body() createItinerariesDto: CreateItinerariesDto) {
    try {
      return await this.itinerariesService.create(createItinerariesDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Get()
  // @BaseFilter()
  // @ApiOperationCustom('Itineraries', 'get')
  // findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string) {
  //   return this.itinerariesService.findAll(search, pagination);
  // }

  @Get(':id')
  @ApiOperationCustom('Itineraries', 'get', true, true)
  findOne(@Param('id') id: string) {
    return this.itinerariesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Itineraries', 'patch')
  async update(@Param('id') id: string, @Body() updateItinerariesDto: UpdateItinerariesDto) {
    try {
      return await this.itinerariesService.update(+id, updateItinerariesDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
