import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { CreateServiceBookingDto } from './dto/create-service-booking.dto';
import { UpdateServiceBookingDto } from './dto/update-service-booking.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

@Controller('service-booking')
export class ServiceBookingController {
  constructor(private readonly serviceBookingService: ServiceBookingService) {}

  @Post()
  create(@Body() createServiceBookingDto: CreateServiceBookingDto) {
    return this.serviceBookingService.create(createServiceBookingDto);
  }

  @Get()
  @BaseFilter()
  findAll(@Pagination() pagination: PaginationDto) {
    return this.serviceBookingService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceBookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceBookingDto: UpdateServiceBookingDto) {
    return this.serviceBookingService.update(+id, updateServiceBookingDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serviceBookingService.remove(+id);
  // }
}
