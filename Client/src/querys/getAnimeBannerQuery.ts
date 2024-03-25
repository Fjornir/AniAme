const GetAnimeBannerQuery = (id: string) =>
  `
    {
        Media (idMal: ${id}) {
        bannerImage
        coverImage{
          large
        }
        }
    }
    
    `;

export default GetAnimeBannerQuery;
