// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { X } from 'lucide-react'

// const formSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   content: z.string().min(1, 'Content is required'),
//   image1: z.any().optional(),
//   image2: z.any().optional(),
//   removedImages: z.array(z.string()).optional(),
//   tag: z.enum(['Technology', 'Science', 'Space'])
// })

// type BlogFormValues = z.infer<typeof formSchema>

// interface BlogFormProps {
//   initialValues?: Partial<BlogFormValues>
//   onSubmit: (data: BlogFormValues) => void
//   submitLabel: string
// }

// export function BlogForm({ initialValues, onSubmit, submitLabel }: BlogFormProps) {
//   const form = useForm<BlogFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialValues || {
//       title: '',
//       content: '',
//       tag: 'Technology',
//       removedImages: []
//     }
//   })

//   const [image1Preview, setImage1Preview] = React.useState<string | null>(initialValues?.image1 || null)
//   const [image2Preview, setImage2Preview] = React.useState<string | null>(initialValues?.image2 || null)

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, imageField: 'image1' | 'image2') => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         if (imageField === 'image1') {
//           setImage1Preview(reader.result as string)
//         } else {
//           setImage2Preview(reader.result as string)
//         }
//       }
//       reader.readAsDataURL(file)
//       form.setValue(imageField, file)
//     }
//   }

//   const handleImageDelete = (imageField: 'image1' | 'image2') => {
//     if (imageField === 'image1') {
//       setImage1Preview(null)
//       form.setValue('image1', undefined)
//       form.setValue('removedImages', [...(form.getValues('removedImages') || []), initialValues?.image1 || ''])
//     } else {
//       setImage2Preview(null)
//       form.setValue('image2', undefined)
//       form.setValue('removedImages', [...(form.getValues('removedImages') || []), initialValues?.image2 || ''])
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="space-y-8">
//             {/* ... other form fields ... */}
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="image1"
//                 render={({ field: { value, onChange, ...field } }) => (
//                   <FormItem>
//                     <FormLabel>Image 1</FormLabel>
//                     <FormControl>
//                       <div className="space-y-2">
//                         <Input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, 'image1')}
//                           {...field}
//                         />
//                         {image1Preview && (
//                           <div className="relative inline-block">
//                             <img src={image1Preview} alt="Preview" className="max-w-full h-auto rounded" />
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="icon"
//                               className="absolute top-2 right-2 rounded-full"
//                               onClick={() => handleImageDelete('image1')}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="image2"
//                 render={({ field: { value, onChange, ...field } }) => (
//                   <FormItem>
//                     <FormLabel>Image 2</FormLabel>
//                     <FormControl>
//                       <div className="space-y-2">
//                         <Input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, 'image2')}
//                           {...field}
//                         />
//                         {image2Preview && (
//                           <div className="relative inline-block">
//                             <img src={image2Preview} alt="Preview" className="max-w-full h-auto rounded" />
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="icon"
//                               className="absolute top-2 right-2 rounded-full"
//                               onClick={() => handleImageDelete('image2')}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//           {/* ... other form fields ... */}
//         </div>
//         <div className="flex justify-end">
//           <Button type="submit" size="lg">{submitLabel}</Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

import React from "react";

function temp() {
  return <div>temp</div>;
}

export default temp;
