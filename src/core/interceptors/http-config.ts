import { ContentType } from '@/data/enums/content-types.enum';
import { HttpMethod } from '@/data/enums//method.enum';
import { loadingService } from '@/services/loading.service';

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
    loadingService.setLoading(true);
    try {
        const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
        const { queryParams, contentType } = options;

        if (queryParams) {
            const queryString = new URLSearchParams(
                queryParams as any
            ).toString();

            api += `?${queryString}`;
        }

        let url = `${proxyUrl}?url=${encodeURIComponent(api)}`;

        const headers: HeadersInit = {
            ...(contentType !== ContentType.MULTIPART && {
                'Content-Type': contentType || ContentType.JSON,
            }),
        };

        const response = await fetch(url, {
            method,
            headers,
            body: undefined,
            next: { revalidate: 86401 }, //86400 one day , 86401 > one day
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        return JSON.parse(data.contents) as T;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        loadingService.setLoading(false);
    }
};
