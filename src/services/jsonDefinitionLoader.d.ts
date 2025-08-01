/**
 * @fileoverview Utility for loading endpoint definitions from JSON files du        }));

        console.log('Created collection:', collection);
        return collection;
    } catch (error) {
        console.error(`Failed to load endpoint definitions from ${jsonPath}:`, error);
        return null;
    }velopment
 * @packageDocumentation
 */
import type { ApiCollection } from '../types/apiTesting';
/**
 * Load endpoint definitions from a JSON file
 * This is used to load static definitions during development
 */
export declare function loadEndpointDefinitions(jsonPath: string): Promise<ApiCollection | null>;
/**
 * Copy JSON definition files to public folder for development
 * This would be part of a build step in a real application
 */
export declare function copyJsonDefinitionsToPublic(): void;
