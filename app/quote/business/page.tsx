"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Building, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BusinessQuotePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    businessType: "",
    contractLength: "",
    numGuards: 1,
    coverageHours: "" as "12" | "24" | "",
    guardLevel: "",
    isArmed: false,
    needsCCTV: false,
    cctvCameras: 0,
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Map string guard level to level_id
      const guardLevelMap: Record<string, number> = {
        basic: 1,
        experienced: 3, // Supervisor level
        supervisor: 4,  // Premium level
      }

      // Transform form data to match API schema
      const apiData = {
        num_guards: formData.numGuards,
        coverage_hours_per_day: parseInt(formData.coverageHours) as 12 | 24,
        level_id: guardLevelMap[formData.guardLevel],
        armed: formData.isArmed,
        include_cctv: formData.needsCCTV,
        // Additional context fields
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        businessType: formData.businessType,
        contractLength: formData.contractLength,
        description: formData.description,
      }

      const response = await fetch("/api/quote/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/quote/result/${result.quoteId}`)
      } else {
        const error = await response.json()
        console.error("Business quote error:", error)
        alert("Error generating quote. Please try again.")
      }
    } catch (error) {
      console.error("Request error:", error)
      alert("Error generating quote. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Security Quote</h1>
              <p className="text-gray-600">Get a comprehensive quote for your business security needs</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Business Quote Request
              </CardTitle>
              <CardDescription>Provide your business details to receive a customized security solution</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Business Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown</SelectItem>
                          <SelectItem value="uptown">Uptown</SelectItem>
                          <SelectItem value="suburbs">Suburbs</SelectItem>
                          <SelectItem value="industrial">Industrial Area</SelectItem>
                          <SelectItem value="residential">Residential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contractLength">Contract Length *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, contractLength: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                        <SelectItem value="24">24 Months</SelectItem>
                        <SelectItem value="36">36 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numGuards">Number of Guards *</Label>
                      <Input
                        id="numGuards"
                        type="number"
                        min="1"
                        required
                        value={formData.numGuards}
                        onChange={(e) => setFormData({ ...formData, numGuards: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coverageHours">Coverage Hours per Day *</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, coverageHours: value as "12" | "24" })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Hours</SelectItem>
                          <SelectItem value="24">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Security Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Options
                  </h3>
                  <div>
                    <Label htmlFor="guardLevel">Guard Level *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, guardLevel: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guard level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Security Guard (R45/hour)</SelectItem>
                        <SelectItem value="experienced">Supervisor Security (R75/hour)</SelectItem>
                        <SelectItem value="supervisor">Premium Protection (R90/hour)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isArmed"
                      checked={formData.isArmed}
                      onCheckedChange={(checked) => setFormData({ ...formData, isArmed: checked as boolean })}
                    />
                    <Label htmlFor="isArmed">Armed Security (+30% surcharge)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="needsCCTV"
                      checked={formData.needsCCTV}
                      onCheckedChange={(checked) => setFormData({ ...formData, needsCCTV: checked as boolean })}
                    />
                    <Label htmlFor="needsCCTV">CCTV System Integration (R4,500/month)</Label>
                  </div>

                  {formData.needsCCTV && (
                    <div>
                      <Label htmlFor="cctvCameras">Number of CCTV Cameras</Label>
                      <Input
                        id="cctvCameras"
                        type="number"
                        min="1"
                        max="50"
                        value={formData.cctvCameras}
                        onChange={(e) =>
                          setFormData({ ...formData, cctvCameras: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                      <p className="text-sm text-gray-500 mt-1">$100 per camera setup + $50/month monitoring</p>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div>
                  <Label htmlFor="description">Additional Requirements</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe any specific security concerns or requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Generating Quote..." : "Get Business Quote"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
