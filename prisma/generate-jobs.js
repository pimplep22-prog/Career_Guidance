// Generate 100+ jobs programmatically
const fs = require('fs');

const companies = ['Tech Corp', 'Innovation Ltd', 'Digital Solutions', 'Smart Systems', 'Future Tech', 'Cloud First', 'Data Insights', 'AI Labs'];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida', 'Remote'];

const jobTemplates = {
  Technology: [
    { title: 'Software Developer', skills: ['JavaScript', 'React', 'Node.js'], salary: '6-12 LPA', exp: '2-4 years' },
    { title: 'Full Stack Developer', skills: ['React', 'Node.js', 'MongoDB'], salary: '8-15 LPA', exp: '3-5 years' },
    { title: 'Backend Developer', skills: ['Python', 'Django', 'PostgreSQL'], salary: '7-14 LPA', exp: '2-5 years' },
    { title: 'Frontend Developer', skills: ['React', 'TypeScript', 'CSS'], salary: '6-12 LPA', exp: '2-4 years' },
    { title: 'Mobile Developer', skills: ['React Native', 'Flutter', 'Firebase'], salary: '7-14 LPA', exp: '2-5 years' },
    { title: 'DevOps Engineer', skills: ['Docker', 'Kubernetes', 'AWS'], salary: '10-18 LPA', exp: '3-6 years' },
    { title: 'Data Scientist', skills: ['Python', 'ML', 'TensorFlow'], salary: '12-22 LPA', exp: '3-6 years' },
    { title: 'QA Engineer', skills: ['Selenium', 'Testing', 'Automation'], salary: '5-10 LPA', exp: '2-4 years' },
    { title: 'Cloud Architect', skills: ['AWS', 'Azure', 'Architecture'], salary: '15-25 LPA', exp: '5-8 years' },
    { title: 'Cybersecurity Analyst', skills: ['Security', 'SIEM', 'Pentesting'], salary: '10-18 LPA', exp: '3-6 years' },
    { title: 'AI/ML Engineer', skills: ['Deep Learning', 'PyTorch', 'NLP'], salary: '15-28 LPA', exp: '4-7 years' },
    { title: 'Database Administrator', skills: ['SQL', 'Oracle', 'MySQL'], salary: '7-14 LPA', exp: '3-6 years' },
    { title: 'UI/UX Designer', skills: ['Figma', 'Design', 'Prototyping'], salary: '6-12 LPA', exp: '2-5 years' },
    { title: 'Product Manager', skills: ['Product Strategy', 'Agile', 'Analytics'], salary: '15-25 LPA', exp: '4-8 years' },
    { title: 'Technical Writer', skills: ['Documentation', 'Technical Writing'], salary: '4-8 LPA', exp: '1-3 years' },
  ],
  Business: [
    { title: 'Business Analyst', skills: ['Analysis', 'SQL', 'Excel'], salary: '6-12 LPA', exp: '2-5 years' },
    { title: 'Marketing Manager', skills: ['Marketing', 'Strategy', 'Digital'], salary: '8-15 LPA', exp: '3-6 years' },
    { title: 'Sales Manager', skills: ['Sales', 'Leadership', 'CRM'], salary: '8-16 LPA', exp: '4-7 years' },
    { title: 'HR Manager', skills: ['Recruitment', 'HR', 'Employee Relations'], salary: '7-14 LPA', exp: '4-7 years' },
    { title: 'Digital Marketing Specialist', skills: ['SEO', 'Social Media', 'Google Ads'], salary: '4-10 LPA', exp: '2-4 years' },
    { title: 'Operations Manager', skills: ['Operations', 'Supply Chain', 'Management'], salary: '8-15 LPA', exp: '4-7 years' },
    { title: 'Business Development Executive', skills: ['Sales', 'Communication', 'Negotiation'], salary: '4-9 LPA', exp: '1-4 years' },
    { title: 'Project Manager', skills: ['Project Management', 'Agile', 'Leadership'], salary: '10-18 LPA', exp: '5-8 years' },
    { title: 'Financial Analyst', skills: ['Finance', 'Excel', 'Modeling'], salary: '6-12 LPA', exp: '2-5 years' },
    { title: 'Content Marketing Manager', skills: ['Content', 'Writing', 'Strategy'], salary: '5-10 LPA', exp: '2-5 years' },
  ],
  Creative: [
    { title: 'Graphic Designer', skills: ['Photoshop', 'Illustrator', 'Design'], salary: '3-7 LPA', exp: '1-3 years' },
    { title: 'Video Editor', skills: ['Premiere Pro', 'After Effects'], salary: '4-9 LPA', exp: '2-4 years' },
    { title: 'Content Writer', skills: ['Writing', 'SEO', 'Content'], salary: '3-6 LPA', exp: '1-3 years' },
    { title: 'Copywriter', skills: ['Copywriting', 'Advertising', 'Creative'], salary: '4-8 LPA', exp: '2-4 years' },
    { title: 'Motion Graphics Designer', skills: ['After Effects', 'Animation'], salary: '5-10 LPA', exp: '2-5 years' },
    { title: '3D Artist', skills: ['Blender', 'Maya', '3D Modeling'], salary: '4-9 LPA', exp: '1-4 years' },
    { title: 'Animator', skills: ['Animation', '2D/3D', 'Character Design'], salary: '3-7 LPA', exp: '1-3 years' },
    { title: 'Interior Designer', skills: ['Interior Design', 'AutoCAD', '3D'], salary: '4-8 LPA', exp: '2-5 years' },
  ],
  Medical: [
    { title: 'Staff Nurse', skills: ['Nursing', 'Patient Care'], salary: '3-6 LPA', exp: '0-3 years' },
    { title: 'Pharmacist', skills: ['Pharmacy', 'Drug Knowledge'], salary: '3-5 LPA', exp: '0-2 years' },
    { title: 'Physiotherapist', skills: ['Physiotherapy', 'Rehabilitation'], salary: '4-7 LPA', exp: '1-4 years' },
    { title: 'Lab Technician', skills: ['Lab Testing', 'Analysis'], salary: '2-4 LPA', exp: '0-2 years' },
    { title: 'Dietitian', skills: ['Nutrition', 'Diet Planning'], salary: '3-6 LPA', exp: '1-3 years' },
  ],
  Education: [
    { title: 'Teacher', skills: ['Teaching', 'Subject Knowledge'], salary: '3-6 LPA', exp: '1-4 years' },
    { title: 'Online Tutor', skills: ['Teaching', 'Subject Expertise'], salary: '₹300-500/hour', exp: '0+ years' },
    { title: 'Corporate Trainer', skills: ['Training', 'Presentation'], salary: '5-10 LPA', exp: '3-6 years' },
    { title: 'Curriculum Developer', skills: ['Curriculum Design', 'Education'], salary: '5-9 LPA', exp: '2-5 years' },
  ],
  Engineering: [
    { title: 'Civil Engineer', skills: ['Civil Engineering', 'Construction'], salary: '4-10 LPA', exp: '2-5 years' },
    { title: 'Mechanical Engineer', skills: ['Mechanical', 'CAD', 'Manufacturing'], salary: '4-10 LPA', exp: '2-5 years' },
    { title: 'Electrical Engineer', skills: ['Electrical', 'Power Systems'], salary: '4-10 LPA', exp: '2-5 years' },
    { title: 'Architect', skills: ['Architecture', 'AutoCAD', 'Design'], salary: '5-12 LPA', exp: '2-5 years' },
  ],
};

