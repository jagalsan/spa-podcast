import { ContentType } from '@/data/enums/content-types.enum';
import { HttpMethod } from '@/data/enums//method.enum';

interface ApiCallOptions {
    body?: any | null;
    contentType?: ContentType;
    queryParams?: Record<string, string | number>;
}

export const fetchApi = async <T>(
    api: string,
    method: HttpMethod,
    options: ApiCallOptions = {}
): Promise<T> => {
    try {
        const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
        const { body, queryParams, contentType } = options;

        let url = `${proxyUrl}?url=${encodeURIComponent(api)}`;

        if (queryParams) {
            const queryString = new URLSearchParams(
                queryParams as any
            ).toString();
            url += `?${queryString}`;
        }

        const headers: HeadersInit = {
            ...(contentType !== ContentType.MULTIPART && {
                'Content-Type': contentType || ContentType.JSON,
            }),
        };

        let fetchBody = body ? JSON.stringify(body) : undefined;

        if (contentType === ContentType.MULTIPART && body) {
            fetchBody = body;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: fetchBody,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        return JSON.parse(data.contents) as T;
    } catch (error) {
        throw error;
        console.error(error);
    }
};
