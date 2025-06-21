import { motion } from "framer-motion";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { AlertCircle, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmergencyServices = () => {
  return (
    <section className="py-16 bg-vet-coral/10">
      <div className="container-custom">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 bg-vet-coral p-8 text-white flex items-center">
              <AnimatedElement variant="slideRight">
                <div className="space-y-6">
                  <div className="bg-white/20 p-4 rounded-full w-fit">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">
                    Emergency Cases
                  </h3>
                  <p className="opacity-90">
                    Please feel free to contact our friendly reception staff
                    with any general or medical enquiry.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <a
                      href="tel:+233533734385"
                      className="text-xl font-bold hover:underline"
                    >
                      053 373 4385
                    </a>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            <div className="lg:col-span-8 p-8 lg:p-12">
              <AnimatedElement variant="slideUp">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-vet-dark mb-6">
                  Common Pet Emergencies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Difficulty breathing
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Severe bleeding or trauma
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Ingestion of toxic substances
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Seizures or collapse
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Severe vomiting or diarrhea
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Inability to urinate
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">Eye injuries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-vet-coral rounded-full"></span>
                      <span className="text-gray-700">
                        Difficult labor (dystocia)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-start">
                  <Link to="/services#emergency">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-vet-blue hover:bg-vet-teal rounded-full px-6 flex items-center gap-2">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices;
