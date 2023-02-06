import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '@src/../common/routes'

export const tc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: '/trpc',
		}),
	],
})
