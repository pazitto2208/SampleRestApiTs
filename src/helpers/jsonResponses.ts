export interface IJsonResponse {
    statusCode: number
    success: boolean
    body?: any
    message?: string
}

const jsonResponse = (statusCode: number, success: boolean, body: any, message?: string) : IJsonResponse => {
    return { 
        success,
        statusCode, 
        body, 
        message 
    }
}

export const ok = (body: any, statusCode: number, message?: string): IJsonResponse => {
    return jsonResponse(statusCode, true, body, message)
}

export const unauthorized = (): IJsonResponse => {
    return jsonResponse(401, false, undefined, 'Unauthorized')
}

export const elementNotFound = (): IJsonResponse => {
    return jsonResponse(404, false, undefined, 'Not Found')
}

export const serverError = (error: any): IJsonResponse => {
    return jsonResponse(500, false, undefined, error.message)
}