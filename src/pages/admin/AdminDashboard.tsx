import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Badge} from '@/components/ui/badge'
import {Users, FileText, Settings, BarChart3, Shield, Eye, EyeOff, LogOut, Save, UserCheck, UserX, AlertTriangle, TrendingUp} from 'lucide-react'
import {motion} from 'framer-motion'
import {Logo} from '@/components/ui/logo'
import {useUser} from '@/contexts/UserContext'

const mockRequests = [
 {id: 1, title: 'Réparation iPhone 13', user: 'Marie L.', status: 'active', responses: 8, category: 'Téléphones'},
 {id: 2, title: 'Machine à laver', user: 'Jean M.', status: 'completed', responses: 12, category: 'Électroménager'},
 {id: 3, title: 'Diagnostic auto', user: 'Sophie R.', status: 'active', responses: 15, category: 'Automobiles'},
 {id: 4, title: 'Ordinateur portable', user: 'Thomas B.', status: 'reported', responses: 6, category: 'Ordinateurs'}
]

export function AdminDashboard() {
 const navigate = useNavigate()
 const {users} = useUser()
 const [currentPassword, setCurrentPassword] = useState('')
 const [newPassword, setNewPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [showPasswords, setShowPasswords] = useState(false)
 const [activeTab, setActiveTab] = useState('overview')

 useEffect(() => {
  // Vérifier l'authentification
  const isAuthenticated = localStorage.getItem('adminAuthenticated')
  if (!isAuthenticated) {
   navigate('/admin')
  }
 }, [navigate])

 const handleLogout = () => {
  localStorage.removeItem('adminAuthenticated')
  navigate('/admin')
 }

 const handlePasswordChange = () => {
  if (newPassword !== confirmPassword) {
   alert('Les mots de passe ne correspondent pas')
   return
  }
  if (newPassword.length < 8) {
   alert('Le mot de passe doit contenir au moins 8 caractères')
   return
  }
  // Ici on sauvegarderait le nouveau mot de passe
  alert('Mot de passe modifié avec succès')
  setCurrentPassword('')
  setNewPassword('')
  setConfirmPassword('')
 }

 const getStatusBadge = (status: string) => {
  switch (status) {
   case 'verified':
    return <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
   case 'pending':
    return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
   case 'suspended':
    return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>
   case 'active':
    return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
   case 'completed':
    return <Badge className="bg-green-100 text-green-800">Terminée</Badge>
   case 'reported':
    return <Badge className="bg-red-100 text-red-800">Signalée</Badge>
   default:
    return <Badge variant="outline">{status}</Badge>
  }
 }

 // Calculer les statistiques depuis les données réelles
 const totalUsers = users.length
 const totalProfessionals = users.filter(user => user.userType === 'professional').length
 const totalClients = users.filter(user => user.userType === 'client').length
 const verifiedProfessionals = users.filter(user => user.userType === 'professional' && user.isVerified).length

 return (
  <div className="min-h-screen bg-gray-50">
   {/* Header Admin */}
   <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
     <div className="flex items-center space-x-4">
      <Logo size="md" animated={true} />
      <div className="border-l border-gray-300 pl-4">
       <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
       <p className="text-gray-600">Tableau de bord</p>
      </div>
     </div>
     <Button onClick={handleLogout} variant="outline" className="flex items-center">
      <LogOut className="h-4 w-4 mr-2" />
      Déconnexion
     </Button>
    </div>
   </div>

   <div className="p-6">
    <Tabs value={activeTab} onValueChange={setActiveTab}>
     <TabsList className="grid w-full grid-cols-4 mb-8">
      <TabsTrigger value="overview" className="flex items-center">
       <BarChart3 className="h-4 w-4 mr-2" />
       Vue d'ensemble
      </TabsTrigger>
      <TabsTrigger value="professionals" className="flex items-center">
       <Users className="h-4 w-4 mr-2" />
       Utilisateurs
      </TabsTrigger>
      <TabsTrigger value="requests" className="flex items-center">
       <FileText className="h-4 w-4 mr-2" />
       Demandes
      </TabsTrigger>
      <TabsTrigger value="settings" className="flex items-center">
       <Settings className="h-4 w-4 mr-2" />
       Paramètres
      </TabsTrigger>
     </TabsList>

     <TabsContent value="overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}>
        <Card>
         <CardContent className="p-6">
          <div className="flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-600">Utilisateurs totaux</p>
            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
           </div>
           <Users className="h-8 w-8 text-blue-600" />
          </div>
         </CardContent>
        </Card>
       </motion.div>

       <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
        <Card>
         <CardContent className="p-6">
          <div className="flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-600">Professionnels</p>
            <p className="text-3xl font-bold text-gray-900">{totalProfessionals}</p>
           </div>
           <UserCheck className="h-8 w-8 text-green-600" />
          </div>
         </CardContent>
        </Card>
       </motion.div>

       <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}}>
        <Card>
         <CardContent className="p-6">
          <div className="flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-600">Clients</p>
            <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
           </div>
           <Users className="h-8 w-8 text-purple-600" />
          </div>
         </CardContent>
        </Card>
       </motion.div>

       <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}>
        <Card>
         <CardContent className="p-6">
          <div className="flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-600">Pros vérifiés</p>
            <p className="text-3xl font-bold text-gray-900">{verifiedProfessionals}</p>
           </div>
           <Shield className="h-8 w-8 text-green-600" />
          </div>
         </CardContent>
        </Card>
       </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card>
        <CardHeader>
         <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
         <div className="space-y-4">
          {users.slice(-3).map((user, index) => (
           <div key={user.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
             {user.profilePhoto && (
              <img src={user.profilePhoto} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
             )}
             <span className="text-sm">
              {user.userType === 'professional' ? 'Nouveau professionnel' : 'Nouveau client'} : {user.firstName} {user.lastName}
             </span>
            </div>
            <span className="text-xs text-gray-500">{user.joinedDate}</span>
           </div>
          ))}
         </div>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
         <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
         <div className="space-y-4">
          <div className="flex items-center justify-between">
           <span className="text-sm text-gray-600">Taux de professionnels</span>
           <div className="flex items-center text-blue-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            {totalUsers > 0 ? Math.round((totalProfessionals / totalUsers) * 100) : 0}%
           </div>
          </div>
          <div className="flex items-center justify-between">
           <span className="text-sm text-gray-600">Taux de vérification</span>
           <span className="font-semibold text-green-600">
            {totalProfessionals > 0 ? Math.round((verifiedProfessionals / totalProfessionals) * 100) : 0}%
           </span>
          </div>
          <div className="flex items-center justify-between">
           <span className="text-sm text-gray-600">Croissance mensuelle</span>
           <span className="font-semibold text-green-600">+12.5%</span>
          </div>
         </div>
        </CardContent>
       </Card>
      </div>
     </TabsContent>

     <TabsContent value="professionals">
      <Card>
       <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
       </CardHeader>
       <CardContent>
        <div className="space-y-4">
         {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
           <div className="flex items-center space-x-4">
            {user.profilePhoto && (
             <img src={user.profilePhoto} alt={user.firstName} className="w-12 h-12 rounded-full object-cover" />
            )}
            <div className="flex-1">
             <h4 className="font-semibold">{user.firstName} {user.lastName}</h4>
             <p className="text-sm text-gray-600">{user.email}</p>
             <p className="text-xs text-gray-500">
              {user.userType === 'professional' ? user.businessName : 'Client'} • {user.address.city} ({user.address.postalCode})
             </p>
             {user.userType === 'professional' && user.categories && (
              <div className="flex flex-wrap gap-1 mt-1">
               {user.categories.slice(0, 2).map((category, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{category}</Badge>
               ))}
               {user.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">+{user.categories.length - 2}</Badge>
               )}
              </div>
             )}
            </div>
           </div>
           <div className="flex items-center space-x-3">
            <Badge className={user.userType === 'professional' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
             {user.userType === 'professional' ? 'Professionnel' : 'Client'}
            </Badge>
            {getStatusBadge(user.isVerified ? 'verified' : 'pending')}
            <div className="flex space-x-2">
             <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
             </Button>
            </div>
           </div>
          </div>
         ))}
        </div>
       </CardContent>
      </Card>
     </TabsContent>

     <TabsContent value="requests">
      <Card>
       <CardHeader>
        <CardTitle>Gestion des demandes</CardTitle>
       </CardHeader>
       <CardContent>
        <div className="space-y-4">
         {mockRequests.map(request => (
          <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
           <div className="flex-1">
            <h4 className="font-semibold">{request.title}</h4>
            <p className="text-sm text-gray-600">
             Par {request.user} • {request.category}
            </p>
            <p className="text-xs text-gray-500">{request.responses} réponses reçues</p>
           </div>
           <div className="flex items-center space-x-3">
            {getStatusBadge(request.status)}
            <Button size="sm" variant="outline">
             <Eye className="h-4 w-4" />
            </Button>
           </div>
          </div>
         ))}
        </div>
       </CardContent>
      </Card>
     </TabsContent>

     <TabsContent value="settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card>
        <CardHeader>
         <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Sécurité
         </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
         <div>
          <Label htmlFor="currentPassword" className="text-sm font-semibold">
           Mot de passe actuel
          </Label>
          <div className="relative mt-2">
           <Input id="currentPassword" type={showPasswords ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="pr-10" />
           <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
           </button>
          </div>
         </div>

         <div>
          <Label htmlFor="newPassword" className="text-sm font-semibold">
           Nouveau mot de passe
          </Label>
          <Input id="newPassword" type={showPasswords ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-2" />
         </div>

         <div>
          <Label htmlFor="confirmPassword" className="text-sm font-semibold">
           Confirmer le nouveau mot de passe
          </Label>
          <Input id="confirmPassword" type={showPasswords ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-2" />
         </div>

         <Button onClick={handlePasswordChange} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Modifier le mot de passe
         </Button>
        </CardContent>
       </Card>

       <Card>
        <CardHeader>
         <CardTitle>Configuration générale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
         <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Notifications email</span>
          <Button size="sm" variant="outline">
           Activées
          </Button>
         </div>
         <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Mode maintenance</span>
          <Button size="sm" variant="outline">
           Désactivé
          </Button>
         </div>
         <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Sauvegarde automatique</span>
          <Button size="sm" variant="outline">
           Quotidienne
          </Button>
         </div>
        </CardContent>
       </Card>
      </div>
     </TabsContent>
    </Tabs>
   </div>
  </div>
 )
}