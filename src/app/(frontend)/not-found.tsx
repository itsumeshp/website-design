import { Container } from '@/components/ui'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold text-heading">Page not found</h1>
      <p className="mt-3 text-body-text">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  )
}
