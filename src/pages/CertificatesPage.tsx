import {
  AwardIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  PrinterIcon,
  ShareIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Link } from 'react-router-dom'

// Sample certificate templates
const certificateTemplates = [
  {
    id: 1,
    name: 'Standard Completion',
    description: 'Default certificate issued upon course completion',
    preview: '/certificates/standard-certificate.png',
    usedIn: 12,
    createdAt: 'Mar 15, 2024',
    lastEdited: 'Apr 2, 2024'
  },
  {
    id: 2,
    name: 'Professional Achievement',
    description: 'Certificate for professional development courses',
    preview: '/certificates/professional-certificate.png',
    usedIn: 8,
    createdAt: 'Jan 8, 2024',
    lastEdited: 'Mar 22, 2024'
  },
  {
    id: 3,
    name: 'Advanced Certification',
    description: 'Premium certificate design for advanced courses',
    preview: '/certificates/advanced-certificate.png',
    usedIn: 6,
    createdAt: 'Feb 12, 2024',
    lastEdited: 'Mar 30, 2024'
  }
]

// Sample issued certificates
const issuedCertificates = [
  {
    id: 1,
    courseName: 'Introduction to Machine Learning',
    learnerName: 'Sarah Johnson',
    learnerEmail: 'sarah.j@example.com',
    issueDate: 'Apr 28, 2024',
    template: 'Standard Completion',
    downloadLink: '#',
    status: 'Active'
  },
  {
    id: 2,
    courseName: 'Web Development Bootcamp',
    learnerName: 'Michael Brown',
    learnerEmail: 'mbrown@example.com',
    issueDate: 'Apr 25, 2024',
    template: 'Professional Achievement',
    downloadLink: '#',
    status: 'Active'
  },
  {
    id: 3,
    courseName: 'Project Management Professional',
    learnerName: 'Jessica Williams',
    learnerEmail: 'jwilliams@example.com',
    issueDate: 'Apr 20, 2024',
    template: 'Advanced Certification',
    downloadLink: '#',
    status: 'Active'
  },
  {
    id: 4,
    courseName: 'Digital Marketing Fundamentals',
    learnerName: 'Jessica Williams',
    learnerEmail: 'jwilliams@example.com',
    issueDate: 'Apr 18, 2024',
    template: 'Standard Completion',
    downloadLink: '#',
    status: 'Active'
  },
  {
    id: 5,
    courseName: 'Advanced Data Science',
    learnerName: 'Jessica Williams',
    learnerEmail: 'jwilliams@example.com',
    issueDate: 'Apr 15, 2024',
    template: 'Advanced Certification',
    downloadLink: '#',
    status: 'Active'
  },
  {
    id: 6,
    courseName: 'UX/UI Design Principles',
    learnerName: 'Emily Davis',
    learnerEmail: 'edavis@example.com',
    issueDate: 'Apr 10, 2024',
    template: 'Professional Achievement',
    downloadLink: '#',
    status: 'Active'
  }
]

// Generate certificate placeholder image SVG
function generateCertificatePreviewSVG(id: number, name: string) {
  const colors = [
    { bg: '#2563eb', accent: '#1e40af' },
    { bg: '#10b981', accent: '#047857' },
    { bg: '#8b5cf6', accent: '#6d28d9' }
  ]

  const colorScheme = colors[(id - 1) % colors.length]

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'>
    <rect width='400' height='300' fill='${colorScheme.bg}' />
    <rect x='20' y='20' width='360' height='260' stroke='white' stroke-width='2' fill='none' />
    <text x='200' y='60' text-anchor='middle' fill='white' font-family='Arial' font-size='18'
        font-weight='bold'>CERTIFICATE OF COMPLETION</text>
    <text x='200' y='90' text-anchor='middle' fill='white' font-family='Arial' font-size='12'>${name}</text>
    <path d='M180 140 A40 40 0 1 0 220 140 A40 40 0 1 0 180 140 Z' fill='${colorScheme.accent}' opacity='0.7' />
    <path d='M190 210 L200 180 L210 210 L230 220 L210 230 L200 260 L190 230 L170 220 L190 210 Z'
        fill='gold' />
</svg>`

  // 编码
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')

  // 构造 Data URL
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`
  return dataUrl
}

export default function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <Button asChild>
          <Link to="/certificates/create">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Template
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="issued" className="space-y-4">
        <TabsList>
          <TabsTrigger value="issued">Issued Certificates</TabsTrigger>
          <TabsTrigger value="templates">Certificate Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="issued" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issued Certificates</CardTitle>
              <CardDescription>
                View and manage certificates that have been issued to learners.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Learner</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issuedCertificates.map((certificate) => (
                      <TableRow key={certificate.id}>
                        <TableCell className="font-medium">
                          {certificate.courseName}
                        </TableCell>
                        <TableCell>
                          <div>
                            {certificate.learnerName}
                            <div className="text-xs text-muted-foreground">
                              {certificate.learnerEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{certificate.issueDate}</TableCell>
                        <TableCell>{certificate.template}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {certificate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="outline">
                              <EyeIcon className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button size="icon" variant="outline">
                              <DownloadIcon className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button size="icon" variant="outline">
                              <ShareIcon className="h-4 w-4" />
                              <span className="sr-only">Share</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificateTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <img
                          src={generateCertificatePreviewSVG(
                            template.id,
                            template.name
                          )}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                          <EyeIcon className="h-8 w-8 text-white" />
                          <span className="sr-only">Preview</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>{template.name} Template</DialogTitle>
                        <DialogDescription>
                          Preview of the certificate template.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="aspect-[4/3] relative mt-4">
                        <img
                          src={generateCertificatePreviewSVG(
                            template.id,
                            template.name
                          )}
                          alt={template.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <PrinterIcon className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                        <Button size="sm">
                          <AwardIcon className="mr-2 h-4 w-4" />
                          Use Template
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Used in {template.usedIn} courses
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last edited: {template.lastEdited}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
