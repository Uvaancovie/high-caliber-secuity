"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Mail, Shield, Clock, DollarSign, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface QuoteBreakdown {
  hours?: number
  base_cents: number
  risk_multiplier?: number
  surcharges?: {
    night_pct?: number
    weekend_pct?: number
    risk_multiplier?: number
  }
  labour_cents?: number
  extras?: {
    cctv_cents?: number
  }
  total_cents: number
  currency: string
  num_guards?: number
  coverage_hours_per_day?: number
  days_per_month?: number
  armed?: boolean
  site_factor?: number
  include_cctv?: boolean
}

interface QuoteData {
  id: string
  kind: "personal" | "business"
  payload: any
  breakdown: QuoteBreakdown
  total_cents: number
  currency: string
  status: string
  created_at: string
}

export default function QuoteResultPage() {
  const params = useParams()
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    fetchQuote()
  }, [params.id])

  const fetchQuote = async () => {
    try {
      setLoading(true)
      // This would fetch from your API
      // For now, creating mock data based on quote type
      const mockQuote: QuoteData = {
        id: params.id as string,
        kind: Math.random() > 0.5 ? "business" : "personal",
        payload: {},
        breakdown: {
          base_cents: 450000,
          hours: 8,
          risk_multiplier: 1.2,
          surcharges: {
            night_pct: 20,
            weekend_pct: 0,
            risk_multiplier: 1.2
          },
          total_cents: 648000,
          currency: "ZAR"
        },
        total_cents: 648000,
        currency: "ZAR",
        status: "sent",
        created_at: new Date().toISOString()
      }
      
      setQuote(mockQuote)
    } catch (error) {
      console.error("Failed to fetch quote:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendQuoteEmail = async () => {
    try {
      setEmailSent(true)
      // Implementation for sending email would go here
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  const formatCurrency = (cents: number) => {
    return `R ${(cents / 100).toFixed(2)}`
  }

  const downloadPDF = () => {
    // Implementation for PDF download would go here
    console.log("Downloading PDF...")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your quote...</p>
        </div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Quote Not Found</h1>
          <p className="text-gray-600 mb-6">The quote you're looking for could not be found.</p>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/landing">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isPersonal = quote.kind === "personal"
  const breakdown = quote.breakdown

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-xl font-bold">High Caliber Security</h1>
                <p className="text-gray-300 text-sm">Professional Security Quote</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-white text-black">
                Quote #{quote.id.slice(-8).toUpperCase()}
              </Badge>
              <p className="text-sm text-gray-300 mt-1">
                {new Date(quote.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Quote Summary Card */}
        <Card className="mb-8 border-black">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-black flex items-center">
                  {isPersonal ? <Users className="mr-2" /> : <Shield className="mr-2" />}
                  {isPersonal ? "Personal Security Quote" : "Business Security Quote"}
                </CardTitle>
                <CardDescription>
                  {isPersonal ? "Individual protection services" : "Commercial security solutions"}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">
                  {formatCurrency(quote.total_cents)}
                </div>
                <p className="text-sm text-gray-600">Total Quote Amount</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Breakdown Table */}
        <Card className="mb-8 border-black">
          <CardHeader>
            <CardTitle className="text-black flex items-center">
              <DollarSign className="mr-2" />
              Cost Breakdown
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your security service costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-300">
                  <TableHead className="text-black font-semibold">Description</TableHead>
                  <TableHead className="text-black font-semibold">Details</TableHead>
                  <TableHead className="text-black font-semibold text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-200">
                  <TableCell className="font-medium">Base Service Cost</TableCell>
                  <TableCell>
                    {breakdown.hours && (
                      <span className="text-sm text-gray-600">
                        {breakdown.hours} hours @ base rate
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(breakdown.base_cents)}
                  </TableCell>
                </TableRow>
                
                {breakdown.surcharges?.night_pct && breakdown.surcharges.night_pct > 0 && (
                  <TableRow className="border-gray-200">
                    <TableCell className="font-medium">Night Surcharge</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {breakdown.surcharges.night_pct}% additional
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency((breakdown.base_cents * breakdown.surcharges.night_pct / 100))}
                    </TableCell>
                  </TableRow>
                )}
                
                {breakdown.surcharges?.weekend_pct && breakdown.surcharges.weekend_pct > 0 && (
                  <TableRow className="border-gray-200">
                    <TableCell className="font-medium">Weekend Surcharge</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {breakdown.surcharges.weekend_pct}% additional
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency((breakdown.base_cents * breakdown.surcharges.weekend_pct / 100))}
                    </TableCell>
                  </TableRow>
                )}
                
                {breakdown.risk_multiplier && breakdown.risk_multiplier > 1.0 && (
                  <TableRow className="border-gray-200">
                    <TableCell className="font-medium">Area Risk Adjustment</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {((breakdown.risk_multiplier - 1) * 100).toFixed(0)}% risk premium
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency((breakdown.base_cents * (breakdown.risk_multiplier - 1)))}
                    </TableCell>
                  </TableRow>
                )}
                
                <TableRow className="border-t-2 border-black bg-gray-50">
                  <TableCell className="font-bold text-black">Total Amount</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right font-bold text-black text-lg">
                    {formatCurrency(quote.total_cents)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-4 p-4 bg-gray-50 rounded border">
              <p className="text-sm text-gray-700">
                <strong>Currency:</strong> South African Rand (ZAR)
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Quote Valid:</strong> 30 days from issue date
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Payment Terms:</strong> 50% deposit, balance monthly in advance
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Features */}
        <Card className="mb-8 border-black">
          <CardHeader>
            <CardTitle className="text-black flex items-center">
              <CheckCircle className="mr-2" />
              Included Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-black mb-2">Security Services</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Professional licensed guards</li>
                  <li>• Background-checked personnel</li>
                  <li>• 24/7 support hotline</li>
                  <li>• Incident reporting</li>
                  <li>• Emergency response protocols</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Additional Benefits</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Comprehensive insurance coverage</li>
                  <li>• Regular security assessments</li>
                  <li>• Mobile app monitoring</li>
                  <li>• Monthly performance reports</li>
                  <li>• Flexible contract terms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline" asChild className="border-black text-black hover:bg-gray-100">
            <Link href="/landing">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex gap-4">
            <Button 
              onClick={downloadPDF}
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            
            <Button 
              onClick={sendQuoteEmail}
              className="bg-black text-white hover:bg-gray-800"
              disabled={emailSent}
            >
              <Mail className="mr-2 h-4 w-4" />
              {emailSent ? "Email Sent!" : "Email Quote"}
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mt-8 bg-black text-white border-black">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about your quote?</h3>
              <p className="text-gray-300 mb-4">Our security consultants are ready to help</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">24/7 Emergency: +27 82 987 6543</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">way2flyagency@gmail.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
