import { createPost } from '@/api/BlogApi';
import { BlogForm } from '@/components/BlogForm' 
import { useNavigate } from 'react-router-dom'

export function BlogCreationPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    await createPost(data);
    console.log('Creating new blog:', data)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <BlogForm onSubmit={handleSubmit} submitLabel="Create Blog" />
      </main>
    </div>
  )
}