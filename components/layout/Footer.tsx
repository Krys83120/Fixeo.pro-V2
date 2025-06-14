import {Link} from 'react-router-dom'
import {Mail, Phone, MapPin} from 'lucide-react'
import {Logo} from '@/components/ui/logo'

export function Footer() {
 return (
  <footer className="bg-gray-900 text-white py-12">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
     {/* Logo & Description */}
     <div className="col-span-1 md:col-span-2">
      <div className="mb-4">
       <Logo size="lg" animated={true} variant="light" />
      </div>
      <p className="text-gray-400 mb-6 max-w-md">La plateforme européenne leader pour trouver des réparateurs de confiance près de chez vous. Professionnel, rapide et local.</p>
      <div className="space-y-3">
       <div className="flex items-center space-x-3 text-gray-400">
        <MapPin className="h-5 w-5 text-blue-400" />
        <span>Les Saquèdes, 83120 Sainte-Maxime, France</span>
       </div>
       <div className="flex items-center space-x-3 text-gray-400">
        <Mail className="h-5 w-5 text-blue-400" />
        <span>contact@fixeo.pro</span>
       </div>
       <div className="flex items-center space-x-3 text-gray-400">
        <Phone className="h-5 w-5 text-blue-400" />
        <span>07 83 49 72 62</span>
       </div>
      </div>
     </div>

     {/* Pour les clients */}
     <div>
      <h3 className="font-semibold mb-4">Pour les clients</h3>
      <ul className="space-y-2 text-gray-400">
       <li>
        <Link to="/search" className="hover:text-white transition-colors">
         Trouver un réparateur
        </Link>
       </li>
       <li>
        <Link to="/create-request" className="hover:text-white transition-colors">
         Poster une demande
        </Link>
       </li>
       <li>
        <Link to="/categories" className="hover:text-white transition-colors">
         Toutes les catégories
        </Link>
       </li>
       <li>
        <Link to="/help" className="hover:text-white transition-colors">
         Aide et support
        </Link>
       </li>
      </ul>
     </div>

     {/* Pour les professionnels */}
     <div>
      <h3 className="font-semibold mb-4">Pour les professionnels</h3>
      <ul className="space-y-2 text-gray-400">
       <li>
        <Link to="/join-as-professional" className="hover:text-white transition-colors">
         Devenir partenaire
        </Link>
       </li>
       <li>
        <Link to="/professional-dashboard" className="hover:text-white transition-colors">
         Tableau de bord pro
        </Link>
       </li>
       <li>
        <Link to="/pricing" className="hover:text-white transition-colors">
         Tarifs
        </Link>
       </li>
       <li>
        <Link to="/resources" className="hover:text-white transition-colors">
         Ressources
        </Link>
       </li>
      </ul>
     </div>
    </div>

    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
     <p className="text-gray-400 text-sm">© 2024 Fixeo.Pro. Tous droits réservés.</p>
     <div className="flex space-x-6 mt-4 md:mt-0">
      <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
       Confidentialité
      </Link>
      <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
       Conditions
      </Link>
      <Link to="/legal" className="text-gray-400 hover:text-white text-sm transition-colors">
       Mentions légales
      </Link>
     </div>
    </div>
   </div>
  </footer>
 )
}