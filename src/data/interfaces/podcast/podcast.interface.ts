export interface PodcastList {
    feed: {
        author: Author;
        entry: Podcast[];
        updated: Label;
        rights: Label;
        title: Label;
        icon: Label;
        link: Link[];
        id: Label;
    };
}

interface Author {
    name: Label;
    uri: Label;
}

interface Label {
    label: string;
}

export interface Podcast {
    'im:name': Label;
    'im:image': Image[];
    summary: Label;
    'im:price': Price;
    'im:contentType': ContentType;
    rights: Label;
    title: Label;
    link: Link;
    id: ID;
    'im:artist': Artist;
    category: Category;
    'im:releaseDate': ReleaseDate;
}

interface Image {
    label: string;
    attributes: {
        height: string;
    };
}

interface Price {
    label: string;
    attributes: {
        amount: string;
        currency: string;
    };
}

interface ContentType {
    attributes: {
        term: string;
        label: string;
    };
}

interface Link {
    attributes: {
        rel: string;
        type?: string;
        href: string;
    };
}

interface ID {
    label: string;
    attributes: {
        'im:id': string;
    };
}

interface Artist {
    label: string;
    attributes?: {
        href: string;
    };
}

interface Category {
    attributes: {
        'im:id': string;
        term: string;
        scheme: string;
        label: string;
    };
}

interface ReleaseDate {
    label: string;
    attributes: {
        label: string;
    };
}
