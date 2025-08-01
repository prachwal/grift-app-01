import type { ApiEndpoint, TestResult } from '../types/apiTesting';
interface ApiEndpointTestProps {
    endpoint: ApiEndpoint;
    onTestExecute: (endpointId: string, parameters: Record<string, unknown>) => Promise<TestResult>;
}
export declare function ApiEndpointTest({ endpoint, onTestExecute }: ApiEndpointTestProps): import("preact").JSX.Element;
export {};
