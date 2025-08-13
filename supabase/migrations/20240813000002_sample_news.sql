-- Sample news articles based on crime statistics for Q4 2024-2025
-- Run this after the main migration to populate the news table

INSERT INTO public.news (title, content, excerpt, published, published_at) VALUES
(
  'Q4 2024-2025 Crime Trends Analysis',
  'The latest quarterly crime statistics reveal significant patterns in security incidents across major South African cities. Commercial properties continue to face increased risks, particularly during off-hours. Our analysis of law enforcement data shows a 15% increase in property-related crimes in business districts, emphasizing the critical need for professional security services.

Key findings from the Q4 data:
- Business break-ins increased by 18% compared to Q3
- Night-time incidents account for 60% of all reported crimes
- Weekend crime rates are 25% higher than weekdays
- Armed response times average 8-12 minutes in high-risk areas

These statistics directly inform our security protocols and pricing structure. Our risk multipliers are updated quarterly to reflect current threat levels in different geographic areas.',
  'Latest quarterly data shows increased security incidents in commercial areas, highlighting the need for professional security services.',
  true,
  '2025-01-15 10:00:00+02'
),
(
  'Enhanced Security Protocols for Business Districts',
  'In response to recent crime pattern analysis, SecureGuard has implemented enhanced security protocols specifically designed for business and commercial properties. The new measures address the specific vulnerabilities identified through comprehensive crime data analysis.

Our enhanced business security package now includes:
- Increased patrol frequency during high-risk hours (8 PM - 6 AM)
- Advanced CCTV monitoring with real-time threat detection
- Direct coordination with local law enforcement
- Rapid response protocols with 5-minute response time guarantee
- Weekly security assessments and risk updates

These improvements are based on data-driven insights from Q4 2024-2025 crime statistics, ensuring our clients receive protection that addresses current and emerging threats.',
  'Enhanced security protocols implemented for business properties based on crime pattern analysis.',
  true,
  '2025-01-12 14:30:00+02'
),
(
  'Night and Weekend Security: Critical Coverage Periods',
  'Analysis of crime statistics reveals that 60% of security incidents occur during night hours (8 PM - 6 AM) and weekends see a 25% increase in criminal activity. This data underscores the importance of professional security coverage during these high-risk periods.

Our specialized night and weekend coverage includes:
- Armed security personnel for high-risk locations
- Enhanced mobile patrol routes
- 24/7 monitoring center with dedicated night shift operators
- Emergency response protocols with law enforcement coordination
- Real-time incident reporting and client notifications

Premium rates for night and weekend coverage reflect the increased risk levels and specialized personnel requirements during these periods. Our pricing model is adjusted based on statistical risk assessment for different time periods and geographic locations.',
  'Crime statistics indicate higher incident rates during nights and weekends, requiring specialized security coverage.',
  true,
  '2025-01-08 16:45:00+02'
),
(
  'Geographic Risk Assessment: Regional Crime Data Analysis',
  'Our comprehensive analysis of regional crime data shows significant variation in security risks across different areas of Johannesburg, Cape Town, and Durban. This geographic intelligence directly informs our risk multiplier pricing and deployment strategies.

High-risk areas identified in Q4 2024-2025:
- Johannesburg CBD: 1.2x risk multiplier (20% above baseline)
- Soweto area: 1.3x risk multiplier (30% above baseline)  
- Cape Town CBD: 1.1x risk multiplier (10% above baseline)
- Durban CBD: 1.1x risk multiplier (10% above baseline)

Lower-risk premium areas:
- Sandton: 1.0x baseline risk
- Camps Bay: 1.0x baseline risk
- Umhlanga: 1.0x baseline risk
- Centurion: 1.0x baseline risk

These risk assessments are updated quarterly based on the latest crime statistics and law enforcement data, ensuring accurate pricing that reflects actual security risks in each area.',
  'Geographic crime data analysis reveals varying risk levels across major cities, informing security deployment strategies.',
  true,
  '2025-01-05 11:20:00+02'
),
(
  'CCTV Integration Effectiveness: Technology Meets Security',
  'Recent comparative analysis demonstrates the significant effectiveness of integrated CCTV systems combined with professional security personnel. Properties with both CCTV monitoring and on-site security show 40% fewer incidents compared to those with security personnel alone.

Key benefits of integrated CCTV systems:
- Real-time threat detection and alerts
- Evidence collection for law enforcement
- Remote monitoring capabilities
- Incident response time reduced by 40%
- Deterrent effect on potential criminals

Our CCTV integration service (R4,500 monthly) provides:
- High-definition camera systems
- Night vision capabilities
- Remote monitoring by our security center
- Mobile app access for clients
- Automated alert systems
- Professional installation and maintenance

The investment in CCTV integration has proven cost-effective when compared to potential losses from security incidents, making it an essential component of comprehensive business security.',
  'Integration of CCTV systems with professional security personnel shows measurable crime deterrence.',
  true,
  '2025-01-03 09:15:00+02'
),
(
  'Professional Guard Training: Addressing Current Security Challenges',
  'All SecureGuard personnel have completed updated certification programs designed to address evolving security challenges identified through Q4 2024-2025 crime data analysis. Our training protocols are continuously updated to ensure our guards are prepared for current threat patterns.

Updated training modules include:
- Current crime pattern recognition
- Emergency response protocols
- Technology integration (CCTV, communication systems)
- Conflict de-escalation techniques
- Legal compliance and reporting procedures
- First aid and emergency medical response

Our four service levels maintain distinct training requirements:
- Basic Level (R45/hour): Foundation security training + area-specific protocols
- Armed Level (R65/hour): Weapons certification + advanced threat response
- Supervisor Level (R75/hour): Team leadership + incident management
- Premium Level (R90/hour): Specialized protection + executive security protocols

Ongoing training ensures our security personnel remain current with best practices and legal requirements, providing clients with professional, reliable protection services.',
  'Security personnel complete advanced training addressing current crime patterns and prevention strategies.',
  true,
  '2024-12-28 13:00:00+02'
);

-- Update the news table to ensure proper ordering
UPDATE public.news SET updated_at = published_at WHERE published = true;
