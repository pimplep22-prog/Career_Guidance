import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@careerguide.com' },
    update: {},
    create: {
      email: 'admin@careerguide.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // Create sample student user
  const studentPassword = await bcrypt.hash('student123', 10)
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studentPassword,
      name: 'John Doe',
      role: 'STUDENT',
      currentStatus: '12th Science',
      education: 'High School',
      interests: JSON.stringify(['Technology', 'Problem Solving', 'Innovation']),
      skills: JSON.stringify(['Programming', 'Mathematics', 'Communication']),
    },
  })
  console.log('✅ Sample student created')

  // Create Careers
  const careers = [
    {
      title: 'Software Engineer',
      slug: 'software-engineer',
      description: 'Design, develop, and maintain software applications and systems',
      detailedInfo: 'Software engineers are professionals who apply engineering principles to software development. They design, develop, test, and maintain software applications, systems, and platforms. This role requires strong programming skills, problem-solving abilities, and knowledge of software development methodologies.',
      category: 'Technology',
      subCategory: 'Software Development',
      averageSalary: '8-25 LPA',
      salaryRange: '4-50 LPA',
      demandLevel: 'High',
      futureDemand: 'Growing',
      requiredEducation: JSON.stringify(['B.Tech/BE in Computer Science', 'BCA', 'MCA', 'B.Sc Computer Science']),
      requiredSkills: JSON.stringify(['Programming (Java, Python, C++)', 'Data Structures', 'Algorithms', 'Problem Solving', 'Database Management', 'Version Control (Git)']),
      personality: JSON.stringify(['Analytical', 'Creative', 'Detail-oriented', 'Logical']),
      interests: JSON.stringify(['Technology', 'Problem Solving', 'Innovation', 'Learning']),
      aptitudes: JSON.stringify(['Logical Reasoning', 'Analytical Thinking', 'Technical Aptitude']),
      jobRoles: JSON.stringify(['Junior Developer', 'Senior Software Engineer', 'Tech Lead', 'Software Architect']),
      workEnvironment: 'Office-based or remote, collaborative team environment',
      careerPath: JSON.stringify(['Junior Developer → Senior Developer → Tech Lead → Engineering Manager/Architect']),
      prosAndCons: JSON.stringify({
        pros: ['High salary potential', 'Remote work opportunities', 'Continuous learning', 'High demand'],
        cons: ['Can be stressful', 'Requires constant upskilling', 'Long hours sometimes']
      }),
    },
    {
      title: 'Data Scientist',
      slug: 'data-scientist',
      description: 'Analyze complex data to help organizations make better decisions',
      detailedInfo: 'Data Scientists use statistical analysis, machine learning, and data visualization to extract insights from large datasets. They help organizations make data-driven decisions and solve complex business problems.',
      category: 'Technology',
      subCategory: 'Data Science',
      averageSalary: '10-30 LPA',
      salaryRange: '6-60 LPA',
      demandLevel: 'High',
      futureDemand: 'Growing',
      requiredEducation: JSON.stringify(['B.Tech/BE', 'M.Sc Statistics', 'MBA (Analytics)', 'Ph.D. (optional)']),
      requiredSkills: JSON.stringify(['Python/R', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Big Data tools']),
      personality: JSON.stringify(['Analytical', 'Curious', 'Detail-oriented', 'Strategic']),
      interests: JSON.stringify(['Mathematics', 'Statistics', 'Problem Solving', 'Research']),
      aptitudes: JSON.stringify(['Quantitative Reasoning', 'Analytical Thinking', 'Pattern Recognition']),
      jobRoles: JSON.stringify(['Data Analyst', 'Data Scientist', 'Senior Data Scientist', 'ML Engineer', 'Chief Data Officer']),
    },
    {
      title: 'Doctor (MBBS)',
      slug: 'doctor-mbbs',
      description: 'Diagnose and treat illnesses, injuries, and medical conditions',
      detailedInfo: 'Doctors are medical professionals who diagnose, treat, and prevent illnesses and injuries. After completing MBBS, doctors can specialize in various fields like surgery, pediatrics, cardiology, etc.',
      category: 'Medical',
      subCategory: 'Medicine',
      averageSalary: '8-20 LPA',
      salaryRange: '5-100 LPA',
      demandLevel: 'High',
      futureDemand: 'Stable',
      requiredEducation: JSON.stringify(['MBBS (5.5 years)', 'MD/MS (Specialization)', 'Super-specialization']),
      requiredSkills: JSON.stringify(['Medical Knowledge', 'Diagnosis', 'Communication', 'Empathy', 'Decision Making', 'Patience']),
      personality: JSON.stringify(['Compassionate', 'Detail-oriented', 'Responsible', 'Patient']),
      interests: JSON.stringify(['Biology', 'Helping Others', 'Science', 'Healthcare']),
      aptitudes: JSON.stringify(['Scientific Reasoning', 'Memory', 'Manual Dexterity']),
      jobRoles: JSON.stringify(['Junior Resident', 'Senior Resident', 'Consultant', 'Specialist', 'Surgeon']),
    },
    {
      title: 'Chartered Accountant (CA)',
      slug: 'chartered-accountant',
      description: 'Manage financial accounts, audits, and taxation for organizations',
      detailedInfo: 'Chartered Accountants are financial experts who handle accounting, auditing, taxation, and financial advisory services. CA is one of the most prestigious commerce careers in India.',
      category: 'Commerce',
      subCategory: 'Accounting',
      averageSalary: '7-18 LPA',
      salaryRange: '4-50 LPA',
      demandLevel: 'High',
      futureDemand: 'Stable',
      requiredEducation: JSON.stringify(['CA Foundation', 'CA Intermediate', 'CA Final', 'Articleship (3 years)']),
      requiredSkills: JSON.stringify(['Accounting', 'Taxation', 'Auditing', 'Financial Analysis', 'Attention to Detail', 'Communication']),
      personality: JSON.stringify(['Analytical', 'Meticulous', 'Ethical', 'Organized']),
      interests: JSON.stringify(['Finance', 'Numbers', 'Business', 'Analysis']),
      aptitudes: JSON.stringify(['Numerical Ability', 'Attention to Detail', 'Logical Reasoning']),
      jobRoles: JSON.stringify(['Audit Associate', 'Tax Consultant', 'CFO', 'Financial Advisor', 'Partner in CA firm']),
    },
    {
      title: 'Civil Engineer',
      slug: 'civil-engineer',
      description: 'Design, construct, and maintain infrastructure projects',
      detailedInfo: 'Civil Engineers plan, design, and oversee construction projects like buildings, roads, bridges, dams, and water supply systems. They ensure projects are safe, sustainable, and cost-effective.',
      category: 'Engineering',
      subCategory: 'Civil Engineering',
      averageSalary: '4-12 LPA',
      salaryRange: '3-30 LPA',
      demandLevel: 'Medium',
      futureDemand: 'Stable',
      requiredEducation: JSON.stringify(['B.Tech/BE in Civil Engineering', 'M.Tech (optional)', 'Diploma in Civil Engineering']),
      requiredSkills: JSON.stringify(['AutoCAD', 'Structural Design', 'Project Management', 'Site Supervision', 'Cost Estimation']),
      personality: JSON.stringify(['Practical', 'Organized', 'Problem-solver', 'Detail-oriented']),
      interests: JSON.stringify(['Construction', 'Design', 'Infrastructure', 'Problem Solving']),
      aptitudes: JSON.stringify(['Spatial Reasoning', 'Technical Aptitude', 'Numerical Ability']),
      jobRoles: JSON.stringify(['Site Engineer', 'Project Manager', 'Structural Engineer', 'Consultant', 'Government Engineer']),
    },
    {
      title: 'Digital Marketing Specialist',
      slug: 'digital-marketing-specialist',
      description: 'Promote products and services through digital channels',
      detailedInfo: 'Digital Marketing Specialists use online platforms like social media, search engines, email, and websites to promote brands, products, and services. They analyze campaigns and optimize for better results.',
      category: 'Business',
      subCategory: 'Marketing',
      averageSalary: '4-10 LPA',
      salaryRange: '3-25 LPA',
      demandLevel: 'High',
      futureDemand: 'Growing',
      requiredEducation: JSON.stringify(['Any Degree', 'MBA Marketing (optional)', 'Digital Marketing Certification']),
      requiredSkills: JSON.stringify(['SEO', 'Social Media Marketing', 'Content Creation', 'Analytics', 'Ad Campaigns', 'Email Marketing']),
      personality: JSON.stringify(['Creative', 'Analytical', 'Communicative', 'Adaptable']),
      interests: JSON.stringify(['Marketing', 'Technology', 'Communication', 'Creativity']),
      aptitudes: JSON.stringify(['Communication', 'Creativity', 'Analytical Thinking']),
      jobRoles: JSON.stringify(['Digital Marketing Executive', 'SEO Specialist', 'Social Media Manager', 'Marketing Manager']),
    },
    {
      title: 'Graphic Designer',
      slug: 'graphic-designer',
      description: 'Create visual content for digital and print media',
      detailedInfo: 'Graphic Designers create visual concepts using software or by hand to communicate ideas that inspire, inform, and captivate consumers. They work on logos, websites, advertisements, and more.',
      category: 'Creative',
      subCategory: 'Design',
      averageSalary: '3-8 LPA',
      salaryRange: '2-20 LPA',
      demandLevel: 'Medium',
      futureDemand: 'Growing',
      requiredEducation: JSON.stringify(['B.Des', 'BFA', 'Diploma in Graphic Design', 'Self-taught with portfolio']),
      requiredSkills: JSON.stringify(['Adobe Photoshop', 'Illustrator', 'InDesign', 'Creativity', 'Typography', 'Color Theory']),
      personality: JSON.stringify(['Creative', 'Visual', 'Detail-oriented', 'Artistic']),
      interests: JSON.stringify(['Art', 'Design', 'Creativity', 'Visual Communication']),
      aptitudes: JSON.stringify(['Visual Perception', 'Creativity', 'Attention to Detail']),
      jobRoles: JSON.stringify(['Junior Designer', 'Senior Designer', 'Art Director', 'Creative Director', 'Freelance Designer']),
    },
    {
      title: 'Mechanical Engineer',
      slug: 'mechanical-engineer',
      description: 'Design and develop mechanical systems and products',
      detailedInfo: 'Mechanical Engineers design, analyze, and manufacture mechanical systems, from small components to large machinery. They work in automotive, aerospace, manufacturing, and many other industries.',
      category: 'Engineering',
      subCategory: 'Mechanical Engineering',
      averageSalary: '4-10 LPA',
      salaryRange: '3-25 LPA',
      demandLevel: 'Medium',
      futureDemand: 'Stable',
      requiredEducation: JSON.stringify(['B.Tech/BE in Mechanical Engineering', 'M.Tech (optional)', 'Diploma']),
      requiredSkills: JSON.stringify(['CAD/CAM', 'Thermodynamics', 'Manufacturing Processes', 'Problem Solving', 'Project Management']),
      personality: JSON.stringify(['Analytical', 'Practical', 'Innovative', 'Technical']),
      interests: JSON.stringify(['Machines', 'Design', 'Problem Solving', 'Innovation']),
      aptitudes: JSON.stringify(['Technical Aptitude', 'Spatial Reasoning', 'Mechanical Reasoning']),
      jobRoles: JSON.stringify(['Design Engineer', 'Production Engineer', 'Quality Engineer', 'R&D Engineer', 'Project Manager']),
    },
  ]

  for (const careerData of careers) {
    await prisma.career.upsert({
      where: { slug: careerData.slug },
      update: {},
      create: careerData,
    })
  }
  console.log('✅ Careers created')

  // Create Colleges
  const colleges = [
    {
      name: 'Indian Institute of Technology Delhi',
      slug: 'iit-delhi',
      type: 'Government',
      location: 'Hauz Khas, New Delhi, Delhi',
      state: 'Delhi',
      city: 'New Delhi',
      establishedYear: 1961,
      affiliation: 'Autonomous',
      accreditation: JSON.stringify(['NAAC A++', 'NBA']),
      ranking: JSON.stringify({ nirf: '2', outlook: '1', times: '5' }),
      coursesOffered: JSON.stringify(['B.Tech', 'M.Tech', 'MBA', 'Ph.D.']),
      averageFees: '2-3 Lakhs per year',
      placementRate: '95%',
      averagePackage: '18-20 LPA',
      facilities: JSON.stringify(['Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Innovation Center']),
      admissionProcess: 'JEE Advanced',
      cutoffs: JSON.stringify({ jee_advanced: 'Top 2500 ranks' }),
      contactInfo: JSON.stringify({ phone: '011-26591111', email: 'info@admin.iitd.ac.in', website: 'https://www.iitd.ac.in' }),
      officialWebsite: 'https://www.iitd.ac.in',
    },
    {
      name: 'All India Institute of Medical Sciences Delhi',
      slug: 'aiims-delhi',
      type: 'Government',
      location: 'Ansari Nagar, New Delhi, Delhi',
      state: 'Delhi',
      city: 'New Delhi',
      establishedYear: 1956,
      affiliation: 'Autonomous',
      accreditation: JSON.stringify(['NAAC A++', 'NBA']),
      ranking: JSON.stringify({ nirf: '1 (Medical)', outlook: '1' }),
      coursesOffered: JSON.stringify(['MBBS', 'MD', 'MS', 'B.Sc Nursing', 'Ph.D.']),
      averageFees: 'Minimal (Government)',
      placementRate: '100%',
      averagePackage: 'N/A',
      facilities: JSON.stringify(['Teaching Hospital', 'Research Centers', 'Library', 'Hostels']),
      admissionProcess: 'NEET UG/PG',
      cutoffs: JSON.stringify({ neet_ug: 'Top 100 ranks' }),
      officialWebsite: 'https://www.aiims.edu',
    },
    {
      name: 'Indian Institute of Management Ahmedabad',
      slug: 'iim-ahmedabad',
      type: 'Government',
      location: 'Vastrapur, Ahmedabad, Gujarat',
      state: 'Gujarat',
      city: 'Ahmedabad',
      establishedYear: 1961,
      affiliation: 'Autonomous',
      accreditation: JSON.stringify(['AACSB', 'EQUIS', 'AMBA']),
      ranking: JSON.stringify({ nirf: '1 (Management)', outlook: '1' }),
      coursesOffered: JSON.stringify(['PGP (MBA)', 'PGPX', 'Ph.D.', 'FPM']),
      averageFees: '25-28 Lakhs for 2 years',
      placementRate: '100%',
      averagePackage: '30-35 LPA',
      facilities: JSON.stringify(['Library', 'Sports', 'Hostels', 'Research Centers']),
      admissionProcess: 'CAT + WAT + PI',
      cutoffs: JSON.stringify({ cat: '99+ percentile' }),
      officialWebsite: 'https://www.iima.ac.in',
    },
  ]

  for (const collegeData of colleges) {
    await prisma.college.upsert({
      where: { slug: collegeData.slug },
      update: {},
      create: collegeData,
    })
  }
  console.log('✅ Colleges created')

  // Create Courses
  const courses = [
    {
      title: 'Bachelor of Technology (B.Tech) - Computer Science',
      slug: 'btech-computer-science',
      type: 'Undergraduate',
      duration: '4 years',
      description: 'Comprehensive program in computer science and engineering',
      detailedInfo: 'B.Tech in Computer Science is a 4-year undergraduate program focusing on software development, algorithms, data structures, computer networks, and emerging technologies.',
      eligibility: JSON.stringify(['12th with PCM', 'Minimum 75% marks', 'JEE Main qualification']),
      averageFees: '1-15 Lakhs per year',
      syllabus: JSON.stringify(['Programming', 'Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'AI/ML']),
      skills: JSON.stringify(['Programming', 'Problem Solving', 'Software Development', 'Database Management']),
    },
    {
      title: 'MBBS - Bachelor of Medicine and Bachelor of Surgery',
      slug: 'mbbs',
      type: 'Undergraduate',
      duration: '5.5 years (including internship)',
      description: 'Professional medical degree to become a doctor',
      detailedInfo: 'MBBS is a professional undergraduate medical degree covering anatomy, physiology, pharmacology, pathology, and clinical medicine.',
      eligibility: JSON.stringify(['12th with PCB', 'Minimum 50% marks', 'NEET UG qualification']),
      averageFees: '50,000 - 50 Lakhs (depending on college)',
      syllabus: JSON.stringify(['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Clinical Medicine', 'Surgery']),
      skills: JSON.stringify(['Medical Knowledge', 'Diagnosis', 'Patient Care', 'Communication']),
    },
    {
      title: 'Bachelor of Commerce (B.Com)',
      slug: 'bcom',
      type: 'Undergraduate',
      duration: '3 years',
      description: 'Commerce degree focusing on accounting, finance, and business',
      detailedInfo: 'B.Com is a 3-year undergraduate program in commerce, covering subjects like accounting, taxation, finance, economics, and business management.',
      eligibility: JSON.stringify(['12th Commerce', 'Minimum 45-50% marks']),
      averageFees: '10,000 - 2 Lakhs per year',
      syllabus: JSON.stringify(['Accounting', 'Business Law', 'Economics', 'Taxation', 'Finance', 'Business Management']),
      skills: JSON.stringify(['Accounting', 'Financial Analysis', 'Business Understanding', 'Taxation']),
    },
  ]

  for (const courseData of courses) {
    await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: courseData,
    })
  }
  console.log('✅ Courses created')

  // Create Exams
  const exams = [
    {
      name: 'JEE Main',
      slug: 'jee-main',
      fullName: 'Joint Entrance Examination Main',
      type: 'Entrance',
      category: 'Engineering',
      conductedBy: 'National Testing Agency (NTA)',
      examLevel: 'National',
      description: 'National level engineering entrance exam for admission to NITs, IIITs, and other engineering colleges',
      eligibility: JSON.stringify(['12th with PCM', '75% in 12th or top 20 percentile', 'Age limit: Born on or after Oct 1, 1999']),
      examPattern: JSON.stringify({
        mode: 'Computer Based Test',
        papers: 'Paper 1 (B.E/B.Tech), Paper 2 (B.Arch/B.Planning)',
        sections: 'Physics, Chemistry, Mathematics',
        duration: '3 hours',
        totalMarks: '300',
        questions: '90 (75 MCQ + 15 Numerical)'
      }),
      syllabus: JSON.stringify(['Physics: Mechanics, Thermodynamics, Electromagnetism', 'Chemistry: Physical, Organic, Inorganic', 'Mathematics: Calculus, Algebra, Trigonometry']),
      applicationFee: '₹650-1000',
      importantDates: JSON.stringify({
        registration: 'February',
        exam: 'April & May (two sessions)',
        result: 'June'
      }),
      officialWebsite: 'https://jeemain.nta.nic.in',
      preparationTips: JSON.stringify(['Study NCERT thoroughly', 'Practice previous year papers', 'Take mock tests', 'Focus on weak areas']),
    },
    {
      name: 'NEET UG',
      slug: 'neet-ug',
      fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
      type: 'Entrance',
      category: 'Medical',
      conductedBy: 'National Testing Agency (NTA)',
      examLevel: 'National',
      description: 'National level medical entrance exam for MBBS and BDS admissions',
      eligibility: JSON.stringify(['12th with PCB', 'Minimum 50% (40% for SC/ST/OBC)', 'Age: Minimum 17 years']),
      examPattern: JSON.stringify({
        mode: 'Pen and Paper (Offline)',
        sections: 'Physics, Chemistry, Botany, Zoology',
        duration: '3 hours 20 minutes',
        totalMarks: '720',
        questions: '200 (180 to be attempted)'
      }),
      syllabus: JSON.stringify(['Physics: Mechanics, Optics, Modern Physics', 'Chemistry: Physical, Organic, Inorganic', 'Biology: Botany, Zoology, Human Physiology']),
      applicationFee: '₹1000-1700',
      importantDates: JSON.stringify({
        registration: 'March',
        exam: 'May',
        result: 'June'
      }),
      officialWebsite: 'https://neet.nta.nic.in',
      preparationTips: JSON.stringify(['Master NCERT Biology', 'Practice MCQs daily', 'Understand concepts, don't memorize', 'Solve previous years']),
    },
  ]

  for (const examData of exams) {
    await prisma.exam.upsert({
      where: { slug: examData.slug },
      update: {},
      create: examData,
    })
  }
  console.log('✅ Exams created')

  // Create Jobs
  const jobs = [
    {
      title: 'Software Developer - Full Stack',
      company: 'Tech Solutions Pvt Ltd',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: 'Fresher - 2 years',
      salary: '4-8 LPA',
      description: 'Looking for a full-stack developer to work on web applications using React, Node.js, and MongoDB.',
      requirements: JSON.stringify(['B.Tech/MCA in Computer Science', 'Knowledge of React, Node.js', 'Strong problem-solving skills']),
      skills: JSON.stringify(['React', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs']),
      applyLink: 'https://example.com/apply',
      category: 'Technology',
      isActive: true,
    },
    {
      title: 'Data Analyst Intern',
      company: 'Analytics Corp',
      location: 'Mumbai, Maharashtra',
      type: 'Internship',
      experience: 'Fresher',
      salary: '15,000-25,000 per month',
      description: 'Internship opportunity for data analysts to work on real-world data projects.',
      requirements: JSON.stringify(['Graduate in any field', 'Basic knowledge of Python/R', 'Understanding of statistics']),
      skills: JSON.stringify(['Python', 'Excel', 'SQL', 'Data Visualization']),
      applyLink: 'https://example.com/apply',
      category: 'Technology',
      isActive: true,
    },
  ]

  for (const jobData of jobs) {
    await prisma.job.create({ data: jobData })
  }
  console.log('✅ Jobs created')

  // Create Internships
  const internships = [
    {
      title: 'Web Development Intern',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Remote',
      duration: '3 months',
      stipend: '₹10,000-15,000 per month',
      description: 'Build modern web applications using latest technologies.',
      requirements: JSON.stringify(['Currently pursuing B.Tech/BCA', 'Knowledge of HTML, CSS, JavaScript', 'Willing to learn']),
      skills: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'React (preferred)']),
      applyLink: 'https://example.com/apply',
      category: 'Technology',
      isActive: true,
    },
    {
      title: 'Graphic Design Intern',
      company: 'Creative Agency',
      location: 'Delhi',
      type: 'On-site',
      duration: '6 months',
      stipend: '₹8,000-12,000 per month',
      description: 'Create visual designs for digital and print media.',
      requirements: JSON.stringify(['Portfolio required', 'Proficiency in Adobe Creative Suite', 'Creative mindset']),
      skills: JSON.stringify(['Photoshop', 'Illustrator', 'InDesign', 'Creativity']),
      applyLink: 'https://example.com/apply',
      category: 'Creative',
      isActive: true,
    },
  ]

  for (const internshipData of internships) {
    await prisma.internship.create({ data: internshipData })
  }
  console.log('✅ Internships created')

  // Create Scholarships
  const scholarships = [
    {
      name: 'National Scholarship Portal - Post-Matric',
      slug: 'nsp-post-matric',
      provider: 'Government of India',
      amount: '₹10,000-20,000 per year',
      description: 'Scholarship for students from SC/ST/OBC categories pursuing post-matric studies',
      eligibility: JSON.stringify(['SC/ST/OBC students', 'Studying in class 11th or above', 'Family income below ₹2.5 lakhs']),
      applicationProcess: 'Apply online through National Scholarship Portal',
      importantDates: JSON.stringify({ application: 'August-October', disbursement: 'December-January' }),
      officialLink: 'https://scholarships.gov.in',
      category: 'Merit-based',
      targetGroup: 'SC/ST/OBC',
    },
    {
      name: 'INSPIRE Scholarship',
      slug: 'inspire-scholarship',
      provider: 'Department of Science and Technology',
      amount: '₹80,000 per year',
      description: 'Scholarship for students pursuing B.Sc/B.S/M.Sc in Natural and Basic Sciences',
      eligibility: JSON.stringify(['Rank in top 1% in Class 12 board exams', 'Pursuing Basic Sciences']),
      applicationProcess: 'Online application through INSPIRE portal',
      importantDates: JSON.stringify({ application: 'Throughout the year' }),
      officialLink: 'https://online-inspire.gov.in',
      category: 'Merit-based',
      targetGroup: 'General',
    },
  ]

  for (const scholarshipData of scholarships) {
    await prisma.scholarship.upsert({
      where: { slug: scholarshipData.slug },
      update: {},
      create: scholarshipData,
    })
  }
  console.log('✅ Scholarships created')

  // Create Learning Resources
  const resources = [
    {
      title: 'Introduction to Computer Science',
      type: 'Course',
      provider: 'Coursera',
      url: 'https://www.coursera.org/courses/computer-science',
      description: 'Free online course covering basics of computer science',
      category: 'Technology',
      isFree: true,
      rating: 4.8,
      duration: '6 weeks',
      skills: JSON.stringify(['Programming', 'Algorithms', 'Problem Solving']),
      level: 'Beginner',
    },
    {
      title: 'Complete Python Tutorial',
      type: 'Tutorial',
      provider: 'YouTube',
      url: 'https://www.youtube.com/python-tutorial',
      description: 'Comprehensive Python programming tutorial for beginners',
      category: 'Technology',
      isFree: true,
      rating: 4.6,
      duration: '10 hours',
      skills: JSON.stringify(['Python', 'Programming']),
      level: 'Beginner',
    },
  ]

  for (const resourceData of resources) {
    await prisma.learningResource.create({ data: resourceData })
  }
  console.log('✅ Learning resources created')

  // Create Test
  const personalityTest = await prisma.test.create({
    data: {
      title: 'Career Personality Assessment',
      type: 'Personality',
      description: 'Discover your personality type and suitable career paths',
      duration: 15,
      questions: JSON.stringify([
        {
          id: 1,
          question: 'I enjoy solving complex problems',
          options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
          trait: 'analytical'
        },
        {
          id: 2,
          question: 'I prefer working in teams rather than alone',
          options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
          trait: 'social'
        },
        {
          id: 3,
          question: 'I like creating new things and being innovative',
          options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
          trait: 'creative'
        },
      ]),
      scoring: JSON.stringify({
        analytical: 'High analytical traits suit careers in engineering, data science, research',
        social: 'High social traits suit careers in teaching, counseling, HR',
        creative: 'High creative traits suit careers in design, arts, content creation'
      }),
      isActive: true,
    }
  })
  console.log('✅ Test created')

  // Create FAQs
  const faqs = [
    {
      category: 'general',
      question: 'How do I choose the right career?',
      answer: 'Choosing the right career involves self-assessment of your interests, skills, personality, values, and goals. Take our career assessment tests, explore different careers, talk to professionals, and consider both passion and practical factors like job prospects and salary.',
      language: 'en',
    },
    {
      category: 'exams',
      question: 'When should I start preparing for competitive exams?',
      answer: 'Ideally, start preparing at least 1-2 years before the exam. However, consistent daily preparation of 4-5 hours for 6-8 months can also yield good results. Focus on understanding concepts, regular practice, and taking mock tests.',
      language: 'en',
    },
  ]

  for (const faqData of faqs) {
    await prisma.fAQ.create({ data: faqData })
  }
  console.log('✅ FAQs created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
