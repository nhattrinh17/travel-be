import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models';
import { UserRepository } from './repository/users.repository';
import { Helper } from 'src/utils';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    Helper,
    SendMailService,
  ],
  exports: [
    UsersService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
