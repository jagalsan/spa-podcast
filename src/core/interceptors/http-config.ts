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
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const { body, queryParams, contentType } = options;

        let url = `${apiUrl}=${encodeURIComponent(api)}`;

        if (queryParams) {
            const queryString = new URLSearchParams(
                queryParams as any
            ).toString();
            url += `?${queryString}`;
        }

        const shouldCache = queryParams?.shouldCache;
        const cacheControl = shouldCache
            ? 'max-age=86400' // 24h = 86400s
            : 'no-cache, no-store, must-revalidate';

        const headers: HeadersInit = {
            ...(contentType !== ContentType.MULTIPART && {
                'Content-Type': contentType || ContentType.JSON,
            }),
            'Cache-Control': cacheControl,
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

        return response.json() as Promise<T>;
    } catch (error) {
        throw error;
    }
};
