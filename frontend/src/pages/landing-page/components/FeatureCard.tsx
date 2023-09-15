import { Card, CardContent } from '@/components/ui/card'

interface FeatureCardProps {
  image: string
  altText: string
  description: string
}

export default function FeatureCard({
  image,
  altText,
  description,
}: FeatureCardProps) {
  return (
    // <Card style={{ maxWidth: '200px' }}>
    <Card className="p-0">
      <CardContent className="p-0">
        <img className="px-8 pt-4" src={image} alt={altText} />
        <p className="text-sm p-4 mt-auto">{description}</p>
      </CardContent>
    </Card>
  )
}
