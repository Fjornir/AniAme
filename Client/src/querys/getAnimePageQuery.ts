const GetAnimePageQuery = (id: string) => ` {
    animes(ids: "${id}") {
        id
        malId
        name
        russian
        licenseNameRu
        english
        japanese
        synonyms
        kind
        rating
        score
        status
        episodes
        episodesAired
        duration
        airedOn { year month day date }
        releasedOn { year month day date }
        url
        season

        poster { id originalUrl mainUrl }

        fansubbers
        fandubbers
        licensors
        createdAt,
        updatedAt,
        nextEpisodeAt,
        isCensored

        genres { id name russian kind }
        studios { id name imageUrl }

        externalLinks {
        id
        kind
        url
        createdAt
        updatedAt
        }

        personRoles {
        id
        rolesRu
        rolesEn
        person { id name poster { id } }
        }
        characterRoles {
        id
        rolesRu
        rolesEn
        character { id name poster { id } }
        }

        related {
        id
        anime {
            id
            name
        }
        manga {
            id
            name
        }
        relationRu
        relationEn
        }

        videos { id url name kind playerUrl imageUrl }
        screenshots { id originalUrl x166Url x332Url }

        scoresStats { score count }
        statusesStats { status count }

        description
        descriptionHtml
        descriptionSource
    }
}
`;

export default GetAnimePageQuery;
