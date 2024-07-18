import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto, UpdateSpecialOfferTourDto } from './dto/create-tour.dto';
import { UpdateSpecialAccompaniedService, UpdateTourDto } from './dto/update-tour.dto';
import { Public } from '../auth/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @ApiOperationCustom('Tour', 'post')
  create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

  @Post('/special-offer')
  @ApiOperationCustom('Tour special offer', 'post')
  async updateSpecialOffer(@Body() dto: UpdateSpecialOfferTourDto) {
    try {
      return await this.tourService.updateSpecialOffer(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/accompanied-service')
  @ApiOperationCustom('Tour Accompanied Service', 'post')
  async updateAccompaniedService(@Body() dto: UpdateSpecialAccompaniedService) {
    try {
      return await this.tourService.updateAccompaniedService(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/itineraries')
  @ApiOperationCustom('Tour itineraries', 'post')
  async itinerariesTour(@Body() dto: CreateItinerariesDto) {
    try {
      return await this.tourService.addOrUpdateItinerariesTour(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiQuery({
    name: 'packetTourId',
    type: Number,
  })
  @ApiQuery({
    name: 'type',
    type: Number,
  })
  @BaseFilter()
  @ApiOperationCustom('Tour ', 'GET')
  findAll(
    //
    @Pagination() pagination: PaginationDto,
    @Query('packetTourId') packetTourId: number,
    @Query('type') type: number,
    @Query('sort') sort: string,
    @Query('typeSort') typeSort: string,
  ) {
    return this.tourService.findAll(packetTourId, type, pagination, sort, typeSort);
  }

  @Get('cms')
  @Public()
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiQuery({
    name: 'packetTourId',
    type: Number,
  })
  @BaseFilter()
  @ApiOperationCustom('Tour CMS', 'POST')
  findAllCMS(
    //
    @Pagination() pagination: PaginationDto,
    @Query('search') search: string,
    @Query('packetTourId') packetTourId: number,
    @Query('type') type: number,
    @Query('sort') sort: string,
    @Query('typeSort') typeSort: string,
  ) {
    return this.tourService.findAllCMS(search, packetTourId, type, pagination, sort, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Tour', 'get')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Tour', 'patch')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(+id, updateTourDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Tour', 'delete')
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }
}
