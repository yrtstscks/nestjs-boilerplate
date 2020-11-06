import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { Cache } from 'cache-manager';

@Injectable()
export class HealthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async getCacheHealthIndicator(): Promise<HealthIndicatorResult> {
    let result: HealthIndicatorResult;

    const cacheMock = {
      key: 'test',
      value: 1,
      ttl: 1000,
    };

    result['set'] = {
      status:
        (await this.cache.set(
          cacheMock.key,
          cacheMock.value,
          cacheMock.ttl,
        )) !== undefined
          ? 'up'
          : 'down',
    };

    result['get'] = {
      status:
        cacheMock.value === (await this.cache.get(cacheMock.key))
          ? 'up'
          : 'down',
    };

    result['delete'] = {
      status: (await this.cache.del(cacheMock.key)) ? 'up' : 'down',
    };

    return result;
  }
}
