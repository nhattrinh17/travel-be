import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TourService } from './tour.service';
import { BookingTourDto, CreateTourDto, UpdateSpecialOfferTourDto } from './dto/create-tour.dto';
import { UpdateSpecialAccompaniedService, UpdateTourDto } from './dto/update-tour.dto';
import { Public } from '../auth/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { ItinerariesService } from '../itineraries/itineraries.service';
import { SendEmailCustomDto } from 'src/send-mail/send-mail.entity';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @ApiOperationCustom('Tour', 'post')
  create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

  @Post('booking')
  @Public()
  @ApiOperationCustom('Cruise', 'POST')
  async booKingCruise(@Body() dto: BookingTourDto) {
    try {
      return await this.tourService.booking(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('contact')
  @Public()
  @ApiOperationCustom('Cruise', 'POST')
  async ContactCustomer(@Body() dto: SendEmailCustomDto) {
    try {
      return await this.tourService.contactCustomer(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
  @ApiQuery({
    name: 'packetTourId',
    type: Number,
  })
  @ApiQuery({
    name: 'type',
    type: Number,
  })
  @BaseFilter()
  @Public()
  @ApiOperationCustom('Tour ', 'GET')
  findAll(
    //
    @Pagination() pagination: PaginationDto,
    @Query('packetTourId') packetTourId: number,
    @Query('type') type: number,
    @Query('sort') sort: string,
    @Query('typeSort') typeSort: string,
    @Query('search') search: string,
  ) {
    return this.tourService.findAll(search, packetTourId, type, pagination, sort, typeSort);
  }

  @Get('/nav')
  @Public()
  findAllNav() {
    return this.tourService.findAllTourNav();
  }

  @Get('cms')
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

  @Get('booking')
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
  findAllBooking(@Pagination() pagination: PaginationDto, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.tourService.findAllBookingTour(pagination, sort, typeSort);
  }

  @Get(':slug')
  @Public()
  @ApiOperationCustom('Tour', 'get')
  findOne(@Param('slug') slug: string) {
    return this.tourService.findOne(slug);
  }

  @Get(':id/itineraries')
  @BaseFilter()
  @ApiOperationCustom('Tour itineraries', 'POST')
  findAllItineraries(@Param('id') id: string) {
    return this.tourService.getAllItinerariesCruise(+id);
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
