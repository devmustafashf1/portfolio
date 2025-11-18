import { useParams } from 'react-router-dom';
import Blog from '../components/Blog';
import BlogDetail from '../components/BlogDetail';

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  
  // If there's an ID, show the individual blog post
  if (id) {
    return <BlogDetail />;
  }
  
  // Otherwise show the blog list
  return <Blog />;
}