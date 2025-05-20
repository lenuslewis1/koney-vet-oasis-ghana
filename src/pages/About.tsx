
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Samuel Koney',
    role: 'Founder & Lead Veterinarian',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Dr. Koney founded the hospital in 2010 after practicing for 15 years. He specializes in small animal medicine and surgery.',
  },
  {
    id: 2,
    name: 'Dr. Abena Mensah',
    role: 'Senior Veterinarian',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'With over 10 years of experience, Dr. Mensah specializes in avian and exotic pet medicine.',
  },
  {
    id: 3,
    name: 'Dr. Kwame Nkrumah',
    role: 'Veterinary Surgeon',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Dr. Nkrumah is our surgical specialist, with particular expertise in orthopedic procedures.',
  },
  {
    id: 4,
    name: 'Akosua Boateng',
    role: 'Veterinary Nurse',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    bio: 'Akosua has been with us since our founding and leads our nursing team with compassion and expertise.',
  },
  {
    id: 5,
    name: 'Kofi Adu',
    role: 'Pet Groomer',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    bio: 'Kofi is a certified pet groomer with a special talent for handling anxious pets.',
  },
  {
    id: 6,
    name: 'Ama Darko',
    role: 'Practice Manager',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    bio: 'Ama ensures that the hospital runs smoothly, coordinating our team and managing operations.',
  },
];

const About = () => {
  return (
    <MainLayout>
      <PageHeader
        title="About Us"
        description="Meet our dedicated team providing exceptional veterinary care since 2010"
        bgImage="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=1200&q=80"
                alt="Koney's Veterinary Hospital building"
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <SectionHeading 
                title="Our Story"
                subtitle="Who We Are"
              />
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Founded in 2010 by Dr. Samuel Koney, our veterinary hospital has grown from a small clinic to a comprehensive pet care center serving the greater Accra area. What started as a dream to provide quality veterinary care in Ghana has evolved into a state-of-the-art facility with a team of dedicated professionals.
                </p>
                
                <p className="text-gray-700">
                  Our mission is simple: to provide exceptional veterinary care with compassion and expertise. We believe that pets are family members who deserve the same level of medical attention and care as humans, and we work tirelessly to ensure their health and happiness.
                </p>
                
                <p className="text-gray-700">
                  Over the years, we've expanded our services to include not just medical care but also grooming, boarding, and a comprehensive pet shop to meet all your pet needs in one place.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <SectionHeading 
              title="Our Core Values"
              subtitle="What We Believe"
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-vet-teal/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-vet-teal">1</span>
                </div>
                <h3 className="text-xl font-semibold text-vet-dark mb-3">Compassionate Care</h3>
                <p className="text-gray-600">
                  We treat every pet with the love and attention they deserve, understanding the special bond between pets and their owners.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-vet-teal/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-vet-teal">2</span>
                </div>
                <h3 className="text-xl font-semibold text-vet-dark mb-3">Medical Excellence</h3>
                <p className="text-gray-600">
                  We commit to ongoing education and investing in modern equipment to provide the highest standard of veterinary medicine.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-vet-teal/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-vet-teal">3</span>
                </div>
                <h3 className="text-xl font-semibold text-vet-dark mb-3">Client Education</h3>
                <p className="text-gray-600">
                  We believe informed pet owners make better decisions, so we take time to educate and guide you through your pet's health journey.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <SectionHeading 
              title="Our Team"
              subtitle="Meet The Experts"
              centered={true}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-custom hover:shadow-lg"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-vet-dark">{member.name}</h3>
                    <p className="text-vet-teal font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
