import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { BlogPost } from "@/types";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "@/config";

type BlogCardProps = {
  post: BlogPost
};


export function BlogCard({ post }: BlogCardProps) {
  console.log("post: ", post);

  const handleEdit = () => {
    navigate(`/edit-blog/${post.id}`);
  };

  const isUserBlogPage = location.pathname === "/user-blog";

  const navigate = useNavigate();
  
  const handleReadMore = () => {
    navigate(`/blog/${post.id}`);
  };
  // src={`${BASE_URL}/${post.images[0]}`} 
  return (
    <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <img src={`${BASE_URL}/${post.images[0]}`}  alt={post.title} className="aspect-video w-full object-cover" />
        {/* <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5eTEtzmOHtNu9EHuZ1q9HFKeaG6MC7riBBw&s"} alt={post.title} className="aspect-video w-full object-cover" /> */}
      </CardHeader>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {post.category}
        </Badge>
        <div className="flex items-center justify-between">
          <h2 className="line-clamp-1 text-xl font-semibold">{post.title}</h2>
          {isUserBlogPage && (
            <div className="flex items-center justify-start">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                Edit
              </Button>
            </div>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">{post.author}</span>
          <Button variant="ghost" size="sm" onClick={handleReadMore}>
            Read More
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>{post.createdAt}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-1 h-3 w-3" />
            <span className="font-medium items-center">{post.readTime} min read</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
