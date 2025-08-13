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
import { ArrowLeft, Shield, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PersonalQuotePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    guardLevel: "",
    isArmed: false,
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.guardLevel) {
        alert("Please select a guard level")
        setLoading(false)
        return
      }
      
      if (!formData.startTime || !formData.endTime) {
        alert("Please specify start and end times")
        setLoading(false)
        return
      }

      // Map string guard level to guard_id
      const guardLevelMap: Record<string, number> = {
        basic: 1,
        experienced: 3, // Supervisor level
        executive: 4,   // Premium level
      }

      // Transform form data to match API schema
      const apiData = {
        guard_id: guardLevelMap[formData.guardLevel],
        start_time: `${formData.startDate}T${formData.startTime}:00Z`,
        end_time: `${formData.endDate}T${formData.endTime}:00Z`,
        // Additional fields for context
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isArmed: formData.isArmed,
        description: formData.description,
      }

      console.log("Sending API data:", apiData)

      const response = await fetch("/api/quote/personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/quote/result/${result.quoteId}`)
      } else {
        const error = await response.json()
        console.error("Quote error:", error)
        alert(`Error generating quote: ${error.error || "Please try again."}`)
      }
    } catch (error) {
      console.error("Request error:", error)
      alert("Error generating quote. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" asChild className="mr-4 text-black hover:bg-gray-100">
              <Link href="/landing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">Personal Security Quote</h1>
              <p className="text-gray-600">Get an instant quote for personal protection services</p>
            </div>
          </div>

          <Card className="border-black">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-black">
                <Shield className="h-5 w-5 mr-2" />
                Quote Request Form
              </CardTitle>
              <CardDescription>Fill out the details below to receive your personalized security quote</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-black">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                {/* Service Details */}
                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-black">Service Details</h3>
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Security Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center text-black">
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
                        <SelectItem value="executive">Premium Protection (R90/hour)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isArmed"
                      checked={formData.isArmed}
                      onCheckedChange={(checked) => setFormData({ ...formData, isArmed: checked as boolean })}
                    />
                    <Label htmlFor="isArmed">Armed Security (R65/hour - overrides base rate)</Label>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe any specific requirements or concerns..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" size="lg" disabled={loading}>
                  {loading ? "Generating Quote..." : "Get My Quote"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
