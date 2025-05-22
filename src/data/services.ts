import { Syringe, Stethoscope, Scissors, Dog, PawPrint, Calendar } from 'lucide-react';

export const services = [
  {
    id: 'preventative',
    title: 'Preventative Care',
    description: 'Regular check-ups and preventative treatments are essential for maintaining your pet\'s health and catching potential issues early. Our comprehensive wellness exams include thorough physical assessments and personalized care recommendations.',
    icon: PawPrint,
    image: 'https://images.unsplash.com/photo-1551832586-4079ef0a8978?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵150 per visit',
    longDescription: [
      "Preventative care is the foundation of your pet's health. At Koney's Veterinary Hospital, we believe that preventing disease is always better than treating it. Our preventative care services are designed to keep your pet healthy throughout their life.",
      "Our comprehensive wellness exams allow us to detect potential health issues before they become serious problems. During these exams, our veterinarians will conduct a thorough physical assessment, checking everything from your pet's eyes and ears to their heart and lungs.",
      "Based on your pet's age, breed, lifestyle, and health status, we'll develop a personalized preventative care plan that may include vaccinations, parasite prevention, dental care, nutrition counseling, and behavioral advice."
    ],
    benefits: [
      'Early detection of health issues',
      'Prevention of common diseases',
      'Personalized health recommendations',
      'Reduced long-term healthcare costs',
      'Extended pet lifespan and improved quality of life'
    ],
    process: [
      {
        title: 'Comprehensive Physical Examination',
        description: 'Our veterinarians will conduct a thorough nose-to-tail examination of your pet, checking all body systems for any abnormalities.'
      },
      {
        title: 'Health History Review',
        description: 'We will discuss your pet\'s health history, lifestyle, diet, and any concerns you may have.'
      },
      {
        title: 'Diagnostic Testing',
        description: 'Depending on your pet\'s age and health status, we may recommend blood tests, fecal exams, or other diagnostic procedures.'
      },
      {
        title: 'Personalized Care Plan',
        description: 'Based on our findings, we will develop a tailored preventative care plan for your pet.'
      }
    ],
    faqs: [
      {
        question: 'How often should my pet have a wellness exam?',
        answer: 'We recommend annual wellness exams for adult pets in good health. Senior pets, puppies, kittens, and pets with chronic conditions may need more frequent check-ups.'
      },
      {
        question: 'What happens during a wellness exam?',
        answer: "During a wellness exam, our veterinarians will check your pet's weight, temperature, heart rate, and respiratory rate. We'll also examine their eyes, ears, mouth, skin, coat, and internal organs. We may recommend additional tests based on our findings."
      },
      {
        question: "How can I prepare for my pet's wellness exam?",
        answer: "Before your appointment, make note of any changes in your pet's behavior, appetite, water consumption, or bathroom habits. Bring any medications your pet is currently taking, and if possible, a fresh stool sample."
      }
    ]
  },
  {
    id: 'vaccinations',
    title: 'Vaccinations',
    description: "Protect your pets from common and potentially fatal diseases with our vaccination programs. We offer core and non-core vaccines tailored to your pet's lifestyle and risk factors, following international veterinary guidelines.",
    icon: Syringe,
    image: 'https://images.unsplash.com/photo-1559000357-f6b52ddfcb99?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵120 per vaccination',
    longDescription: [
      "Vaccinations are a crucial part of preventative healthcare for pets. They protect against serious and potentially fatal diseases by stimulating the immune system to recognize and fight specific infections.",
      "At Koney's Veterinary Hospital, we develop customized vaccination protocols based on your pet's species, age, lifestyle, and risk factors. We follow the latest guidelines from veterinary authorities to ensure your pet receives the most appropriate vaccines at the right time.",
      "We offer both core vaccines (recommended for all pets) and non-core vaccines (recommended based on lifestyle and exposure risk). Our veterinarians will discuss which vaccines are right for your pet during your consultation."
    ],
    benefits: [
      'Protection against serious and potentially fatal diseases',
      'Prevention of disease transmission to other pets and humans (in case of zoonotic diseases)',
      'Compliance with boarding, grooming, and travel requirements',
      'Peace of mind knowing your pet is protected',
      'Cost-effective prevention compared to treating diseases'
    ],
    process: [
      {
        title: 'Pre-Vaccination Assessment',
        description: 'Before administering any vaccines, our veterinarians will examine your pet to ensure they are healthy enough to receive vaccinations.'
      },
      {
        title: 'Vaccine Administration',
        description: 'Vaccines are typically administered via injection under the skin. Some vaccines may be given intranasally (in the nose).'
      },
      {
        title: 'Post-Vaccination Monitoring',
        description: "We'll monitor your pet briefly after vaccination to ensure there are no immediate adverse reactions."
      },
      {
        title: 'Vaccination Certificate',
        description: "You'll receive a vaccination certificate documenting which vaccines your pet received and when boosters are due."
      }
    ],
    pricingDetails: [
      { name: 'Core Dog Vaccines (DHPP)', price: 120 },
      { name: 'Rabies Vaccine', price: 150 },
      { name: 'Core Cat Vaccines (FVRCP)', price: 120 },
      { name: 'Leptospirosis', price: 180 },
      { name: 'Bordetella (Kennel Cough)', price: 150 }
    ],
    faqs: [
      {
        question: 'Are vaccines safe for my pet?',
        answer: "Vaccines are generally very safe. Like any medical procedure, there is a small risk of side effects, but the benefits of vaccination far outweigh the risks for most pets. Our veterinarians carefully assess each pet to minimize risks."
      },
      {
        question: 'How often does my pet need vaccines?',
        answer: "Vaccination schedules vary depending on the specific vaccine, your pet's age, and risk factors. Some vaccines provide protection for a year, while others may last three years or longer. Our veterinarians will create a customized vaccination schedule for your pet."
      },
      {
        question: 'Can my pet receive multiple vaccines at once?',
        answer: "Yes, pets can typically receive multiple vaccines during the same visit. However, in some cases, especially for small or sensitive pets, we may recommend spacing out vaccines to reduce the risk of side effects."
      }
    ]
  },
  {
    id: 'surgery',
    title: 'Surgical Services',
    description: "Our surgical suite is equipped for a wide range of procedures, from routine spay/neuter surgeries to more complex operations. Our experienced veterinary surgeons use modern techniques and comprehensive pain management protocols for the safety and comfort of your pet.",
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1581590212809-c0c134d89a42?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵400 depending on procedure',
    longDescription: [
      "At Koney's Veterinary Hospital, we understand that the decision to have your pet undergo surgery is a significant one. Our surgical team is committed to providing the highest standard of care before, during, and after your pet's procedure.",
      "Our modern surgical suite is equipped with advanced monitoring equipment to ensure your pet's safety throughout the procedure. We use the latest surgical techniques and comprehensive pain management protocols to minimize discomfort and promote rapid healing.",
      "From routine procedures like spay/neuter surgeries to more complex operations, our experienced veterinary surgeons are dedicated to achieving the best possible outcomes for your pet."
    ],
    benefits: [
      'State-of-the-art surgical facilities',
      'Experienced veterinary surgeons',
      'Comprehensive pre-surgical assessment',
      'Advanced anesthesia monitoring',
      'Effective pain management',
      'Detailed post-operative care instructions'
    ],
    process: [
      {
        title: 'Pre-Surgical Consultation',
        description: "Before any procedure, we'll discuss your pet's condition, explain the recommended surgery, and answer any questions you may have."
      },
      {
        title: 'Pre-Anesthetic Testing',
        description: 'We recommend blood tests before anesthesia to check organ function and detect any underlying issues that might affect surgery.'
      },
      {
        title: 'Surgery Day',
        description: "On the day of surgery, your pet will be prepared for the procedure with appropriate sedation and anesthesia. Throughout the surgery, a dedicated team will monitor your pet's vital signs."
      },
      {
        title: 'Post-Operative Care',
        description: "After surgery, we'll monitor your pet's recovery and provide pain medication as needed. We'll give you detailed instructions for at-home care and schedule follow-up appointments as necessary."
      }
    ],
    pricingDetails: [
      { name: 'Spay/Neuter (Dog)', price: 400 },
      { name: 'Spay/Neuter (Cat)', price: 300 },
      { name: 'Dental Cleaning', price: 500 },
      { name: 'Mass Removal', price: 600 },
      { name: 'Orthopedic Surgery', price: 1200 }
    ],
    faqs: [
      {
        question: 'How should I prepare my pet for surgery?',
        answer: "We typically ask that you withhold food for 8-12 hours before surgery, though water is usually allowed until a few hours before the procedure. We'll provide specific instructions based on your pet's individual needs."
      },
      {
        question: 'How long will my pet need to stay at the hospital?',
        answer: "Most routine procedures are performed on an outpatient basis, meaning your pet can go home the same day. More complex surgeries may require overnight hospitalization for monitoring."
      },
      {
        question: 'What kind of aftercare will my pet need?',
        answer: "Post-operative care varies depending on the procedure. Generally, pets need a quiet, comfortable place to recover, restricted activity, medication as prescribed, and monitoring of the surgical site. We'll provide detailed instructions specific to your pet's surgery."
      }
    ]
  },
  {
    id: 'grooming',
    title: 'Pet Grooming',
    description: 'Our professional grooming services keep your pets clean, comfortable and healthy. Services include bathing, haircuts, nail trimming, ear cleaning, and more. Our groomers are experienced with all breeds and coat types.',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵100 depending on size and breed',
    longDescription: [
      'Professional grooming is an essential part of pet care that goes beyond just keeping your pet looking good. Regular grooming helps maintain healthy skin and coat, prevents matting, reduces shedding, and allows for early detection of skin issues, lumps, or parasites.',
      "At Koney's Veterinary Hospital, our professional groomers are trained to handle pets of all sizes, breeds, and temperaments. We use high-quality, pet-safe products and techniques to ensure your pet's comfort and safety throughout the grooming process.",
      "Our comprehensive grooming services are tailored to meet your pet's specific needs, whether they require a simple bath and brush or a complete grooming package."
    ],
    benefits: [
      'Improved coat and skin health',
      'Reduced shedding',
      'Prevention of matting and tangling',
      'Early detection of skin issues or parasites',
      'Nail maintenance for proper posture and movement',
      'Clean ears to prevent infections',
      'Professional handling by experienced groomers'
    ],
    process: [
      {
        title: "Initial Assessment",
        description: "Our groomers will assess your pet's coat condition, skin health, and any specific needs or concerns."
      },
      {
        title: "Bathing",
        description: "Using high-quality, pet-safe shampoos and conditioners appropriate for your pet's skin and coat type."
      },
      {
        title: 'Drying and Brushing',
        description: "Thorough drying and brushing to remove loose fur and prevent matting."
      },
      {
        title: 'Haircut/Styling',
        description: "Professional haircut according to breed standards or your preferences."
      },
      {
        title: 'Finishing Touches',
        description: "Nail trimming, ear cleaning, teeth brushing (if requested), and final styling."
      }
    ],
    pricingDetails: [
      { name: 'Bath & Brush (Small Dog)', price: 100 },
      { name: 'Bath & Brush (Medium Dog)', price: 150 },
      { name: 'Bath & Brush (Large Dog)', price: 200 },
      { name: 'Full Groom (Small Dog)', price: 180 },
      { name: 'Full Groom (Medium Dog)', price: 250 },
      { name: 'Full Groom (Large Dog)', price: 350 },
      { name: 'Cat Grooming', price: 200 },
      { name: 'Nail Trim Only', price: 50 }
    ],
    faqs: [
      {
        question: 'How often should my pet be groomed?',
        answer: "Grooming frequency depends on your pet's breed, coat type, and lifestyle. Generally, dogs with longer coats may need grooming every 4-6 weeks, while shorter-coated breeds might go 8-12 weeks between grooming sessions. Regular brushing at home between professional grooming appointments is recommended for all pets."
      },
      {
        question: 'My pet is nervous about grooming. Can you still help?',
        answer: 'Yes, our groomers are experienced in handling nervous or anxious pets. We use gentle handling techniques and take the time needed to make your pet comfortable. For extremely anxious pets, we may recommend shorter, more frequent sessions to help them become accustomed to the grooming process.'
      },
      {
        question: 'Do you offer specialized grooming for specific breeds?',
        answer: 'Yes, our groomers are trained in breed-specific cuts and styling techniques. Whether you have a Poodle, Shih Tzu, Persian cat, or any other breed with specific grooming requirements, we can provide the appropriate care and styling.'
      }
    ]
  },
  {
    id: 'boarding',
    title: 'Boarding Services',
    description: 'When you need to travel, our boarding facility provides a safe, clean, and comfortable environment for your pets. We offer spacious enclosures, regular exercise, and the peace of mind that comes with veterinary supervision during your pet\'s stay.',
    icon: Dog,
    image: 'https://images.unsplash.com/photo-1541599713278-93b636ae8218?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵80 per night',
    longDescription: [
      "Finding reliable care for your pet while you're away can be challenging. At Koney's Veterinary Hospital, our boarding services provide a safe, comfortable, and supervised environment where your pet can stay while you're traveling.",
      'Unlike standard kennels, our boarding facility offers the added benefit of veterinary oversight. If your pet has any health concerns during their stay, our veterinary team is readily available to provide prompt medical attention.',
      'We understand that each pet has unique needs and preferences. Our staff takes the time to get to know your pet and provide personalized care to ensure they feel comfortable and secure throughout their stay.'
    ],
    benefits: [
      "Veterinary supervision throughout your pet's stay",
      'Clean, comfortable, and climate-controlled accommodations',
      'Regular exercise and playtime',
      'Administration of medications if needed',
      "Adherence to your pet's regular feeding schedule",
      "Daily monitoring of your pet's health and wellbeing",
      'Peace of mind knowing your pet is in professional hands'
    ],
    process: [
      {
        title: 'Pre-Boarding Consultation',
        description: "We'll discuss your pet's routine, preferences, dietary needs, and any special requirements."
      },
      {
        title: 'Check-In',
        description: "On arrival, we'll review your pet's information, collect any food or medications, and show you the boarding facilities."
      },
      {
        title: 'Daily Care',
        description: "During their stay, your pet will receive regular meals, exercise, playtime, and any necessary medications."
      },
      {
        title: 'Check-Out',
        description: "When you pick up your pet, we'll provide a report on how they did during their stay and return any unused food or medications."
      }
    ],
    pricingDetails: [
      { name: 'Small Dog Boarding (per night)', price: 80 },
      { name: 'Medium Dog Boarding (per night)', price: 100 },
      { name: 'Large Dog Boarding (per night)', price: 120 },
      { name: 'Cat Boarding (per night)', price: 70 },
      { name: 'Medication Administration', price: 15 },
      { name: 'Special Diet Preparation', price: 10 },
      { name: 'Extra Playtime (30 minutes)', price: 25 }
    ],
    faqs: [
      {
        question: "What should I bring for my pet's boarding stay?",
        answer: "We recommend bringing your pet's regular food, any medications they need, a favorite toy or blanket with familiar scents, and detailed instructions about their routine. Please ensure all items are clearly labeled with your name and pet's name."
      },
      {
        question: 'Are boarding pets kept separate from sick animals?',
        answer: 'Yes, our boarding facility is separate from our hospital wards. Boarding pets are housed in a dedicated area away from sick patients to prevent any potential transmission of illness.'
      },
      {
        question: "Can I check on my pet while I'm away?",
        answer: "Absolutely! You're welcome to call during business hours for updates on your pet. For longer stays, we can also send you photos or updates via email or WhatsApp upon request."
      }
    ]
  },
  {
    id: 'consultation',
    title: 'Consultations',
    description: 'Our comprehensive consultation services address all aspects of pet health, from nutrition and behavior to managing chronic conditions and senior pet care. Our veterinarians take the time to listen to your concerns and develop customized care plans.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵120 per session',
    longDescription: [
      "A thorough veterinary consultation is the foundation of quality pet healthcare. At Koney's Veterinary Hospital, our consultation services go beyond addressing immediate health concerns to provide comprehensive care that supports your pet's overall wellbeing.",
      "During a consultation, our veterinarians take the time to listen to your concerns, review your pet's medical history, and conduct a thorough physical examination. Based on our findings, we develop customized care plans tailored to your pet's specific needs.",
      "Whether you're seeking advice on nutrition, behavior, preventative care, or management of chronic conditions, our consultation services provide the guidance and support you need to make informed decisions about your pet's health."
    ],
    benefits: [
      "Comprehensive assessment of your pet's health",
      'Personalized care recommendations',
      'Expert advice on nutrition and behavior',
      'Management strategies for chronic conditions',
      'Preventative care planning',
      'Opportunity to ask questions and discuss concerns'
    ],
    process: [
      {
        title: 'Medical History Review',
        description: "We'll review your pet's medical history and discuss any changes in health, behavior, appetite, or activity level."
      },
      {
        title: 'Physical Examination',
        description: "Our veterinarians will conduct a thorough physical examination to assess your pet's current health status."
      },
      {
        title: 'Discussion of Findings',
        description: "We'll discuss our findings with you, addressing any concerns and answering your questions."
      },
      {
        title: 'Care Plan Development',
        description: "Based on our assessment, we'll develop a customized care plan for your pet, which may include diagnostic tests, treatments, or lifestyle recommendations."
      }
    ],
    pricingDetails: [
      { name: 'General Consultation', price: 120 },
      { name: 'Specialized Consultation', price: 180 },
      { name: 'Follow-Up Consultation', price: 80 },
      { name: 'Nutritional Consultation', price: 150 },
      { name: 'Behavioral Consultation', price: 200 },
      { name: 'Senior Pet Consultation', price: 150 }
    ],
    faqs: [
      {
        question: "How should I prepare for my pet's consultation?",
        answer: "Before your appointment, make note of any specific concerns, changes in your pet's behavior or health, and questions you'd like to ask. If your pet is new to our practice, bring any available medical records. For sick pets, a fresh stool or urine sample may be helpful if applicable to their symptoms."
      },
      {
        question: "How long does a typical consultation take?",
        answer: "A standard consultation usually takes 30-45 minutes, depending on the complexity of your pet's health issues and the number of concerns to be addressed. Specialized consultations may take longer."
      },
      {
        question: "What if my pet needs additional tests or treatments?",
        answer: "If our veterinarians recommend additional diagnostic tests or treatments, we'll discuss the reasons, expected benefits, and costs with you before proceeding. Some tests may be performed during your visit, while others might require scheduling a follow-up appointment."
      }
    ]
  }
];
