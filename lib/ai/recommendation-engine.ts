import { prisma } from '@/lib/prisma'
import { parseJSON } from '@/lib/utils'

export interface UserProfile {
  interests: string[]
  skills: string[]
  aptitudes: string[]
  personality: string[]
  education: string
  currentStatus: string
}

export interface CareerMatch {
  careerId: string
  careerTitle: string
  score: number
  reasons: string[]
  basedOn: string[]
}

/**
 * Calculate career match score based on user profile
 * This is a rule-based AI system that can be enhanced with ML models
 */
export async function calculateCareerMatches(
  userProfile: UserProfile
): Promise<CareerMatch[]> {
  const careers = await prisma.career.findMany()
  
  const matches: CareerMatch[] = []

  for (const career of careers) {
    const careerInterests = parseJSON<string[]>(career.interests, [])
    const careerSkills = parseJSON<string[]>(career.requiredSkills, [])
    const careerPersonality = parseJSON<string[]>(career.personality, [])
    const careerAptitudes = parseJSON<string[]>(career.aptitudes, [])
    
    let score = 0
    const reasons: string[] = []
    const basedOn: string[] = []

    // Interest matching (30% weight)
    const interestMatches = userProfile.interests.filter(interest =>
      careerInterests.some(ci => ci.toLowerCase().includes(interest.toLowerCase()))
    )
    if (interestMatches.length > 0) {
      const interestScore = (interestMatches.length / Math.max(userProfile.interests.length, 1)) * 30
      score += interestScore
      reasons.push(`${interestMatches.length} of your interests align with this career`)
      basedOn.push('interests')
    }

    // Skill matching (25% weight)
    const skillMatches = userProfile.skills.filter(skill =>
      careerSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
    )
    if (skillMatches.length > 0) {
      const skillScore = (skillMatches.length / Math.max(careerSkills.length, 1)) * 25
      score += skillScore
      reasons.push(`You already have ${skillMatches.length} relevant skills`)
      basedOn.push('skills')
    }

    // Personality matching (25% weight)
    const personalityMatches = userProfile.personality.filter(trait =>
      careerPersonality.some(cp => cp.toLowerCase().includes(trait.toLowerCase()))
    )
    if (personalityMatches.length > 0) {
      const personalityScore = (personalityMatches.length / Math.max(userProfile.personality.length, 1)) * 25
      score += personalityScore
      reasons.push(`Your personality traits match this career well`)
      basedOn.push('personality')
    }

    // Aptitude matching (20% weight)
    const aptitudeMatches = userProfile.aptitudes.filter(aptitude =>
      careerAptitudes.some(ca => ca.toLowerCase().includes(aptitude.toLowerCase()))
    )
    if (aptitudeMatches.length > 0) {
      const aptitudeScore = (aptitudeMatches.length / Math.max(userProfile.aptitudes.length, 1)) * 20
      score += aptitudeScore
      reasons.push(`Your aptitudes are well-suited for this field`)
      basedOn.push('aptitude')
    }

    // Add bonus points for high demand careers
    if (career.demandLevel === 'High' || career.futureDemand === 'Growing') {
      score += 5
      reasons.push(`High demand and growing field`)
      basedOn.push('market trends')
    }

    // Only include careers with reasonable match
    if (score > 15) {
      matches.push({
        careerId: career.id,
        careerTitle: career.title,
        score: Math.min(score, 100), // Cap at 100
        reasons,
        basedOn,
      })
    }
  }

  // Sort by score (highest first)
  return matches.sort((a, b) => b.score - a.score)
}

/**
 * Generate skill gap analysis for a specific career
 */
export async function analyzeSkillGap(
  userSkills: string[],
  careerId: string
): Promise<{
  hasSkills: string[]
  missingSkills: string[]
  recommendations: string[]
}> {
  const career = await prisma.career.findUnique({
    where: { id: careerId }
  })

  if (!career) {
    return { hasSkills: [], missingSkills: [], recommendations: [] }
  }

  const requiredSkills = parseJSON<string[]>(career.requiredSkills, [])
  
  const hasSkills = userSkills.filter(skill =>
    requiredSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase()))
  )

  const missingSkills = requiredSkills.filter(rs =>
    !userSkills.some(skill => rs.toLowerCase().includes(skill.toLowerCase()))
  )

  // Generate recommendations for missing skills
  const recommendations = missingSkills.map(skill =>
    `Consider learning ${skill} through online courses or workshops`
  )

  return {
    hasSkills,
    missingSkills,
    recommendations
  }
}

/**
 * Generate personalized learning roadmap
 */
