import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @BaseFilter()
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái account',
  })
  @ApiQuery({
    name: 'search',
    description: 'Trạng thái account',
  })
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string, @Query('status') status: string, @Query('phone') phone: string) {
    return this.usersService.findAll(pagination, search, status, phone);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
