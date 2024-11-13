import { useQuery } from '@tanstack/react-query';
import { BlogCard } from '@/components/BlogCard';
import { getUserPosts } from '@/api/BlogApi';
import { BlogPost } from '@/types';




export default function EnhancedBlogDashboard() {
    const { data: blogPosts, isLoading, isError, error } = useQuery({
        queryKey: ['UserblogPosts'],
        queryFn: getUserPosts,
        staleTime: 5 * 60 * 1000,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{(error as Error).message || 'Failed to load blog posts.'}</div>;
    }

    // Ensure blogPosts is not null and is an array before mapping
    return (
        <>
            <h1 className='text-2xl font-bold text-center p-3'>My Blogs</h1>
            <div className="min-h-screen bg-background flex items-center justify-center">
                <main className="container py-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts?.data && Array.isArray(blogPosts.data) && blogPosts.data.map((post: BlogPost) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}