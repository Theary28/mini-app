import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  status: string
  link: string
}

function ProjectCard({ title, description, status, link }: ProjectCardProps) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-gray-900">{title}</CardTitle>
          <Badge className="bg-blue-50 text-blue-700">{status}</Badge>
        </div>

        <CardDescription className="text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          render={<a href={link} />}
          nativeButton={false}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          View project
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProjectCard