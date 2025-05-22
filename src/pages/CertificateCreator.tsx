'use client'

import { useState, type ChangeEvent } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function toHex(val: string) {
  // Ensure the value starts with '#'
  if (!val.startsWith('#')) return `#${val}`
  return val
}

export default function CertificateTemplateCreatePage() {
  const [data, setData] = useState({
    title: 'Certificate of Completion',
    subtitle: 'This is to certify that',
    bgColor: '#2563eb',
    accentColor: '#1e40af',
    description: 'has successfully completed the requirements.',
    awardedText: 'Awarded on',
    footerText: 'EduLearn'
  })

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  function handleColorChange(field: string, value: string) {
    setData((v) => ({ ...v, [field]: value }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('Template saved! (Demo only)')
  }

  function svgPreview() {
    return (
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        className="rounded-lg border shadow"
        style={{ background: data.bgColor }}
      >
        <rect
          x="20"
          y="20"
          width="360"
          height="260"
          rx="16"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="200"
          y="70"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial"
          fontSize="20"
          fontWeight="bold"
        >
          {data.title}
        </text>
        <text
          x="200"
          y="105"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial"
          fontSize="14"
        >
          {data.subtitle}
        </text>
        <ellipse
          cx="200"
          cy="160"
          rx="45"
          ry="30"
          fill={data.accentColor}
          opacity="0.6"
        />
        <text
          x="200"
          y="170"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial"
          fontSize="13"
        >
          {data.description}
        </text>
        <text
          x="200"
          y="195"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial"
          fontSize="12"
        >
          {data.awardedText} _____________
        </text>
        <text
          x="320"
          y="260"
          textAnchor="end"
          fill="white"
          fontFamily="Arial"
          fontSize="14"
        >
          {data.footerText}
        </text>
      </svg>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Certificate Template</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={onChange}
                  maxLength={48}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={data.subtitle}
                  onChange={onChange}
                  maxLength={48}
                />
              </div>
              <div>
                <Label htmlFor="description">Description Text</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={onChange}
                  maxLength={120}
                />
              </div>
              <div>
                <Label htmlFor="awardedText">Awarded Text</Label>
                <Input
                  id="awardedText"
                  name="awardedText"
                  value={data.awardedText}
                  onChange={onChange}
                />
              </div>
              <div>
                <Label htmlFor="footerText">Footer Text</Label>
                <Input
                  id="footerText"
                  name="footerText"
                  value={data.footerText}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="bgColor">Background Color</Label>
                  <Input
                    id="bgColor"
                    name="bgColor"
                    type="color"
                    value={toHex(data.bgColor)}
                    onChange={(e) =>
                      handleColorChange('bgColor', e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Input
                    id="accentColor"
                    name="accentColor"
                    type="color"
                    value={toHex(data.accentColor)}
                    onChange={(e) =>
                      handleColorChange('accentColor', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Label className="mb-2">Live Preview</Label>
              <div className="bg-muted p-3 rounded-xl flex items-center justify-center min-h-[320px]">
                {svgPreview()}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save Template</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
