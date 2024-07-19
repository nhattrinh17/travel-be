import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccompaniedServiceService } from './accompanied-service.service';
import { CreateAccompaniedServiceDto } from './dto/create-accompanied-service.dto';
import { UpdateAccompaniedServiceDto } from './dto/update-accompanied-service.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

@Controller('accompanied-service')
export class AccompaniedServiceController {
  constructor(private readonly accompaniedServiceService: AccompaniedServiceService) {}

  @Post()
  create(@Body() createAccompaniedServiceDto: CreateAccompaniedServiceDto) {
    return this.accompaniedServiceService.create(createAccompaniedServiceDto);
  }

  @Get()
  @BaseFilter()
  findAll(@Pagination() pagination: PaginationDto) {
    return this.accompaniedServiceService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accompaniedServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccompaniedServiceDto: UpdateAccompaniedServiceDto) {
    return this.accompaniedServiceService.update(+id, updateAccompaniedServiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accompaniedServiceService.remove(+id);
  // }
}
