import { fetchApi } from '@/core/interceptors/http-config';
import { HttpMethod } from '@/data/enums/method.enum';
import { PodcastDetails } from '@/data/interfaces/podcast/podcast-details.interface';
import { PodcastList } from '@/data/interfaces/podcast/podcast.interface';

export const getPodcasts = (
    genreId: number,
    podcastsNumber: number,
): Promise<PodcastList> => {
    return fetchApi<PodcastList>(
        `https://itunes.apple.com/us/rss/toppodcasts/limit=${podcastsNumber}/genre=${genreId}/json`,
        HttpMethod.GET
    );
};

export const getPodcastDetails = (
    podcastId: number,
    episodesNumber: number
): Promise<PodcastDetails> => {
    const queryParams: Record<string, string | number> = {
        id: podcastId,
        media: 'podcast',
        entity: 'podcastEpisode',
        limit: episodesNumber,
    };
    return fetchApi<PodcastDetails>(
        `https://itunes.apple.com/lookup`,
        HttpMethod.GET,
        {
            queryParams: queryParams,
        }
    );
};
