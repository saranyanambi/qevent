import Tag from "@/components/Tag";

const TagsPage = async () => {
    const TAGS_URL = 'https://qevent-backend.labs.crio.do/tags';

    const fetchTags = async () => {
        try {
            const res = await fetch(TAGS_URL);
            return await res.json();
        } catch (e) {
            console.error('error', e);
        }
    }

    const tags = await fetchTags();

    return (
        <div className='max-w-7xl p-4 mx-auto min-h-screen flex items-center'>
            <div className="flex flex-wrap gap-4 justify-center ">
                {tags?.map((tag, idx) => <Tag key={tag.id} text={tag.name} />)}
            </div>
        </div>
    )
}

export default TagsPage