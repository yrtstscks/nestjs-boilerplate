import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MemoryHealthIndicator,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule, TerminusModule],
  providers: [TypeOrmHealthIndicator, MemoryHealthIndicator, HealthService],
})
export class HealthModule {}
