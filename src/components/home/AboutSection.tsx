import * as React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              title="Your Trusted Veterinary Care Partner"
              subtitle="About Koney's Veterinary Hospital"
            />

            <div className="space-y-4">
              <p className="text-gray-700">
                Founded in 2010, Koney's Veterinary Hospital has been providing
                exceptional veterinary services to pets and their owners in
                Accra, Ghana. Our team of experienced veterinarians and staff
                are dedicated to ensuring the health and well-being of your
                beloved companions.
              </p>

              <p className="text-gray-700">
                We combine modern veterinary practices with compassionate care,
                creating a warm and welcoming environment where both pets and
                their owners can feel comfortable and cared for.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-vet-blue text-4xl font-bold">12+</h4>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
                <div>
                  <h4 className="text-vet-blue text-4xl font-bold">5000+</h4>
                  <p className="text-gray-600">Pets Treated</p>
                </div>
                <div>
                  <h4 className="text-vet-blue text-4xl font-bold">8</h4>
                  <p className="text-gray-600">Veterinary Experts</p>
                </div>
                <div>
                  <h4 className="text-vet-blue text-4xl font-bold">24/7</h4>
                  <p className="text-gray-600">Emergency Service</p>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about">
                  <Button className="bg-vet-blue hover:bg-vet-teal mt-2">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1747825784/_MG_2419_wasgbi.jpg"
                alt="Veterinarian with a dog"
                className="rounded-lg shadow-lg w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden md:block">
                <p className="text-vet-dark font-medium">
                  "We believe that every pet deserves the highest quality of
                  care, delivered with compassion and expertise."
                </p>
                <p className="mt-2 text-vet-blue font-semibold">
                  Dr. Koney, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
