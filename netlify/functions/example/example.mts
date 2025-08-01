import type { Context } from '@netlify/functions';
import { z } from 'zod';
import {
    createCommandProcessor,
    createCommand,
    type CommandRegistry
} from '../_lib/commandHandler';

/**
 * Example of creating a new API function using the reusable command handler
 * This demonstrates how simple it is to create new endpoints
 */

// User info command
const userCommand = createCommand(
    z.object({
        id: z.string().min(1).max(50),
        includeProfile: z.boolean().optional().default(false),
    }),
    async (params) => {
        // Simulate user lookup
        const baseUser = {
            id: params.id,
            name: `User ${params.id}`,
            timestamp: new Date().toISOString(),
        };

        if (!params.includeProfile) {
            return baseUser;
        }

        return {
            ...baseUser,
            profile: {
                email: `user${params.id}@example.com`,
                role: 'user',
                lastLogin: new Date(Date.now() - Math.random() * 86400000).toISOString(),
                preferences: {
                    theme: 'dark',
                    language: 'en',
                }
            }
        };
    }
);

// Analytics command
const analyticsCommand = createCommand(
    z.object({
        metric: z.enum(['visitors', 'pageviews', 'sessions']).optional().default('visitors'),
        timeframe: z.enum(['1h', '24h', '7d', '30d']).optional().default('24h'),
    }),
    async (params) => {
        // Simulate analytics data
        const generateValue = () => Math.floor(Math.random() * 10000) + 100;

        return {
            metric: params.metric,
            timeframe: params.timeframe,
            value: generateValue(),
            change: Math.floor(Math.random() * 200) - 100, // -100 to +100
            timestamp: new Date().toISOString(),
            breakdown: {
                desktop: generateValue(),
                mobile: generateValue(),
                tablet: generateValue(),
            }
        };
    }
);

// Simple echo command for testing
const echoCommand = createCommand(
    z.object({
        message: z.string().min(1).max(200),
        repeat: z.number().min(1).max(5).optional().default(1),
    }),
    async (params) => ({
        original: params.message,
        echoed: Array(params.repeat).fill(params.message),
        timestamp: new Date().toISOString(),
        length: params.message.length,
    })
);

/**
 * Command registry for the example service
 */
const commandRegistry: CommandRegistry = {
    user: userCommand,
    analytics: analyticsCommand,
    echo: echoCommand,
};

/**
 * Create command processor instance
 */
const processor = createCommandProcessor(commandRegistry);

/**
 * Main function handler
 * Usage examples:
 * - /.netlify/functions/example?cmd=user&id=123
 * - /.netlify/functions/example?cmd=user&id=123&includeProfile=true
 * - /.netlify/functions/example?cmd=analytics&metric=pageviews&timeframe=7d
 * - /.netlify/functions/example?cmd=echo&message=Hello&repeat=3
 */
export default async (request: Request, context: Context): Promise<Response> => {
    return processor.handle(request, context);
};
