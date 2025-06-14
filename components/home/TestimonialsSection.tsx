import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marie L.',
    location: 'Paris',
    text: 'Mon iPhone avait l\'écran cassé. J\'ai trouvé un réparateur en 5 minutes, réparé en 30 minutes pour 3 fois moins cher qu\'Apple !',
    rating: 5,
    repair: 'Écran iPhone'
  },
  {
    name: 'Jean-Pierre M.',
    location: 'Lyon',
    text: 'Machine à laver en panne depuis 2 semaines. Le réparateur est venu le jour même, problème résolu pour 80€ au lieu de racheter !',
    rating: 5,
    repair: 'Électroménager'
  },
  {
    name: 'Sophie R.',
    location: 'Marseille',
    text: 'Service génial ! Mon sac préféré avait une fermeture cassée. La couturière l\'a rendu comme neuf en 2 jours.',
    rating: 5,
    repair: 'Maroquinerie'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ils ont choisi de réparer
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les témoignages de nos utilisateurs satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.location} • {testimonial.repair}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}