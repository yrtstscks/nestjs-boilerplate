import { Get, Controller } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly healthService: HealthService,
  ) {}

  @Get('')
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async () => this.db.pingCheck('database', { timeout: 300 }),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => this.healthService.getCacheHealthIndicator(),
    ]);
  }
}
