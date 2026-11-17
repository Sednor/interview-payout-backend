import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/configuration';
import { PayoutController } from './payout.controller';

@Module({
  imports: [
    // HttpService (axios) can be injected anywhere in this module.
    // It is preconfigured with the upstream timeout; provider base URLs are in ConfigService.
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        timeout: config.get('upstreamTimeoutMs', { infer: true }),
      }),
    }),
  ],
  controllers: [PayoutController],
})
export class PayoutModule {}
