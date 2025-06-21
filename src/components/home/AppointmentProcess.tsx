import { motion } from "framer-motion";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import {
  Calendar,
  ClipboardCheck,
  Stethoscope,
  CheckCircle,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    title: "Call Us",
    description:
      "Call our reception desk at 053 373 4385 to schedule an appointment.",
  },
  {
    icon: ClipboardCheck,
    title: "Fill Medical Form",
    description: "Complete a brief medical history form for your pet.",
  },
  {
    icon: Stethoscope,
    title: "Veterinary Consultation",
    description: "Meet with our veterinarians for examination and diagnosis.",
  },
  {
    icon: CheckCircle,
    title: "Get Treatment Plan",
    description: "Receive a customized treatment plan for your pet.",
  },
];

const AppointmentProcess = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <AnimatedElement variant="fadeIn">
            <div className="mb-4 flex justify-center">
              <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
              How to Get <span className="text-vet-teal">Veterinary Care</span>{" "}
              For Your Pet
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've made our appointment process simple and straightforward so
              you can get the care your pet needs without any hassle.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <AnimatedElement key={index} variant="fadeIn" delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md transition-custom border border-gray-100 h-full relative"
              >
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-vet-coral rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-vet-teal/10 p-4 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-vet-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-vet-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        <div className="flex justify-center">
          <AnimatedElement variant="slideUp" delay={0.5}>
            <Link to="tel:+233533734385">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-vet-coral hover:bg-vet-coral/90 text-white rounded-full px-8 py-6 text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call Us Now
                </Button>
              </motion.div>
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default AppointmentProcess;
