import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from 'lucide-react'
import { getPostById } from '@/api/BlogApi'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BASE_URL } from '@/config'

export default function SingleBlogPage() {
    const { id } = useParams<{ id: string }>()
    const [blogPost, setBlogPost] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) {
                    return
                }
                const response = await getPostById(id)
                console.log("response: ", response.data)
                setBlogPost(response.data)
            } catch (err) {
                setError('Failed to fetch the blog post.')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    }

    if (!blogPost) {
        return <div className="flex justify-center items-center h-screen">No blog post found.</div>
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto py-8 px-4">
                <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Blog
                </Button>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                        {blogPost.images && blogPost.images.length > 0 ? (
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {blogPost.images.map((image: string, index: number) => (
                                        <CarouselItem key={index}>
                                            <img
                                                src={`${BASE_URL}/${image}`}
                                                alt={`${blogPost.title} - Image ${index + 1}`}
                                                className="w-full h-[400px] object-cover rounded-lg"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        ) : (
                            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                                No image available
                            </div>
                        )}
                    </div>
                    <div className="lg:w-1/2">
                        <article className="prose prose-lg dark:prose-invert">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                                        <AvatarFallback>
                                            {blogPost.author.name ? blogPost.author.split(' ').map((n: string) => n[0]).join('') : 'NA'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{blogPost.author.name}</h3>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
                                            <ClockIcon className="h-4 w-4 ml-2" />
                                            <span>{blogPost.readTime} min read</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="secondary">{blogPost.category}</Badge>
                            </div>
                            <h1 className="text-4xl font-bold mb-6">{blogPost.title}</h1>
                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
                                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </div>
    )
}