import type { Context } from '@netlify/functions';
import { z } from 'zod';
import {
  createCommandProcessor,
  createCommand,
  type CommandRegistry
} from '../_lib/commandHandler';

/**
 * Command implementations for the hello service
 */

// Hello command - basic greeting
const helloCommand = createCommand(
  z.object({
    name: z.string().min(1).max(64).optional().default('World'),
  }),
  async (params) => ({
    message: `Hello ${params.name}!`,
    timestamp: new Date().toISOString(),
  })
);

// Health command - system health check
const healthCommand = createCommand(
  z.object({
    detailed: z.boolean().optional().default(false),
  }),
  async (params) => {
    const startTime = Date.now();
    const baseHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? Math.floor(process.uptime()) : null,
      responseTime: Date.now() - startTime,
    };

    if (!params.detailed) {
      return baseHealth;
    }

    return {
      ...baseHealth,
      details: {
        api: { status: 'operational', latency: `${Date.now() - startTime}ms` },
        memory: process.memoryUsage ? process.memoryUsage() : { info: 'not available' },
        environment: process.env.NODE_ENV || 'unknown',
        platform: process.platform || 'unknown',
        version: process.version || 'unknown',
      }
    };
  }
);

// Status command - component status information
const statusCommand = createCommand(
  z.object({
    component: z.enum(['api', 'database', 'cache', 'all']).optional().default('all'),
  }),
  async (params) => {
    const getComponentStatus = (component: string) => {
      switch (component) {
        case 'api':
          return { name: 'API', status: 'operational', uptime: '99.9%' };
        case 'database':
          return { name: 'Database', status: 'operational', uptime: '99.8%' };
        case 'cache':
          return { name: 'Cache', status: 'operational', uptime: '99.95%' };
        default:
          return { name: component, status: 'unknown', uptime: 'N/A' };
      }
    };

    if (params.component === 'all') {
      return {
        overall: 'operational',
        components: [
          getComponentStatus('api'),
          getComponentStatus('database'),
          getComponentStatus('cache'),
        ],
        timestamp: new Date().toISOString(),
      };
    }

    return {
      component: getComponentStatus(params.component),
      timestamp: new Date().toISOString(),
    };
  }
);

// Info command - detailed system information
const infoCommand = createCommand(
  z.object({
    include: z.union([
      z.enum(['system', 'runtime', 'memory', 'environment']),
      z.array(z.enum(['system', 'runtime', 'memory', 'environment']))
    ]).optional().default(['system']).transform((val) =>
      Array.isArray(val) ? val : [val]
    ),
  }),
  async (params) => {
    const info: Record<string, any> = {
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(7),
    };

    if (params.include.includes('system')) {
      info.system = {
        platform: process.platform || 'unknown',
        arch: process.arch || 'unknown',
        nodeVersion: process.version || 'unknown',
      };
    }

    if (params.include.includes('runtime')) {
      info.runtime = {
        uptime: process.uptime ? Math.floor(process.uptime()) : null,
        pid: process.pid || null,
      };
    }

    if (params.include.includes('memory')) {
      info.memory = process.memoryUsage ? process.memoryUsage() : { info: 'not available' };
    }

    if (params.include.includes('environment')) {
      info.environment = {
        nodeEnv: process.env.NODE_ENV || 'unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
      };
    }

    return info;
  }
);

// Ping command - simple ping-pong test
const pingCommand = createCommand(
  z.object({
    echo: z.string().max(256).optional().default('pong'),
  }),
  async (params) => ({
    echo: params.echo,
    timestamp: new Date().toISOString(),
    latency: Math.floor(Math.random() * 10) + 1, // Simulated latency
  })
);

/**
 * Command registry for the hello service
 */
const commandRegistry: CommandRegistry = {
  hello: helloCommand,
  health: healthCommand,
  status: statusCommand,
  info: infoCommand,
  ping: pingCommand,
};

/**
 * Create command processor instance
 */
const processor = createCommandProcessor(commandRegistry);

/**
 * Main function handler - now using the reusable command processor
 */
export default async (request: Request, context: Context): Promise<Response> => {
  return processor.handle(request, context);
};
