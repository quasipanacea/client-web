import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '@common/routes'

export const api = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: '/trpc',
		}),
	],
})
