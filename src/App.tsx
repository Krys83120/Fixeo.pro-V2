import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Header} from '@/components/layout/Header'
import {Homepage} from '@/pages/Homepage'
import {SearchResults} from '@/pages/SearchResults'
import {ProfessionalProfile} from '@/pages/ProfessionalProfile'
import {CreateRequest} from '@/pages/CreateRequest'
import {ProfessionalSignup} from '@/pages/ProfessionalSignup'
import {RequestsList} from '@/pages/RequestsList'
import {RequestDetail} from '@/pages/RequestDetail'
import {AdminDashboard} from '@/pages/admin/AdminDashboard'
import {AdminLogin} from '@/pages/admin/AdminLogin'
import {Signup} from '@/pages/Signup'
import {UserProfile} from '@/pages/UserProfile'
import {UserProvider} from '@/contexts/UserContext'
import {useEffect} from 'react'

export default function App() {
 useEffect(() => {
  // Empêcher la traduction automatique de Google Translate
  document.documentElement.setAttribute('translate', 'no')
  document.documentElement.setAttribute('class', 'notranslate')

  // Ajouter les meta tags pour désactiver la traduction
  const metaTranslate = document.createElement('meta')
  metaTranslate.name = 'google'
  metaTranslate.content = 'notranslate'
  document.head.appendChild(metaTranslate)

  const metaTranslateClass = document.createElement('meta')
  metaTranslateClass.name = 'google-translate-customization'
  metaTranslateClass.content = "(function() {return {'language': {'tab': {'sl': 'auto', 'tl': 'fr', 'id': 'translate_v'}}};})()"
  document.head.appendChild(metaTranslateClass)
 }, [])

 return (
  <UserProvider>
   <Router>
    <div className="min-h-screen bg-background">
     <Header />
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/professional/:id" element={<ProfessionalProfile />} />
      <Route path="/create-request" element={<CreateRequest />} />
      <Route path="/join-as-professional" element={<ProfessionalSignup />} />
      <Route path="/requests" element={<RequestsList />} />
      <Route path="/request/:id" element={<RequestDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
     </Routes>
    </div>
   </Router>
  </UserProvider>
 )
}