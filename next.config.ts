import type { NextConfig } from 'next'
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants'

import { loadEnvConfig } from '@next/env'

// function loadEnvFile(env: string) {
//   dotenv.config({ path: `.env.${env}` })
// }

const nextConfig = (phase: string): NextConfig => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    loadEnvConfig('.env.development')
  }

  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
    loadEnvConfig('.env.production')
  }

  return {
    reactStrictMode: true,
    serverExternalPackages: ['knex'],
    // env: {
    //   NEXT_PUBLIC_STAGE: process.env.NEXT_PUBLIC_STAGE,
    //   CONNECTION_STRING: process.env.CONNECTION_STRING,
    //   // NEXT_PUBLIC_BASE_URL: process.env.host,
    //   // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    //   // NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    // },
  }
}

export default nextConfig
