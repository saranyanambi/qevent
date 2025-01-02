import ArtistCard from "@/components/ArtistCard";

const ArtistsPage = async () => {
    const ARTISTS_URL = 'https://qevent-backend.labs.crio.do/artists';

    const fetchArtists = async () => {
        const res = await fetch(ARTISTS_URL, { next: { revalidate: 600 } });

        if (!res || !res.ok) {
            throw new Error('Failed to fetch data')
        }

        return res.json();
    }

    const artists = await fetchArtists();

    return (
        <div className="flex flex-wrap justify-between">
            {artists?.map((artist) => (
                <ArtistCard key={artist.id} artistData={artist} />
            ))}
        </div>
    )
}

export default ArtistsPage