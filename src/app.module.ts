import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Environment } from './constants';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards';
import { PermissionGuard } from './modules/auth/guards/permission.guard';
import { UploadModule } from './modules/upload/upload.module';
import { FirebaseModule } from 'nestjs-firebase';
import { DestinationModule } from './modules/destination/destination.module';
import { DetailLocationModule } from './modules/detail-location/detail-location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      cache: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      synchronize: process.env.APP_ID == Environment.Development,
      autoLoadModels: true,
      // logging: false,
      retry: {
        max: 5, // Số lần thử lại tối đa
      },
      // Lắng nghe sự kiện khi có lỗi kết nối
      dialectOptions: {
        connectTimeout: 8000, // Thời gian chờ kết nối (30 giây)
      },
      logging: (log) => {
        console.log(log); // Để theo dõi log kết nối trong quá trình phát triển
      },
    }),
    // Firebase configuration
    FirebaseModule.forRoot({
      googleApplicationCredential: {
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID,
      },
      storageBucket: process.env.STORAGE_BUCKET,
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    DestinationModule,
    DetailLocationModule,
  ],
  controllers: [AppController],
  providers: [
    //
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule {}
