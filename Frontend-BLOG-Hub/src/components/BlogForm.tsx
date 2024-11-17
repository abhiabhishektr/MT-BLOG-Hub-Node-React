import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { X } from 'lucide-react'
import { BASE_URL } from '@/config'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image1: z.any(),
  image2: z.any(),
  images: z.array(z.string()).optional(),
  removedImages: z.array(z.string()).optional(),
  tag: z.enum(['Technology', 'Science', 'Space']),
}).superRefine((data, ctx) => {
  const hasNewImages = data.image1 instanceof File || data.image2 instanceof File;
  // TODO 
  // const hasExistingImages = (data.images?.length || 0) > 0;
  const removedImagesCount = data.removedImages?.length || 0;
  const remainingExistingImages = (data.images?.length || 0) - removedImagesCount;

  if (!hasNewImages && !remainingExistingImages) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one image is required",
      path: ['image1']
    });
  }
});

type BlogFormValues = z.infer<typeof formSchema>

interface BlogFormProps {
  initialValues?: Partial<BlogFormValues>
  onSubmit: (data: BlogFormValues) => void
  submitLabel: string
}

export function BlogForm({ initialValues, onSubmit, submitLabel }: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      content: initialValues?.content || '',
      tag: initialValues?.tag || 'Technology',
      images: initialValues?.images || [],
      removedImages: [],
      image1: undefined,
      image2: undefined
    }
  });

  const [image1Preview, setImage1Preview] = React.useState<string | null>(initialValues?.images?.[0] ? `${BASE_URL}/${initialValues.images[0]}` : null);
  const [image2Preview, setImage2Preview] = React.useState<string | null>(initialValues?.images?.[1] ? `${BASE_URL}/${initialValues.images[1]}` : null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, imageField: 'image1' | 'image2') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageField === 'image1') {
          setImage1Preview(reader.result as string);
        } else {
          setImage2Preview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      form.setValue(imageField, file);
      form.trigger(); // Trigger validation after setting new image
    }
  };

  const handleImageDelete = (imageField: 'image1' | 'image2') => {
    const imageIndex = imageField === 'image1' ? 0 : 1;
    const existingImage = initialValues?.images?.[imageIndex];

    if (imageField === 'image1') {
      setImage1Preview(null);
      form.setValue('image1', undefined);
    } else {
      setImage2Preview(null);
      form.setValue('image2', undefined);
    }

    if (existingImage) {
      const currentRemoved = form.getValues('removedImages') || [];
      form.setValue('removedImages', [...currentRemoved, existingImage]);
    }

    form.trigger(); // Trigger validation after removing image
  };

  const handleSubmit = (data: BlogFormValues) => {
    // Filter out undefined image fields
    const formData = {
      ...data,
      image1: data.image1 instanceof File ? data.image1 : undefined,
      image2: data.image2 instanceof File ? data.image2 : undefined,
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tag" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Space">Space</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image1"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image 1</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, 'image1')}
                          {...field}
                        />
                        {image1Preview && (
                          <div className="relative inline-block">
                            <img src={image1Preview} alt="Preview" className="max-w-full h-auto rounded" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 rounded-full"
                              onClick={() => handleImageDelete('image1')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image2"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image 2</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, 'image2')}
                          {...field}
                        />
                        {image2Preview && (
                          <div className="relative inline-block">
                            <img src={image2Preview} alt="Preview" className="max-w-full h-auto rounded" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 rounded-full"
                              onClick={() => handleImageDelete('image2')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter blog content"
                      {...field}
                      className="min-h-[300px] lg:min-h-[calc(100vh-16rem)] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="lg">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  )
}