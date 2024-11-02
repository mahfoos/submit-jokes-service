import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TypesService implements OnModuleInit {
  private readonly logger = new Logger(TypesService.name);
  private readonly DELIVER_SERVICE_URL = process.env.DELIVER_JOKES_URL;
  private cachedTypes: string[] = [];

  async onModuleInit() {
    await this.refreshTypes();
  }

  private async refreshTypes() {
    try {
      const response = await axios.get(
        `${this.DELIVER_SERVICE_URL}/api/jokes/types`,
      );
      this.cachedTypes = response.data;
      this.logger.log('Successfully fetched joke types from Deliver service');
    } catch (error) {
      this.logger.error('Failed to fetch joke types:', error.message);
    }
  }

  async getTypes(): Promise<string[]> {
    return this.cachedTypes;
  }
}
