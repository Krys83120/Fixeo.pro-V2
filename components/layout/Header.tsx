import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {Menu, X, User, ChevronDown} from 'lucide-react'
import {Logo} from '@/components/ui/logo'
import {useUser} from '@/contexts/UserContext'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'

export function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const {currentUser, logoutUser} = useUser()
 const location = useLocation()

 const handleLogout = () => {
  logoutUser()
  setIsMenuOpen(false)
 }

 const handleLogin = () => {
  // Simulation login - redirect to login page in production
  alert('Redirection vers la page de connexion...')
  setIsMenuOpen(false)
 }

 return (
  <header className="bg-white border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-white/95">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Logo */}
     <Link to="/" className="flex items-center">
      <Logo size="md" animated={true} />
     </Link>

     {/* Desktop Navigation */}
     <nav className="hidden md:flex items-center space-x-8">
      <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors font-medium">
       Trouver un réparateur
      </Link>
      <Link to="/requests" className="text-muted-foreground hover:text-primary transition-colors font-medium">
       Liste des demandes
      </Link>
      <Link to="/create-request" className="text-muted-foreground hover:text-primary transition-colors font-medium">
       Poster une demande
      </Link>
      <Link to="/join-as-professional" className="text-muted-foreground hover:text-primary transition-colors font-medium">
       Devenir réparateur
      </Link>
     </nav>

     {/* Desktop Actions */}
     <div className="hidden md:flex items-center space-x-4">
      {!currentUser ? (
       <>
        <Button onClick={handleLogin} variant="outline" className="font-medium">
         <User className="h-4 w-4 mr-2" />
         Connexion
        </Button>
        <Link to="/signup">
         <Button className="font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">Inscription</Button>
        </Link>
       </>
      ) : (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <Button variant="ghost" className="flex items-center space-x-2 h-10">
          {currentUser.profilePhoto ? (
           <img src={currentUser.profilePhoto} alt={currentUser.firstName} className="w-8 h-8 rounded-full object-cover" />
          ) : (
           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
           </div>
          )}
          <span className="text-sm font-medium">{currentUser.firstName}</span>
          <ChevronDown className="h-4 w-4" />
         </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
         <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
           <User className="h-4 w-4 mr-2" />
           Mon profil
          </Link>
         </DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem className="text-gray-500 font-normal cursor-default">
          {currentUser.userType === 'professional' ? 'Professionnel' : 'Client'} • {currentUser.email}
         </DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          Déconnexion
         </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
      )}
     </div>

     {/* Mobile menu button */}
     <div className="md:hidden">
      <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
       {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
     </div>
    </div>

    {/* Mobile menu */}
    {isMenuOpen && (
     <div className="md:hidden py-4 border-t border-border">
      <div className="flex flex-col space-y-4">
       <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
        Trouver un réparateur
       </Link>
       <Link to="/requests" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
        Liste des demandes
       </Link>
       <Link to="/create-request" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
        Poster une demande
       </Link>
       <Link to="/join-as-professional" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
        Devenir réparateur
       </Link>

       {/* Mobile Auth/Profile Section */}
       <div className="flex flex-col space-y-2 pt-4 border-t border-border">
        {!currentUser ? (
         <>
          <Button onClick={handleLogin} variant="outline" className="w-full font-medium">
           <User className="h-4 w-4 mr-2" />
           Connexion
          </Button>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
           <Button className="w-full font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">Inscription</Button>
          </Link>
         </>
        ) : (
         <div className="text-center py-2">
          <div className="flex items-center justify-center mb-3">
           {currentUser.profilePhoto ? (
            <img src={currentUser.profilePhoto} alt={currentUser.firstName} className="w-10 h-10 rounded-full object-cover mr-3" />
           ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
             <User className="h-5 w-5 text-blue-600" />
            </div>
           )}
           <div className="text-left">
            <p className="font-medium text-gray-900">
             {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-sm text-gray-500">{currentUser.userType === 'professional' ? 'Professionnel' : 'Client'}</p>
           </div>
          </div>
          <div className="space-y-2">
           <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" size="sm" className="w-full">
             <User className="h-4 w-4 mr-2" />
             Mon profil
            </Button>
           </Link>
           <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
            Déconnexion
           </Button>
          </div>
         </div>
        )}
       </div>
      </div>
     </div>
    )}
   </div>
  </header>
 )
}