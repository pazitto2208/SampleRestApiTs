export interface IJsonResponse<T> {
    statusCode: number
    success: boolean
    body?: T
    message?: string
}

const jsonResponse = <T>(statusCode: number, success: boolean, body: T, message: string | undefined) : IJsonResponse<T> => {
    return { 
        success,
        statusCode, 
        body, 
        message 
    }
}

export const ok = <T>(body: T, statusCode: number, message: string | undefined): IJsonResponse<T> => {
    return jsonResponse(statusCode, true, body, message)
}

export const unauthorized = (): IJsonResponse<undefined> => {
    return jsonResponse(401, false, undefined, 'Unauthorized')
}

export const notFound = (): IJsonResponse<undefined> => {
    return jsonResponse(404, false, undefined, 'Not Found')
}

export const serverError = (error: any): IJsonResponse<undefined> => {
    return jsonResponse(500, false, undefined, error.message)
}