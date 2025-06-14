import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  Award,
  Euro,
  Calendar,
  Image as ImageIcon,
  Send
} from 'lucide-react';

const mockProfessional = {
  id: 1,
  name: 'TechRepar Pro',
  owner: 'Marc Dubois',
  category: 'Téléphones & Tablettes',
  location: 'Paris 11ème (75011)',
  distance: '1.2 km',
  rating: 4.8,
  reviewCount: 156,
  verified: true,
  responseTime: '< 2h',
  joinedDate: 'Avril 2020',
  completedJobs: 1247,
  description: 'Technicien spécialisé dans la réparation de smartphones et tablettes avec plus de 8 ans d\'expérience. Atelier équipé des derniers outils professionnels. Garantie 6 mois sur toutes les réparations.',
  services: [
    { name: 'Réparation écran', price: 'À partir de 45€', duration: '30 min' },
    { name: 'Changement batterie', price: 'À partir de 35€', duration: '20 min' },
    { name: 'Réparation caméra', price: 'À partir de 55€', duration: '45 min' },
    { name: 'Réparation haut-parleur', price: 'À partir de 40€', duration: '30 min' },
    { name: 'Déblocage réseau', price: 'À partir de 25€', duration: '15 min' }
  ],
  specialties: ['iPhone', 'Samsung', 'Huawei', 'Xiaomi', 'OnePlus'],
  certifications: ['Certification Apple', 'Certification Samsung', 'Technicien agréé'],
  workingHours: {
    'Lundi': '9h00 - 18h00',
    'Mardi': '9h00 - 18h00',
    'Mercredi': '9h00 - 18h00',
    'Jeudi': '9h00 - 18h00',
    'Vendredi': '9h00 - 18h00',
    'Samedi': '10h00 - 16h00',
    'Dimanche': 'Fermé'
  },
  photos: [
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=300&fit=crop'
  ],
  reviews: [
    {
      id: 1,
      author: 'Julie M.',
      rating: 5,
      date: '2024-01-15',
      text: 'Excellent service ! Mon iPhone a été réparé en 30 minutes, comme promis. Prix très correct et garantie de 6 mois.',
      repair: 'Écran iPhone 12'
    },
    {
      id: 2,
      author: 'Thomas L.',
      rating: 5,
      date: '2024-01-10',
      text: 'Très professionnel, explique bien le problème et la solution. Je recommande vivement !',
      repair: 'Batterie Samsung Galaxy'
    },
    {
      id: 3,
      author: 'Marie P.',
      rating: 4,
      date: '2024-01-05',
      text: 'Bon travail, délai respecté. Seul bémol : un peu difficile à trouver l\'atelier.',
      repair: 'Caméra iPhone 11'
    }
  ]
};

export function ProfessionalProfile() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleContact = () => {
    // Simulate sending message
    alert('Message envoyé ! Le professionnel vous répondra rapidement.');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex gap-6">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=150&h=150&fit=crop&crop=face"
                alt={mockProfessional.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mockProfessional.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">{mockProfessional.owner}</p>
                    <p className="text-gray-500">{mockProfessional.category}</p>
                  </div>
                  <div className="flex gap-2">
                    {mockProfessional.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <Shield className="h-4 w-4 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                    <Badge variant="outline">
                      <Award className="h-4 w-4 mr-1" />
                      Pro
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-semibold">{mockProfessional.rating}</span>
                    <span className="text-gray-500 ml-1">({mockProfessional.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {mockProfessional.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    Répond {mockProfessional.responseTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    {mockProfessional.completedJobs} réparations
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {mockProfessional.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Avis ({mockProfessional.reviewCount})</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spécialités</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {mockProfessional.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mockProfessional.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-green-600 mr-2" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Horaires d'ouverture</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(mockProfessional.workingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="font-medium">{day}</span>
                            <span className="text-gray-600">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Services proposés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProfessional.services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-gray-600">Durée : {service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">{service.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {mockProfessional.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-gray-500">{review.repair}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="photos" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Photos de l'atelier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockProfessional.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Photo atelier ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contacter {mockProfessional.owner}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Décrivez votre problème..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleContact} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Membre depuis</span>
                    <span className="font-semibold">{mockProfessional.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Réparations effectuées</span>
                    <span className="font-semibold">{mockProfessional.completedJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Note moyenne</span>
                    <span className="font-semibold">{mockProfessional.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de réponse</span>
                    <span className="font-semibold">{mockProfessional.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}