import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, User, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Décrivez votre besoin',
    description: 'Décrivez l\'objet à réparer et votre localisation. Recevez des devis personnalisés de réparateurs qualifiés.'
  },
  {
    icon: User,
    title: 'Choisissez votre réparateur',
    description: 'Comparez les profils, avis clients et tarifs. Contactez directement le professionnel de votre choix.'
  },
  {
    icon: CheckCircle,
    title: 'Faites réparer',
    description: 'Prenez rendez-vous et faites réparer votre objet. Économisez de l\'argent et protégez l\'environnement.'
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600">
            En 3 étapes simples, trouvez le bon réparateur et donnez une seconde vie à vos objets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="text-center border-none shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}