import { routes } from "../routes.js"
import { setRequestBody } from "./setRequestBody.js"
import { extractQueryStringParams } from "./extractQueryStringParams.js"

export async function handleRequest(req, res) {
	const { url: endPointRequest, method: methodHttpRequest } = req
	const endPointSplited = endPointRequest.split('/')
	/**
	 * [0] = '',
	 * [1] = endpoint,
	 * [2] parameter url id, if it exists,
	 * [3] = validate route param from PATCH route, if it exists
	*/

	if (/\?/.test(endPointRequest)) {
		req.queryStringParams = await extractQueryStringParams(endPointRequest)
	}

	req.body = await setRequestBody(req)
	res.setHeader('Content-type', 'application/json')

	const filteredRoute = routes.filter((route) => {
		const methodRoute = route.methodHttp
		const endPointRoute = route.endPoint
		const routeHasQueryStringParam = /\?/.test(route.endPoint)
		const routeHasUrlParam = /:id/.test(endPointRoute)

		if (methodRoute === methodHttpRequest && routeHasUrlParam && endPointRoute.split('/')[1] === endPointSplited[1]) {
			if (methodRoute === 'PATCH' && endPointSplited[3] !== 'complete') {
				return false
			}

			req.valueUrlParam = endPointSplited[2]
			return route
		}

		if (routeHasQueryStringParam && methodHttpRequest === methodRoute && req.queryStringParams) {
			return route
		}

		return methodRoute === methodHttpRequest && endPointRoute === endPointRequest
	})

	if (!filteredRoute.length) {
		return res.writeHead(404).end(JSON.stringify({
			success: false,
			message: 'Route not Found'
		}))
	}

	return await filteredRoute[0].controller(req, res)
}