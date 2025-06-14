import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Shield, Eye, EyeOff} from 'lucide-react'
import {motion} from 'framer-motion'
import {Logo} from '@/components/ui/logo'

export function AdminLogin() {
 const navigate = useNavigate()
 const [password, setPassword] = useState('')
 const [showPassword, setShowPassword] = useState(false)
 const [error, setError] = useState('')
 const [isLoading, setIsLoading] = useState(false)

 // Mot de passe par défaut (en production, ceci devrait être sécurisé)
 const ADMIN_PASSWORD = 'fixeopro2024'

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  // Simulation d'authentification
  setTimeout(() => {
   if (password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuthenticated', 'true')
    navigate('/admin/dashboard')
   } else {
    setError('Mot de passe incorrect')
   }
   setIsLoading(false)
  }, 1000)
 }

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
   <motion.div 
    className="w-full max-w-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
   >
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
     <CardHeader className="text-center pb-8">
      <div className="flex justify-center mb-6">
       <Logo size="lg" animated={true} />
      </div>
      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
       <Shield className="h-6 w-6 mr-3 text-blue-600" />
       Administration
      </CardTitle>
      <p className="text-gray-600 mt-2">Accès réservé aux administrateurs</p>
     </CardHeader>
     
     <CardContent className="space-y-6">
      <form onSubmit={handleLogin} className="space-y-6">
       <div>
        <Label htmlFor="password" className="text-base font-semibold">
         Mot de passe administrateur
        </Label>
        <div className="relative mt-2">
         <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 pr-12"
          placeholder="Entrez le mot de passe"
          required
         />
         <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
         >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
         </button>
        </div>
        {error && (
         <motion.p 
          className="text-red-600 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
         >
          {error}
         </motion.p>
        )}
       </div>

       <Button 
        type="submit" 
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold"
        disabled={isLoading}
       >
        {isLoading ? (
         <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Connexion...
         </div>
        ) : (
         'Se connecter'
        )}
       </Button>
      </form>

      <div className="text-center pt-4 border-t">
       <p className="text-sm text-gray-500">
        Mot de passe oublié ? Contactez le support technique
       </p>
      </div>
     </CardContent>
    </Card>
   </motion.div>
  </div>
 )
}