export async function generateLearningRoadmap(
  careerId: string,
  userSkills: string[]
): Promise<{
  title: string
  steps: Array<{
    phase: string
    duration: string
    skills: string[]
    resources: string[]
  }>
}> {
  const career = await prisma.career.findUnique({
    where: { id: careerId },
    include: {
      roadmaps: true
    }
  })

  if (!career) {
    throw new Error('Career not found')
  }

  // Get existing roadmap or generate basic one
  if (career.roadmaps.length > 0) {
    const roadmap = career.roadmaps[0]
    return {
      title: roadmap.title,
      steps: parseJSON(roadmap.steps, [])
    }
  }

  // Generate basic roadmap
  const requiredSkills = parseJSON<string[]>(career.requiredSkills, [])
  const skillGap = await analyzeSkillGap(userSkills, careerId)

  return {
    title: `Path to ${career.title}`,
    steps: [
      {
        phase: 'Foundation',
        duration: '3-6 months',
        skills: skillGap.missingSkills.slice(0, 3),
        resources: ['Online courses', 'Books', 'Practice projects']
      },
      {
        phase: 'Intermediate',
        duration: '6-12 months',
        skills: skillGap.missingSkills.slice(3, 6),
        resources: ['Advanced courses', 'Real-world projects', 'Mentorship']
      },
      {
        phase: 'Advanced',
        duration: '12+ months',
        skills: skillGap.missingSkills.slice(6),
        resources: ['Specialization', 'Industry experience', 'Certifications']
      }
    ]
  }
}

/**
 * Simple AI chatbot response generator (rule-based)
 * Can be enhanced with actual AI models like OpenAI GPT
 */
export async function generateChatbotResponse(
  message: string,
  context: { userId?: string } = {}
): Promise<string> {
  const lowerMessage = message.toLowerCase()

  // Career exploration queries
  if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
    if (lowerMessage.includes('engineering')) {
      return "Engineering is a diverse field with many specializations. Are you interested in Computer Science, Mechanical, Electrical, or Civil Engineering? I can help you explore each field's requirements, career prospects, and top colleges."
    }
    if (lowerMessage.includes('medical') || lowerMessage.includes('doctor')) {
      return "A medical career is noble and rewarding! To become a doctor, you'll need to clear NEET and pursue MBBS. The journey takes 5.5 years of study plus internship. Would you like to know about medical entrance exams, top colleges, or alternative medical careers?"
    }
    return "I can help you explore various career options! What are your interests? Are you more inclined towards Science, Arts, Commerce, or something specific?"
  }

  // Exam queries
  if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
    if (lowerMessage.includes('jee')) {
      return "JEE Main and JEE Advanced are the premier engineering entrance exams in India. JEE Main is conducted twice a year, and top scorers can attempt JEE Advanced for IIT admission. Would you like information about exam pattern, syllabus, or preparation tips?"
    }
    if (lowerMessage.includes('neet')) {
      return "NEET is the single entrance exam for all medical colleges in India. It's conducted once a year with Physics, Chemistry, and Biology sections. Would you like to know about eligibility, syllabus, or top medical colleges?"
    }
    return "I can provide information about various competitive exams including JEE, NEET, UPSC, CAT, and more. Which exam are you interested in?"
  }

  // After 10th/12th queries
  if (lowerMessage.includes('after 10th') || lowerMessage.includes('after tenth')) {
    return "After 10th, you have several options:\n1. Choose Science stream (PCM/PCB) for engineering/medical\n2. Choose Commerce for CA, business\n3. Choose Arts for humanities, design, law\n4. Pursue vocational courses or diplomas\n\nWhat are your interests and strengths? I can provide personalized guidance."
  }

  if (lowerMessage.includes('after 12th') || lowerMessage.includes('after twelfth')) {
    return "After 12th, your options depend on your stream:\n• Science: Engineering, Medical, Research, BSc\n• Commerce: CA, CS, BCom, BBA, Economics\n• Arts: Law, Design, BA, Hotel Management, Mass Communication\n\nWould you like detailed information about any specific field?"
  }

  // College/course queries
  if (lowerMessage.includes('college') || lowerMessage.includes('university')) {
    return "I can help you find the right college! Are you looking for:\n• Top engineering colleges (IITs, NITs, IIITs)\n• Medical colleges\n• Management institutes (IIMs, FMS)\n• Arts and Humanities colleges\n• Or a specific course?\n\nPlease tell me your preferred field and location."
  }

  // Scholarship queries
  if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
    return "There are many scholarship opportunities available! Government scholarships include National Scholarship Portal schemes, merit-based scholarships, and minority scholarships. Private organizations and colleges also offer scholarships. Would you like me to find scholarships based on your profile?"
  }

  // Default response
  return "I'm here to help with your career guidance! You can ask me about:\n• Career options and recommendations\n• Colleges and courses\n• Competitive exams\n• What to do after 10th/12th/Graduation\n• Scholarships and financial aid\n• Job and internship opportunities\n\nWhat would you like to know?"
}
