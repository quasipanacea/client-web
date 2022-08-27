import * as schema from '../../common/schema'
import * as util from '@/util/util'

export async function listDocuments() {
	const [success, data] = await util.extractResponse<
		schema.documentListResType,
		schema.documentListReqType
	>('/api/document/list', {
		kind: schema.documentKinds.enum.KindRegular,
	})
	if (!success) {
		throw new Error(`Request failed: ${JSON.stringify(data)}`)
	}

	return data
}

export async function createNewDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentCreateResType,
		schema.documentCreateReqType
	>('/api/document/create', {
		kind: schema.documentKinds.enum.KindRegular,
		name: documentId,
	})
	if (!success) {
		console.error(data)
		throw new Error('Request failed')
	}

	return data
}

export async function deleteDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentDeleteResType,
		schema.documentDeleteReqType
	>('/api/document/delete', {
		kind: schema.documentKinds.enum.KindRegular,
		name: documentId,
	})
	if (!success) {
		console.error(data)
		throw new Error('Request failed')
	}

	return data
}

export async function readDocument(documentId: string) {
	const [success, data] = await util.extractResponse<
		schema.documentReadResType,
		schema.documentReadReqType
	>('/api/document/read', {
		kind: schema.documentKinds.enum.KindRegular,
		name: documentId,
	})
	if (!success) {
		console.error(data)
		throw new Error('Request failed')
	}

	return data
}

export async function writeDocument(documentId: string, content: string) {
	const [success, data] = await util.extractResponse<
		schema.documentWriteResType,
		schema.documentWriteReqType
	>('/api/document/write', {
		kind: schema.documentKinds.enum.KindRegular,
		name: documentId,
		content,
	})
	if (!success) {
		console.error(data)
		throw new Error('Request failed')
	}

	return data
}
