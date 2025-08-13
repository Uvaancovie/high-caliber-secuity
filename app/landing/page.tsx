import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Newspaper, Phone, FileText, CheckCircle, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-black" />
              <span className="ml-3 text-xl font-bold text-black">High Caliber Security</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#security" className="text-gray-600 hover:text-black transition-colors">Security</a>
              <a href="#news" className="text-gray-600 hover:text-black transition-colors">Crime Statistics</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors">Contact</a>
              <a href="#quote" className="text-gray-600 hover:text-black transition-colors">Get Quote</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Professional Security Services
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Protecting what matters most with reliable, professional security guard services 
            across South Africa. Based on latest crime statistics and security needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="#quote">Get Instant Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-black text-black hover:bg-gray-100">
              <Link href="#security">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Security Excellence</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our comprehensive security solutions provide peace of mind with professional, 
              trained security personnel and advanced monitoring systems, responding to current crime trends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-black shadow-sm">
              <CardHeader>
                <Users className="h-8 w-8 text-black" />
                <CardTitle className="text-black">Professional Guards</CardTitle>
                <CardDescription className="text-gray-600">Trained and certified security personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Background checked</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Licensed and insured</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Ongoing training</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-black shadow-sm">
              <CardHeader>
                <Clock className="h-8 w-8 text-black" />
                <CardTitle className="text-black">24/7 Monitoring</CardTitle>
                <CardDescription className="text-gray-600">Round-the-clock protection and support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Live monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Rapid response</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Emergency protocols</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border-black shadow-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-black" />
                <CardTitle className="text-black">Advanced Systems</CardTitle>
                <CardDescription className="text-gray-600">Technology-enhanced security solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">CCTV systems</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Access control</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-black mr-2" />
                    <span className="text-gray-700">Mobile patrols</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Crime Statistics Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <TrendingUp className="h-12 w-12 text-black mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-black mb-4">Crime Statistics & Security Insights</h2>
            <p className="text-lg text-gray-700">
              Stay informed with the latest crime trends and security analysis for Q4 2024-2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Crime Analysis</Badge>
                <CardTitle className="text-lg text-black">Q4 2024-2025 Crime Trends</CardTitle>
                <CardDescription className="text-gray-600">January 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Latest quarterly data shows increased security incidents in commercial areas, 
                    highlighting the need for professional security services.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Based on official crime statistics from law enforcement agencies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Security Alert</Badge>
                <CardTitle className="text-lg text-black">Business Security Focus</CardTitle>
                <CardDescription className="text-gray-600">January 12, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <Shield className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Property crimes targeting businesses have shown significant patterns. 
                    Our armed security and CCTV integration services address these specific threats.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Enhanced security protocols implemented based on crime pattern analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Prevention Update</Badge>
                <CardTitle className="text-lg text-black">Night & Weekend Security</CardTitle>
                <CardDescription className="text-gray-600">January 8, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <Clock className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Crime statistics indicate higher incident rates during nights and weekends. 
                    Our 24/7 monitoring and rapid response teams are strategically positioned.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Specialized coverage during high-risk periods based on statistical analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Regional Data</Badge>
                <CardTitle className="text-lg text-black">High-Risk Area Coverage</CardTitle>
                <CardDescription className="text-gray-600">January 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Geographic crime data analysis reveals varying risk levels across Johannesburg, 
                    Cape Town, and Durban. Our pricing reflects these risk assessments.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Risk multipliers updated based on current crime statistics by area.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Technology</Badge>
                <CardTitle className="text-lg text-black">CCTV System Effectiveness</CardTitle>
                <CardDescription className="text-gray-600">January 3, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Integration of CCTV systems with professional security personnel has shown 
                    measurable crime deterrence based on recent statistical comparisons.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Advanced monitoring technology reducing incident response time by 40%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="bg-black text-white w-fit">Training Update</Badge>
                <CardTitle className="text-lg text-black">Enhanced Guard Protocols</CardTitle>
                <CardDescription className="text-gray-600">December 28, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2 mb-3">
                  <Users className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    All security personnel have completed updated training programs addressing 
                    current crime patterns and prevention strategies identified in Q4 data.
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Certification programs updated to address evolving security challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Quote</h2>
            <p className="text-lg text-gray-300">
              Choose the right security solution based on current risk assessments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white border-black shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-black">Personal Security</CardTitle>
                <CardDescription className="text-gray-600">
                  Individual protection for events, personal safety, or short-term needs
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="mb-6 space-y-2 text-sm text-gray-700">
                  <li>• Flexible hourly rates</li>
                  <li>• Event security coverage</li>
                  <li>• Personal protection services</li>
                  <li>• Weekend & night premium rates</li>
                </ul>
                <Button asChild size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                  <Link href="/quote/personal">Get Personal Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-300 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-black">Business Security</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive security solutions for businesses and commercial properties
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="mb-6 space-y-2 text-sm text-gray-700">
                  <li>• Multiple guard deployment</li>
                  <li>• 12/24 hour coverage options</li>
                  <li>• Armed security available</li>
                  <li>• CCTV system integration</li>
                </ul>
                <Button asChild size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                  <Link href="/quote/business">Get Business Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Phone className="h-12 w-12 text-black mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-black mb-4">Contact Us</h2>
            <p className="text-lg text-gray-700">
              Get in touch for personalized security solutions and risk assessments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">Get In Touch</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-black">Phone</h4>
                  <p className="text-gray-700">+27 11 123 4567</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Email</h4>
                  <p className="text-gray-700">way2flyagency@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Office Hours</h4>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Weekend: 9:00 AM - 2:00 PM</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Emergency Line</h4>
                  <p className="text-gray-700">24/7 Support: +27 82 987 6543</p>
                </div>
              </div>
            </div>

            <Card className="bg-white border-gray-300 shadow-sm">
              <CardHeader>
                <CardTitle className="text-black">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600">We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-400 rounded-md px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full border border-gray-400 rounded-md px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Message
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full border border-gray-400 rounded-md px-3 py-2 focus:border-black focus:ring-1 focus:ring-black"
                      placeholder="Tell us about your security needs..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-white" />
                <span className="ml-2 text-lg font-bold">High Caliber Security</span>
              </div>
              <p className="text-gray-300 text-sm">
                Professional security services across South Africa. Data-driven protection solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/quote/personal" className="hover:text-white transition-colors">Personal Security</Link></li>
                <li><Link href="/quote/business" className="hover:text-white transition-colors">Business Security</Link></li>
                <li><a href="#security" className="hover:text-white transition-colors">CCTV Systems</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Mobile Patrols</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#security" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">Crime Statistics</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#contact" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Emergency: +27 82 987 6543</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 High Caliber Security. All rights reserved. | Security solutions based on current crime data analysis.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
