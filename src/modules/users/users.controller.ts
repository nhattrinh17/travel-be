import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { SendEmailHomeDto } from 'src/send-mail/send-mail.entity';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendMailService: SendMailService,
  ) {}

  // @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Post('send-mail')
  sendMail(@Body() dto: SendEmailHomeDto) {
    return this.sendMailService.sendMailHome(dto);
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
