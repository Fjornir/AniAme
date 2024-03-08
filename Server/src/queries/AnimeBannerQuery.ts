export default (id: string) =>
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
