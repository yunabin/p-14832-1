import createClient from 'openapi-fetch'

import { paths } from './apiV1/schema'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// openapi-fetch 기반의 client
export const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
})
