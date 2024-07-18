import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CruiseService } from './cruise.service';
import { CreateCruiseDto, CreateOrUpdateRoomTypeDto } from './dto/create-cruise.dto';
import { UpdateCruiseDto, UpdateSpecialOfferCruise } from './dto/update-cruise.dto';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';

@ApiTags('Cruise')
@Controller('cruise')
export class CruiseController {
  constructor(private readonly cruiseService: CruiseService) {}

  @Post()
  @ApiOperationCustom('Cruise', 'POST')
  async create(@Body() createCruiseDto: CreateCruiseDto) {
    try {
      return await this.cruiseService.create(createCruiseDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/special-offer')
  @ApiOperationCustom('Cruise special offer', 'patch')
  async updateSpecialOffer(@Body() dto: UpdateSpecialOfferCruise) {
    try {
      return await this.cruiseService.updateSpecialOffer(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/itineraries')
  @ApiOperationCustom('Cruise itineraries', 'post')
  async itinerariesTour(@Body() dto: CreateItinerariesDto) {
    try {
      return await this.cruiseService.addOrUpdateItinerariesTour(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/room')
  @ApiOperationCustom('Cruise Room', 'patch')
  async addOrUpdateRoomCruise(@Body() dto: CreateOrUpdateRoomTypeDto) {
    try {
      if (dto.roomId) {
        return await this.cruiseService.updateRoomType(dto);
      }
      return this.cruiseService.addRoomType(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiQuery({
    name: 'destinationId',
    type: Number,
  })
  @ApiQuery({
    name: 'detailLocationId',
    type: Number,
  })
  @BaseFilter()
  @ApiOperationCustom('Cruise', 'GET')
  findAll(@Pagination() pagination: PaginationDto, @Query('destinationId') destinationId: number, @Query('detailLocationId') detailLocationId: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.cruiseService.findAll(destinationId, detailLocationId, pagination, sort, typeSort);
  }

  @Get('cms')
  @Public()
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiQuery({
    name: 'destinationId',
    type: Number,
  })
  @ApiQuery({
    name: 'detailLocationId',
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiQuery({
    name: 'typeSort',
    type: String,
  })
  @BaseFilter()
  @ApiOperationCustom('Cruise CMS', 'POST')
  findAllCMS(@Pagination() pagination: PaginationDto, @Query('search') search: string, @Query('destinationId') destinationId: number, @Query('detailLocationId') detailLocationId: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.cruiseService.findAllCMS(search, destinationId, detailLocationId, pagination, sort, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Cruise', 'get')
  findOne(@Param('id') id: string) {
    return this.cruiseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Cruise', 'patch')
  update(@Param('id') id: string, @Body() updateCruiseDto: UpdateCruiseDto) {
    return this.cruiseService.update(+id, updateCruiseDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Cruise', 'delete')
  remove(@Param('id') id: string) {
    return this.cruiseService.remove(+id);
  }
}
