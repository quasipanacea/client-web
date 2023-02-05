import * as util from '@/util/util'
import type * as schema from '../v3/endpoints'

export async function pluginList(
	data: schema.listPluginsSchema_requestT,
): Promise<schema.listPluginsSchema_responseT> {
	return await util.unwrap<unknown, unknown>('/api/v3/plugin/list', data)
}