const types = ['Full-time', 'Part-time', 'Internship', 'Freelance'];
const descriptions = {
  'Full-time': 'Exciting opportunity to work on challenging projects. Join our dynamic team.',
  'Part-time': 'Flexible part-time opportunity with good compensation. Work-life balance.',
  'Internship': 'Learn and grow with mentorship. Hands-on experience on real projects.',
  'Freelance': 'Freelance opportunity with flexible hours. Work on your own schedule.',
};

let jobs = [];
let jobCount = 0;

// Generate jobs from templates
Object.keys(jobTemplates).forEach((category) => {
  jobTemplates[category].forEach((template) => {
    // Create multiple variations of each job
    for (let i = 0; i < 3 && jobCount < 110; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = cities[Math.floor(Math.random() * cities.length)];
      let type = types[i % 2 === 0 ? 0 : (i % 3 === 0 ? 2 : 1)]; // Mostly full-time, some internships
      
      const dateOffset = Math.floor(Math.random() * 30);
      const postedDate = new Date('2026-08-01');
      postedDate.setDate(postedDate.getDate() + dateOffset);
      
      const job = {
        title: template.title,
        company: company,
        location: location,
        type: type,
        salary: type === 'Internship' ? '₹15,000-25,000/month' : template.salary,
        experience: type === 'Internship' ? 'Fresher' : template.exp,
        skills: template.skills,
        requirements: [
          type === 'Internship' ? 'Student/Fresher' : 'Relevant degree',
          type === 'Internship' ? 'Basic knowledge' : template.exp,
          'Required skills'
        ],
        description: descriptions[type],
        applyLink: `https://careers.example.com/job${jobCount + 1}`,
        category: category,
        postedDate: `new Date('${postedDate.toISOString().split('T')[0]}')`
      };
      
      jobs.push(job);
      jobCount++;
      
      if (jobCount >= 110) break;
    }
    if (jobCount >= 110) return;
  });
  if (jobCount >= 110) return;
});

// Generate the JavaScript file
let output = '// 100+ Comprehensive Job Listings\nconst jobs = [\n';

jobs.forEach((job, index) => {
  output += `  {\n`;
  output += `    title: '${job.title}',\n`;
  output += `    company: '${job.company}',\n`;
  output += `    location: '${job.location}',\n`;
  output += `    type: '${job.type}',\n`;
  output += `    salary: '${job.salary}',\n`;
  output += `    experience: '${job.experience}',\n`;
  output += `    skills: JSON.stringify(${JSON.stringify(job.skills)}),\n`;
  output += `    requirements: JSON.stringify(${JSON.stringify(job.requirements)}),\n`;
  output += `    description: '${job.description}',\n`;
  output += `    applyLink: '${job.applyLink}',\n`;
  output += `    category: '${job.category}',\n`;
  output += `    postedDate: ${job.postedDate}\n`;
  output += `  }${index < jobs.length - 1 ? ',' : ''}\n`;
});

output += ']\n\nmodule.exports = jobs\n';

fs.writeFileSync('./prisma/jobs-data.js', output);
console.log(`✅ Generated ${jobs.length} jobs`);
