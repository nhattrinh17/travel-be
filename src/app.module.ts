import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DestinationModule } from './modules/destination/destination.module';
import { DetailLocationModule } from './modules/detail-location/detail-location.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { SpecialOfferModule } from './modules/special-offer/special-offer.module';
import { TourModule } from './modules/tour/tour.module';
import { CruiseModel } from './models';
import { CruiseModule } from './modules/cruise/cruise.module';
import { PacketTourModule } from './modules/packet-tour/packet-tour.module';
import { ServiceBookingModule } from './modules/service-booking/service-booking.module';
import { ReviewModule } from './modules/review/review.module';
import { registerHelpers } from './templates/handlebars-helpers';
import { BlogCategoryModule } from './modules/blog-category/blog-category.module';
import { BlogModule } from './modules/blog/blog.module';

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
    // Mailler
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: process.env.MAIL_HOST,
          port: +process.env.MAIL_PORT,
          // service: 'Gmail',
          service: 'STMP',
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
            // ciphers: "SSLv3"
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.MAIL_FROM}>`,
        },

        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    DestinationModule,
    DetailLocationModule,
    PacketTourModule,
    SpecialOfferModule,
    TourModule,
    CruiseModule,
    ServiceBookingModule,
    ReviewModule,
    BlogCategoryModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    //
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    registerHelpers();
  }
}
