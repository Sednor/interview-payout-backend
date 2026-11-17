import { ProviderId } from '../payout/payout.contract';

export interface ProviderConfig {
  baseUrl: string;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  corsOrigins: string[];
  upstreamTimeoutMs: number;
  providers: Record<ProviderId, ProviderConfig>;
}

function toInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: toInt(process.env.PORT, 3100),
  corsOrigins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  upstreamTimeoutMs: toInt(process.env.UPSTREAM_TIMEOUT_MS, 3000),
  providers: {
    A: { baseUrl: process.env.PROVIDER_A_BASE_URL ?? 'http://localhost:5001' },
    B: { baseUrl: process.env.PROVIDER_B_BASE_URL ?? 'http://localhost:5002' },
  },
});
