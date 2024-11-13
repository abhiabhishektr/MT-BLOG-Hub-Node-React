import React, { useEffect, useState } from 'react'
import { BlogForm } from '@/components/BlogForm'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById, updatePost } from '@/api/BlogApi'
import { toast } from '@/hooks/use-toast'

export function BlogEditingPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [initialValues, setInitialValues] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          return
        }
        const response = await getPostById(id)
        setInitialValues(response.data)
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

  if (!initialValues) {
    return <div className="flex justify-center items-center h-screen">No blog post found.</div>
  }

  const handleSubmit = async (data: any) => {
    // if (!data.image1 && !data.image2) {
    //   toast({
    //     title: 'Error',
    //     description: 'At least one image is required.',
    //     variant: 'destructive', // Typically used for error messages in ShadCN Toast
    //   })
    //   return
    // }

    try {
      if (!id) return

      const updatedData = {
        ...data,
        removedImages: data.removedImages || []
      }

      await updatePost(id, updatedData)
      toast({
        title: 'Successful',
      })
      navigate(`/blog/${id}`) // Redirect after successful update, for example
    } catch (error) {
      console.error('Error updating post:', error)
      toast({
        title: 'Update failed',
        description: 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <BlogForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel="Update Blog"
        />
      </main>
    </div>
  )
}
