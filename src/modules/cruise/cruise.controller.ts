import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CruiseService } from './cruise.service';
import { BookingCruiseDto, CreateCruiseDto, CreateOrUpdateRoomTypeDto } from './dto/create-cruise.dto';
import { UpdateCruiseDetailLocation, UpdateCruiseDto, UpdateOtherBookingService, UpdateSpecialAccompaniedService, UpdateSpecialOfferCruise } from './dto/update-cruise.dto';
import { ApiOperationCustom, BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';
import { CreateItinerariesDto } from '../itineraries/dto/create-itineraries.dto';
import { SendEmailCustomDto } from 'src/send-mail/send-mail.entity';

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

  @Post('booking')
  @Public()
  @ApiOperationCustom('Cruise', 'POST')
  async booKingCruise(@Body() dto: BookingCruiseDto) {
    try {
      return await this.cruiseService.booking(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('contact')
  @Public()
  @ApiOperationCustom('Cruise', 'POST')
  async ContactCustomer(@Body() dto: SendEmailCustomDto) {
    try {
      return await this.cruiseService.contactCustomer(dto);
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

  @Post('/accompanied-service')
  @ApiOperationCustom('Tour Accompanied Service', 'post')
  async updateAccompaniedService(@Body() dto: UpdateSpecialAccompaniedService) {
    try {
      return await this.cruiseService.updateAccompaniedService(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/detail-location')
  @ApiOperationCustom('Tour Detail Location', 'post')
  async updateDetailLocation(@Body() dto: UpdateCruiseDetailLocation) {
    try {
      return await this.cruiseService.updateCruiseDetailLocation(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/booking-service')
  @ApiOperationCustom('Tour Accompanied Service', 'post')
  async updateOtherBookingService(@Body() dto: UpdateOtherBookingService) {
    try {
      return await this.cruiseService.updateOtherBookingService(dto);
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
      return await this.cruiseService.addRoomType(dto);
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
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @BaseFilter()
  @ApiOperationCustom('Cruise', 'GET')
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string, @Query('destinationId') destinationId: number, @Query('detailLocationId') detailLocationId: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.cruiseService.findAll(search, destinationId, detailLocationId, pagination, sort, typeSort);
  }

  @Get('cms')
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
    return this.cruiseService.findAllBookingCruise(pagination, sort, typeSort);
  }

  @Get(':slug')
  @Public()
  @ApiOperationCustom('Cruise', 'get')
  findOne(@Param('slug') slug: string) {
    return this.cruiseService.findOne(slug);
  }

  @Get(':slug/seo')
  @Public()
  @ApiOperationCustom('Cruise', 'get')
  findOneDataSEO(@Param('slug') slug: string) {
    return this.cruiseService.findOneSEO(slug);
  }

  @Get(':id/room')
  @BaseFilter()
  @ApiQuery({
    name: 'itinerariesId',
    type: Number,
  })
  @ApiOperationCustom('Cruise CMS', 'POST')
  findAllRoom(@Param('id') id: string, @Query('itinerariesId') itinerariesId: string) {
    return this.cruiseService.getAllRoomCruise(+id, +itinerariesId);
  }

  @Get(':id/itineraries')
  @BaseFilter()
  @ApiOperationCustom('Cruise CMS', 'POST')
  findAllItineraries(@Param('id') id: string) {
    return this.cruiseService.getAllItinerariesCruise(+id);
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
