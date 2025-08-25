import type { NextConfig } from 'next'
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants'
import dotenv from 'dotenv'

function loadEnvFile(env: string) {
  dotenv.config({ path: `.env.${env}` })
}

const nextConfig = (phase: string): NextConfig => {
  console.log('Running phase:', phase)

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    loadEnvFile('development')
  }

  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
    loadEnvFile('production')

    // if (process.env.ENV === 'staging') {
    //   loadEnvFile('staging')
    // }
  }

  return {
    reactStrictMode: true,
    serverExternalPackages: ['knex'],
    env: {
      NEXT_PUBLIC_STAGE: process.env.NEXT_PUBLIC_STAGE,
      CONNECTION_STRING: process.env.CONNECTION_STRING,
      // NEXT_PUBLIC_BASE_URL: process.env.host,
      // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      // NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    },
  }
}

export default nextConfig
