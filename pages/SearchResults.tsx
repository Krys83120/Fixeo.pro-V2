import {useState, useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Badge} from '@/components/ui/badge'
import {Star, Phone, Euro, Clock, MapPin, Loader2, Navigation, MessageCircle} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {useUser} from '@/contexts/UserContext'
import {motion} from 'framer-motion'
import {ContactModal} from '@/components/ui/contact-modal'

const categories = ['Téléphones', 'Ordinateurs', 'Automobiles', 'Électroménager', 'Textiles', 'Horlogerie', 'Audio/Vidéo', 'Imprimantes', 'Appareils photo']

// Données enrichies pour chaque catégorie
const categoryData = {
  'Téléphones': {
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    ],
    tags: ['Écran cassé', 'Batterie défaillante', 'Problème audio', 'Caméra défectueuse', 'Chargement impossible', 'Bouton power', 'Haut-parleur', 'Prise jack'],
    seoText: `
**Réparation de téléphones professionnelle avec Fixeo.Pro**

Votre smartphone est en panne ? Écran fissuré, batterie qui ne tient plus, problème de charge ou dysfonctionnement audio ? Ne vous précipitez pas pour racheter un nouveau téléphone ! Chez Fixeo.Pro, nous vous mettons en relation avec les meilleurs réparateurs de téléphones de votre région, spécialisés dans la réparation de toutes les marques : iPhone, Samsung, Huawei, Xiaomi, OnePlus et bien d'autres.

**Pourquoi choisir la réparation plutôt que le remplacement ?**

La réparation de téléphone représente une alternative économique et écologique au remplacement. En moyenne, réparer un écran cassé coûte 3 à 5 fois moins cher que l'achat d'un nouveau smartphone. De plus, vous participez activement à la réduction des déchets électroniques en donnant une seconde vie à votre appareil. Nos réparateurs professionnels utilisent des pièces de qualité et offrent des garanties allant jusqu'à 12 mois sur leurs interventions.

**Services de réparation mobile proposés**

Nos techniciens spécialisés interviennent sur tous types de pannes : réparation d'écran LCD et OLED, remplacement de batterie, réparation de caméra avant et arrière, dépannage des problèmes de charge (connecteur lightning, USB-C, micro-USB), réparation des haut-parleurs et écouteurs, déblocage réseau et logiciel. Que votre téléphone soit tombé dans l'eau, ait subi un choc ou présente des dysfonctionnements logiciels, nos experts ont la solution.

**Réparateurs certifiés et équipements professionnels**

Tous nos partenaires réparateurs sont rigoureusement sélectionnés et certifiés. Ils disposent d'ateliers équipés des derniers outils professionnels : stations de soudure, microscopes de précision, machines de séparation d'écran, équipements de diagnostic avancés. Cette expertise technique garantit des réparations durables et de qualité, effectuées dans le respect des normes de sécurité.

**Intervention rapide et garantie**

La plupart des réparations courantes (écran, batterie) sont réalisées en moins d'une heure. Pour les pannes plus complexes, nos réparateurs vous proposent un service de prêt d'appareil le temps de l'intervention. Toutes les réparations sont couvertes par une garantie pièces et main-d'œuvre, avec un service après-vente réactif pour votre tranquillité d'esprit.
    `
  },
  'Ordinateurs': {
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    ],
    tags: ['Écran défaillant', 'Récupération données', 'Virus & malwares', 'Upgrade composants', 'Surchauffe', 'Clavier défectueux', 'RAM insuffisante', 'Disque dur'],
    seoText: `
**Dépannage et réparation d'ordinateurs avec Fixeo.Pro**

Votre ordinateur portable ou de bureau rencontre des difficultés ? Écran noir, lenteurs importantes, surchauffe, virus persistants ou panne matérielle ? Fixeo.Pro vous connecte avec des techniciens informatiques expérimentés, spécialisés dans la réparation de PC et Mac. Nos experts interviennent sur toutes les marques : Dell, HP, Lenovo, Asus, Acer, Apple MacBook, et proposent des solutions adaptées à vos besoins professionnels et personnels.

**Diagnostic complet et précis**

Nos techniciens débutent systématiquement par un diagnostic approfondi de votre ordinateur. Grâce à des outils de diagnostic avancés, ils identifient rapidement l'origine des dysfonctionnements : problème matériel (carte mère, RAM, disque dur, alimentation) ou logiciel (virus, corruption système, pilotes défaillants). Ce diagnostic précis permet d'orienter la réparation vers la solution la plus efficace et économique.

**Réparations matérielles spécialisées**

Nos réparateurs maîtrisent toutes les interventions matérielles : remplacement d'écran LCD/LED, changement de clavier, réparation de connecteurs d'alimentation, upgrade de mémoire RAM, installation de SSD pour améliorer les performances, nettoyage et remplacement du système de refroidissement contre la surchauffe. Ils disposent d'un stock de pièces détachées d'origine pour une réparation immédiate.

**Services logiciels et récupération de données**

Au-delà du hardware, nos experts proposent une gamme complète de services logiciels : suppression de virus et malwares, réinstallation système, migration de données, sauvegarde et récupération de fichiers perdus, optimisation des performances, installation et configuration de logiciels professionnels. Ils interviennent sur tous les systèmes d'exploitation : Windows, macOS, Linux.

**Maintenance préventive et conseils**

Nos techniciens ne se contentent pas de réparer : ils vous conseillent pour éviter les pannes futures. Nettoyage physique de l'ordinateur, mise à jour des pilotes, configuration antivirus efficace, conseils d'utilisation pour prolonger la durée de vie de votre matériel. Un ordinateur bien entretenu peut fonctionner efficacement pendant de nombreuses années.

**Intervention à domicile ou en atelier**

Selon vos préférences et la nature de la panne, nos réparateurs interviennent directement à votre domicile ou reçoivent votre ordinateur en atelier sécurisé. L'intervention à domicile est idéale pour les problèmes logiciels et la maintenance, tandis que l'atelier convient mieux aux réparations matérielles complexes nécessitant un équipement spécialisé.
    `
  },
  'Automobiles': {
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
    ],
    tags: ['Diagnostic panne', 'Freins & sécurité', 'Embrayage', 'Carrosserie', 'Révision complète', 'Climatisation', 'Vidange moteur', 'Pneus & géométrie'],
    seoText: `
**Réparation automobile professionnelle avec Fixeo.Pro**

Votre véhicule présente des signes de faiblesse ? Bruit suspect, voyant allumé au tableau de bord, problème de freinage ou simplement besoin d'un entretien régulier ? Fixeo.Pro vous met en relation avec des garagistes professionnels et mécaniciens qualifiés partout en France. Nos partenaires interviennent sur tous types de véhicules : voitures particulières, utilitaires, motos, et toutes les marques du marché.

**Diagnostic électronique et mécanique avancé**

Nos garagistes disposent des équipements de diagnostic les plus récents pour identifier précisément l'origine des pannes. Valise de diagnostic OBD, banc de test, oscilloscope, permettent d'analyser finement les systèmes électroniques modernes. Cette approche technologique garantit un diagnostic fiable et une réparation ciblée, évitant les remplacements inutiles de pièces.

**Spécialités mécaniques complètes**

Nos mécaniciens maîtrisent tous les domaines de la réparation automobile : moteur (distribution, injection, allumage), transmission (embrayage, boîte de vitesses), systèmes de freinage (plaquettes, disques, liquide), direction et suspension, climatisation et chauffage, systèmes électriques et électroniques. Ils utilisent exclusivement des pièces d'origine ou équivalentes certifiées.

**Entretien préventif et révisions**

Au-delà des réparations d'urgence, nos garagistes proposent un suivi d'entretien personnalisé : vidanges moteur selon le kilométrage, remplacement des filtres, contrôle des niveaux, vérification de l'usure des pneus, géométrie et parallélisme, contrôle technique et contre-visite. Un entretien régulier préserve la fiabilité de votre véhicule et évite les pannes coûteuses.

**Carrosserie et remise en état esthétique**

Nos carrossiers-peintres professionnels interviennent sur tous types de dommages : rayures, impacts, bosses, pare-chocs endommagés. Techniques de débosselage sans peinture, retouche de peinture, rénovation de phares ternis, notre réseau couvre tous les besoins esthétiques pour redonner à votre véhicule son aspect d'origine.

**Transparence et garanties**

Avant toute intervention, nos garagistes établissent un devis détaillé expliquant la nature des travaux et le coût des pièces. Aucune surprise sur la facture finale ! Toutes les réparations sont garanties pièces et main-d'œuvre, avec un suivi post-réparation pour votre satisfaction. Des professionnels de confiance pour votre mobilité quotidienne.
    `
  },
  'Électroménager': {
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8070?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop'
    ],
    tags: ['Lave-linge', 'Lave-vaisselle', 'Réfrigérateur', 'Four & plaque', 'Climatisation', 'Sèche-linge', 'Micro-ondes', 'Aspirateur'],
    seoText: `
**Dépannage électroménager professionnel avec Fixeo.Pro**

Votre électroménager tombe en panne au pire moment ? Machine à laver qui fuit, réfrigérateur qui ne refroidit plus, four qui ne chauffe pas, lave-vaisselle qui ne vidange plus ? Pas de panique ! Fixeo.Pro vous connecte immédiatement avec des techniciens spécialisés dans la réparation d'électroménager, disponibles dans toute la France. Nos experts interviennent sur toutes les marques : Bosch, Whirlpool, Samsung, LG, Electrolux, Miele, et bien d'autres.

**Diagnostic rapide et intervention d'urgence**

Nos techniciens comprennent l'importance de vos appareils électroménagers dans votre quotidien. C'est pourquoi ils proposent des interventions rapides, souvent dans la journée pour les pannes urgentes. Équipés d'outils de diagnostic professionnels et d'un stock de pièces détachées courantes, ils peuvent résoudre la plupart des problèmes lors de la première visite.

**Spécialistes par catégorie d'appareils**

Chaque technicien de notre réseau développe une expertise spécifique : spécialiste lave-linge et lave-vaisselle pour les problèmes de pompe, programmateur et résistance, expert en froid pour réfrigérateurs et congélateurs (circuit frigorifique, thermostat, compresseur), technicien four et plaques de cuisson (résistances, sondes de température, programmateurs électroniques).

**Réparations durables et économiques**

Avant toute intervention, nos réparateurs évaluent la rentabilité de la réparation par rapport au remplacement. Ils privilégient toujours les solutions durables utilisant des pièces d'origine ou équivalentes certifiées. Leur expertise permet souvent de remettre en état des appareils que d'autres auraient condamnés, vous faisant économiser le coût d'un remplacement.

**Maintenance préventive et conseils d'usage**

Au-delà de la réparation, nos techniciens prodiguent des conseils d'entretien pour prolonger la durée de vie de vos appareils : nettoyage des filtres, détartrage régulier, utilisation optimale des programmes, vérification des joints et raccordements. Un électroménager bien entretenu peut fonctionner efficacement pendant 15 à 20 ans.

**Service après-vente et garanties étendues**

Toutes nos réparations sont garanties pièces et main-d'œuvre avec un service après-vente réactif. En cas de récidive de panne, nos techniciens interviennent gratuitement dans le cadre de la garantie. Cette approche qualité nous permet de maintenir un taux de satisfaction client supérieur à 95% et des relations durables avec nos utilisateurs.
    `
  },
  'Textiles': {
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582794543662-0182d2ee0f95?w=400&h=300&fit=crop'
    ],
    tags: ['Retouche vêtements', 'Réparation fermeture', 'Ourlet & ajustement', 'Maroquinerie', 'Broderie', 'Reprendre taille', 'Raccommoder trous', 'Customisation'],
    seoText: `
**Couture et retouche professionnelle avec Fixeo.Pro**

Vos vêtements préférés ont besoin d'ajustements ou de réparations ? Fermeture éclair cassée, ourlet à refaire, vêtement à ajuster à votre taille ou accroc à réparer ? Fixeo.Pro vous met en relation avec des couturières et tailleurs expérimentés, passionnés par leur métier et soucieux de redonner vie à vos pièces textiles. De la simple retouche à la transformation complète, nos artisans maîtrisent tous les aspects de la couture.

**Expertise en retouche et ajustement**

Nos couturières professionnelles excellent dans l'art de l'ajustement parfait : raccourcir ou rallonger un pantalon, ajuster la taille d'une robe, reprendre les manches d'une veste, modifier l'encolure d'un chemisier. Elles respectent le style original du vêtement tout en l'adaptant parfaitement à votre morphologie. Leur œil expert permet de conseiller les meilleures modifications pour sublimer votre silhouette.

**Réparation de maroquinerie et accessoires**

Au-delà des vêtements, nos artisans interviennent sur la maroquinerie : réparation de fermetures éclair sur sacs et bagages, changement de sangles, reconditionnement de cuir abîmé, réparation de doublures. Ils travaillent également sur les accessoires : réparation de parapluies, ajustement de ceintures, pose d'œillets et rivets, remplacement de boutons spéciaux.

**Services de broderie et personnalisation**

Nos brodeuses talentueuses proposent des services de marquage et personnalisation : broderie de prénoms, logos d'entreprise, motifs décoratifs, monogrammes élégants. Que ce soit pour identifier des vêtements professionnels, personnaliser un cadeau ou réparer une broderie existante, elles maîtrisent toutes les techniques de broderie traditionnelle et moderne.

**Transformation et upcycling créatif**

Dans une démarche éco-responsable, nos couturières accompagnent vos projets de transformation : transformer une robe en jupe, moderniser un blazer vintage, créer des accessoires à partir de chutes de tissu, adapter des vêtements d'adulte pour enfants. Cette approche créative permet de donner une seconde vie à des pièces délaissées tout en créant des vêtements uniques.

**Urgences et interventions rapides**

Nos professionnelles comprennent que certaines retouches sont urgentes : ourlet de dernière minute avant un événement, réparation express d'un vêtement professionnel, fermeture éclair à changer rapidement. Elles proposent des services express tout en maintenant leur exigence de qualité, pour que vous soyez impeccable en toutes circonstances.
    `
  },
  'Horlogerie': {
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=300&fit=crop'
    ],
    tags: ['Montres mécaniques', 'Montres connectées', 'Horloges murales', 'Bijoux précieux', 'Changement pile', 'Révision mouvement', 'Bracelet montre', 'Gravure'],
    seoText: `
**Horlogerie et bijouterie d'art avec Fixeo.Pro**

Votre montre s'arrête, retarde ou avance ? Votre bijou précieux nécessite une réparation délicate ? Fixeo.Pro vous connecte avec des horlogers-bijoutiers qualifiés, gardiens d'un savoir-faire ancestral et maîtrisant les technologies horlogères modernes. Nos artisans interviennent sur tous types de garde-temps : montres mécaniques de prestige, montres connectées, réveils anciens, horloges comtoises, et proposent également des services de bijouterie.

**Expertise en horlogerie mécanique traditionnelle**

Nos maîtres horlogers perpétuent la tradition de l'horlogerie fine : démontage complet du mouvement, nettoyage aux ultrasons, remplacement des pièces d'usure, lubrification précise, réglage de la marche et remontage méticuleux. Ils interviennent sur toutes les complications : chronographes, calendriers perpétuels, phases de lune, répétitions minutes. Leur expertise couvre les grandes marques suisses et françaises.

**Réparation de montres connectées et électroniques**

L'horlogerie moderne nécessite de nouvelles compétences que nos techniciens maîtrisent parfaitement : remplacement d'écrans tactiles, changement de batteries lithium, réparation de capteurs, mise à jour firmware, étanchéité des boîtiers connectés. Ils interviennent sur toutes les marques : Apple Watch, Samsung Galaxy Watch, Garmin, Fitbit, Fossil et autres smartwatches.

**Services de bijouterie et joaillerie**

Nos bijoutiers professionnels proposent une gamme complète de services : retaillage de bagues, soudure de chaînes cassées, remplacement de fermoirs, sertissage de pierres, rhodiage de bijoux en or blanc, nettoyage et polissage, estimation de bijoux anciens. Ils travaillent tous les métaux précieux et interviennent sur les bijoux de famille avec le respect qu'ils méritent.

**Gravure personnalisée et services sur mesure**

Nos artisans proposent des services de gravure traditionnelle et laser : inscription de dédicaces, armoiries, dates anniversaires, logos d'entreprise. Ils créent également des pièces sur mesure : alliances personnalisées, médailles commémoratives, trophées gravés. Chaque réalisation est unique et témoigne de leur maîtrise technique et artistique.

**Restauration d'horloges anciennes et pendules**

Spécialistes des mécanismes anciens, nos horlogers restaurent les garde-temps patrimoniaux : horloges comtoises, pendules Empire, réveils mécaniques, montres de poche. Ils respectent l'authenticité des pièces tout en leur redonnant leur fonctionnalité d'origine. Cette expertise rare permet de préserver et transmettre ces témoins de l'art horloger français.
    `
  },
  'Audio/Vidéo': {
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
    ],
    tags: ['Télévisions', 'Chaînes Hi-Fi', 'Casques audio', 'Enceintes', 'Home cinéma', 'Platines vinyle', 'Amplificateurs', 'Projecteurs'],
    seoText: `
**Réparation audio-vidéo professionnelle avec Fixeo.Pro**

Votre matériel audio-vidéo ne fonctionne plus correctement ? Télévision avec image défaillante, chaîne hi-fi silencieuse, casque audio défectueux ou home cinéma en panne ? Fixeo.Pro vous met en relation avec des techniciens spécialisés dans la réparation d'équipements audio-vidéo, passionnés par l'électronique et soucieux de restituer une qualité sonore et visuelle optimale à vos appareils.

**Réparation de télévisions et écrans**

Nos techniciens maîtrisent la réparation de tous types d'écrans : LCD, LED, OLED, QLED, plasma. Ils diagnostiquent et réparent les pannes courantes : rétroéclairage défaillant, dalle cassée, carte électronique défectueuse, alimentation en panne, problèmes de connectique HDMI/USB. Leur expertise couvre toutes les marques : Samsung, LG, Sony, Panasonic, Philips, et toutes les tailles d'écran.

**Spécialistes en matériel hi-fi et audio**

Nos réparateurs audio possèdent une connaissance approfondie de l'électronique analogique et numérique : réparation d'amplificateurs (transistors, circuits intégrés, condensateurs), remise en état de platines vinyles (bras, cellule, moteur), dépannage de lecteurs CD/DVD, réparation d'enceintes acoustiques (haut-parleurs, filtres passifs, ébénisterie).

**Services home cinéma et systèmes multimédia**

L'installation et la réparation de systèmes home cinéma nécessitent des compétences spécifiques que nos techniciens maîtrisent : configuration d'amplificateurs surround, calibrage acoustique, réparation de projecteurs (lampes, optiques, cartes électroniques), dépannage de média centers et boîtiers streaming, résolution de problèmes de synchronisation audio-vidéo.

**Réparation de casques et écouteurs premium**

Nos spécialistes interviennent sur les casques haut de gamme : remplacement de transducteurs, réparation de câbles, changement de coussinets et bandeaux, réparation de systèmes de réduction de bruit actif. Ils travaillent sur toutes les marques premium : Sennheiser, Beyerdynamic, Audio-Technica, Sony, Bose, AKG, préservant les caractéristiques sonores originales.

**Maintenance préventive et optimisation**

Au-delà de la réparation, nos techniciens proposent des services de maintenance : nettoyage de têtes de lecture, lubrification de mécanismes, remplacement préventif de composants d'usure, mise à jour firmware, optimisation des réglages. Cette approche préventive prolonge significativement la durée de vie de vos équipements audio-vidéo et maintient leurs performances optimales.
    `
  },
  'Imprimantes': {
    images: [
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&h=300&fit=crop'
    ],
    tags: ["Jet d'encre", 'Laser couleur', 'Scanners', 'Photocopieurs', 'Traceurs', 'Bourrage papier', 'Têtes impression', 'Maintenance'],
    seoText: `
**Dépannage d'imprimantes et équipements bureautiques avec Fixeo.Pro**

Votre imprimante refuse d'imprimer, produit des documents de mauvaise qualité ou affiche des messages d'erreur incompréhensibles ? Scanner qui ne numérise plus, photocopieur professionnel en panne ou traceur grand format défaillant ? Fixeo.Pro vous connecte avec des techniciens spécialisés dans la maintenance et la réparation d'équipements bureautiques, experts dans toutes les technologies d'impression modernes.

**Expertise en imprimantes jet d'encre et laser**

Nos techniciens maîtrisent parfaitement les deux technologies principales : réparation de têtes d'impression jet d'encre (nettoyage, débouchage, remplacement), maintenance de tambours laser et unités de fusion, remplacement de courroies et galets d'entraînement, réparation de circuits d'alimentation papier. Ils interviennent sur toutes les marques : HP, Canon, Epson, Brother, Samsung, Xerox.

**Dépannage de scanners et photocopieurs professionnels**

Les équipements de numérisation nécessitent une expertise spécifique : nettoyage et calibrage de capteurs CCD/CIS, réparation de mécanismes d'entraînement, remplacement de lampes de numérisation, maintenance de chargeurs automatiques de documents. Nos techniciens interviennent aussi bien sur les scanners de bureau que sur les photocopieurs multifonctions professionnels haute cadence.

**Maintenance préventive et contrats de service**

Nos professionnels proposent des contrats de maintenance préventive : nettoyage régulier des mécanismes, remplacement programmé des pièces d'usure, mise à jour des pilotes et firmware, optimisation des paramètres d'impression. Cette approche préventive réduit considérablement les pannes et maintient une qualité d'impression constante.

**Réparation de traceurs et imprimantes grand format**

Les traceurs grand format utilisés en architecture, ingénierie et communication nécessitent des compétences particulières : maintenance des systèmes d'encre continue, calibrage colorimétrique, réparation de mécanismes de précision, entretien des systèmes de découpe. Nos techniciens spécialisés interviennent sur les marques professionnelles : HP DesignJet, Canon imagePROGRAF, Epson SureColor.

**Conseil en consommables et optimisation des coûts**

Au-delà de la réparation, nos experts conseillent sur le choix des consommables : cartouches d'origine vs compatibles, papiers adaptés selon l'usage, optimisation des coûts à la page. Ils forment également les utilisateurs aux bonnes pratiques d'utilisation et de maintenance quotidienne pour prolonger la durée de vie des équipements et maintenir la qualité d'impression.
    `
  },
  'Appareils photo': {
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1554439607-63094ea4f749?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    ],
    tags: ['Reflex numériques', 'Appareils compacts', 'Objectifs photo', 'Flash externe', 'Caméscopes', 'Capteur nettoyage', 'Miroir réflex', 'Stabilisation'],
    seoText: `
**Réparation d'appareils photo et matériel photographique avec Fixeo.Pro**

Votre appareil photo refuse de se déclencher, produit des images floues ou présente des dysfonctionnements ? Objectif avec autofocus défaillant, flash qui ne se déclenche plus, caméscope qui ne s'allume pas ou écran LCD cassé ? Fixeo.Pro vous met en relation avec des techniciens spécialisés dans la réparation de matériel photographique, passionnés par l'optique et l'électronique de précision qui caractérisent ces équipements sophistiqués.

**Expertise en réflex numériques et hybrides**

Nos techniciens photo maîtrisent la complexité des boîtiers modernes : nettoyage professionnel de capteurs, réparation de mécanismes de miroir, calibrage de systèmes autofocus, remplacement d'obturateurs défaillants, réparation d'écrans LCD articulés, maintenance de systèmes de stabilisation intégrés. Ils interviennent sur toutes les marques : Canon, Nikon, Sony, Fujifilm, Olympus, Panasonic.

**Réparation d'objectifs et optiques**

L'entretien des objectifs nécessite une expertise particulière : nettoyage optique professionnel, réparation de mécanismes de zoom et de mise au point, remplacement de lentilles endommagées, réparation de diaphragmes grippés, maintenance de stabilisateurs optiques. Nos spécialistes travaillent sur tous types d'objectifs : grand angle, téléobjectifs, macros, fixes et zooms professionnels.

**Services pour appareils compacts et caméscopes**

Les appareils compacts et caméscopes intègrent de nombreuses fonctions dans un volume réduit : réparation d'objectifs rétractables, remplacement d'écrans tactiles, maintenance de systèmes d'enregistrement vidéo, réparation de mécanismes de zoom motorisés, nettoyage de systèmes optiques intégrés. Nos techniciens maîtrisent ces technologies miniaturisées.

**Maintenance préventive et nettoyage professionnel**

La photographie expose les équipements à des environnements parfois difficiles : poussière, humidité, variations de température. Nos spécialistes proposent des services de maintenance préventive : nettoyage professionnel de capteurs, lubrification de mécanismes, vérification d'étanchéité, contrôle de calibrage, mise à jour de firmware. Ces interventions préservent la qualité d'image et prolongent la durée de vie.

**Expertise en matériel photographique ancien**

Les appareils argentiques et vintage nécessitent des compétences spécifiques que nos réparateurs cultivent : révision de mécanismes d'horlogerie, remplacement de mousses d'étanchéité, réparation de posemètres, maintenance d'obturateurs mécaniques. Cette expertise rare permet de préserver et faire fonctionner des appareils de collection et des objectifs mythiques.
    `
  }
}

export function SearchResults() {
 const [searchParams] = useSearchParams()
 const navigate = useNavigate()
 const {users} = useUser()
 const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
 const [userPosition, setUserPosition] = useState(null)
 const [maxDistance, setMaxDistance] = useState(25)
 const [isLocating, setIsLocating] = useState(false)
 const [location, setLocation] = useState('')
 const [modalState, setModalState] = useState({
  isOpen: false,
  type: 'call',
  professional: null
 })

 // Filtrer les professionnels (tous par défaut)
 const professionals = users.filter(user => user.userType === 'professional')

 // Fonction de calcul de distance
 const calculateDistance = useCallback((lat1, lng1, lat2, lng2) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
 }, [])

 // Géolocalisation
 const getUserLocation = useCallback(() => {
  if (!navigator.geolocation) {
   alert("La géolocalisation n'est pas supportée")
   return
  }

  setIsLocating(true)

  navigator.geolocation.getCurrentPosition(
   async position => {
    const {latitude, longitude} = position.coords
    setUserPosition({lat: latitude, lng: longitude})

    try {
     const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
     if (response.ok) {
      const data = await response.json()
      if (data.features?.[0]) {
       const feature = data.features[0]
       const city = feature.properties.city || feature.properties.municipality || ''
       const postcode = feature.properties.postcode || ''
       setLocation(`${city}${postcode ? ` (${postcode})` : ''}`)
      }
     }
    } catch (error) {
     setLocation('Position détectée')
    }

    setIsLocating(false)
   },
   error => {
    console.error('Erreur géolocalisation:', error)
    setIsLocating(false)
   }
  )
 }, [])

 // Filtrer et trier les professionnels
 const getFilteredProfessionals = useCallback(() => {
  let filtered = professionals.filter(professional => {
   if (selectedCategory !== 'all') {
    return professional.categories?.includes(selectedCategory)
   }
   return true
  })

  // Si l'utilisateur est géolocalisé, calculer les distances et filtrer
  if (userPosition) {
   filtered = filtered
    .map(professional => {
     const profLat = professional.address.coordinates?.lat || 48.8566 + Math.random() * 0.1 - 0.05
     const profLng = professional.address.coordinates?.lng || 2.3522 + Math.random() * 0.1 - 0.05
     const distance = calculateDistance(userPosition.lat, userPosition.lng, profLat, profLng)
     return {...professional, distance: Math.round(distance * 10) / 10}
    })
    .filter(professional => professional.distance <= maxDistance)
    .sort((a, b) => (a.distance || 999) - (b.distance || 999))
  }

  return filtered
 }, [professionals, selectedCategory, userPosition, maxDistance, calculateDistance])

 const filteredProfessionals = getFilteredProfessionals()

 const handleProfessionalClick = useCallback(
  id => {
   navigate(`/professional/${id}`)
  },
  [navigate]
 )

 const openModal = useCallback((type, professional) => {
  setModalState({
   isOpen: true,
   type,
   professional
  })
 }, [])

 const closeModal = useCallback(() => {
  setModalState({
   isOpen: false,
   type: 'call',
   professional: null
  })
 }, [])

 // Obtenir les données de la catégorie sélectionnée
 const getCurrentCategoryData = () => {
  if (selectedCategory === 'all') return null
  return categoryData[selectedCategory] || null
 }

 const currentCategoryData = getCurrentCategoryData()

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header avec texte SEO */}
    <motion.div className="mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <h1 className="text-4xl font-bold text-gray-900 mb-4">Trouvez les meilleurs réparateurs près de chez vous</h1>
     <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
      <p className="text-lg text-blue-900 leading-relaxed">
       <strong>Fixeo.Pro</strong> vous met en relation avec les réparateurs professionnels les plus qualifiés de votre région. Que vous ayez besoin de réparer votre smartphone, ordinateur, électroménager ou tout autre appareil, nos experts certifiés vous garantissent un service de qualité à prix compétitifs. Plus de{' '}
       <strong>8 000 professionnels vérifiés</strong> dans toute l'Europe vous attendent pour donner une seconde vie à vos objets. Économique, écologique et garanti !
      </p>
     </div>
    </motion.div>

    {/* Section spécifique à la catégorie sélectionnée */}
    {currentCategoryData && (
     <motion.div className="mb-8" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}}>
      {/* Photos de la catégorie */}
      <div className="mb-6">
       <h2 className="text-2xl font-bold text-gray-900 mb-4">Spécialistes en {selectedCategory}</h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {currentCategoryData.images.map((image, index) => (
         <motion.div key={index} initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5, delay: index * 0.1}}>
          <img src={image} alt={`${selectedCategory} ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow" />
         </motion.div>
        ))}
       </div>
       
       {/* Tags des sous-catégories */}
       <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Services spécialisés :</h3>
        <div className="flex flex-wrap gap-2">
         {currentCategoryData.tags.map((tag, index) => (
          <motion.div key={index} initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.4, delay: index * 0.05}}>
           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
            {tag}
           </Badge>
          </motion.div>
         ))}
        </div>
       </div>
      </div>

      {/* Texte SEO spécifique à la catégorie */}
      <motion.div className="bg-white rounded-lg shadow-sm p-8 mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.5}}>
       <div className="prose prose-lg max-w-none text-gray-700">
        {currentCategoryData.seoText.split('\n').map((paragraph, index) => {
         if (paragraph.trim() === '') return null
         if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
           <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
            {paragraph.replace(/\*\*/g, '')}
           </h3>
          )
         }
         return (
          <p key={index} className="mb-4 leading-relaxed">
           {paragraph}
          </p>
         )
        })}
       </div>
      </motion.div>
     </motion.div>
    )}

    {/* Barre de recherche */}
    <motion.div className="bg-white rounded-lg shadow-sm p-6 mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}}>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
       <SelectTrigger>
        <SelectValue placeholder="Catégorie de réparation" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="all">Toutes les catégories</SelectItem>
        {categories.map(category => (
         <SelectItem key={`category-${category}`} value={category}>
          {category}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>

      <Button onClick={() => navigate('/requests')} className="w-full bg-blue-600 hover:bg-blue-700">
       Voir les demandes
      </Button>
     </div>

     {/* Section de géolocalisation */}
     <div className="border-t pt-6">
      {!userPosition ? (
       // Message d'incitation à la géolocalisation
       <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-3">📍 Trouvez les réparateurs les plus proches de vous !</h3>
        <p className="text-green-700 mb-4">Actuellement, tous les réparateurs inscrits sont affichés. Pour voir les professionnels triés par proximité et connaître leur distance exacte, géolocalisez-vous en cliquant sur le bouton vert ci-dessous.</p>
        <Button onClick={getUserLocation} disabled={isLocating} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3">
         {isLocating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Navigation className="h-4 w-4 mr-2" />}
         {isLocating ? 'Localisation...' : 'Me localiser pour voir les plus proches'}
        </Button>
       </div>
      ) : (
       // Interface de géolocalisation active
       <div>
        <div className="flex items-center justify-between mb-4">
         <h3 className="text-lg font-semibold text-gray-900">📍 Recherche par proximité activée</h3>
        </div>

        <motion.div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} transition={{duration: 0.3}}>
         <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
           <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
           <span className="text-sm font-medium text-blue-800">Position détectée : {location}</span>
          </div>
          <span className="text-xs text-blue-600">
           {filteredProfessionals.length} réparateur{filteredProfessionals.length > 1 ? 's' : ''} dans la zone
          </span>
         </div>
        </motion.div>

        {/* Curseur de distance */}
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Rayon de recherche :</label>
          <span className="text-lg font-bold text-blue-600">{maxDistance} km</span>
         </div>
         <input
          type="range"
          min="1"
          max="1000"
          value={maxDistance}
          onChange={e => setMaxDistance(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          style={{
           background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(maxDistance / 1000) * 100}%, #bfdbfe ${(maxDistance / 1000) * 100}%, #bfdbfe 100%)`
          }}
         />
         <div className="flex justify-between text-xs text-blue-600">
          <span>1 km</span>
          <span>500 km</span>
          <span>1000 km</span>
         </div>
        </div>
       </div>
      )}
     </div>
    </motion.div>

    {/* Résultats */}
    <div className="w-full">
     <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
       {filteredProfessionals.length} réparateur{filteredProfessionals.length > 1 ? 's' : ''} {userPosition ? `dans un rayon de ${maxDistance} km` : 'inscrits sur la plateforme'}
      </h2>
     </div>

     <div className="space-y-6">
      {filteredProfessionals.map((professional, index) => (
       <motion.div key={`pro-${professional.id}`} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: index * 0.1}}>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProfessionalClick(professional.id)}>
         <CardContent className="p-6">
          <div className="flex gap-4">
           {professional.profilePhoto && <img src={professional.profilePhoto} alt={professional.businessName} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />}

           <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
             <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{professional.businessName || 'Réparateur professionnel'}</h3>
             </div>
             <div className="flex items-center space-x-2">
              {professional.isVerified && (
               <Badge variant="secondary" className="bg-green-100 text-green-800">
                Vérifié
               </Badge>
              )}
              {userPosition && professional.distance && (
               <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                📍 {professional.distance} km
               </Badge>
              )}
             </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
             <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{professional.rating || 5.0}</span>
              <span className="text-gray-500 ml-1">({professional.reviewCount || 0} avis)</span>
             </div>

             <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-sm">
               {professional.address.city}, {professional.address.postalCode}
               {professional.address.department && ` • ${professional.address.department}`}
              </span>
             </div>
            </div>

            <p className="text-gray-700 mb-3">{professional.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
             {professional.categories?.map((category, idx) => (
              <Badge key={`cat-${idx}`} variant="outline">
               {category}
              </Badge>
             ))}
            </div>

            <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-600">
               <Euro className="h-4 w-4 mr-1" />
               <span>À partir de 25€</span>
              </div>
              <div className="flex items-center text-gray-600">
               <Clock className="h-4 w-4 mr-1" />
               <span>Répond &lt; 2h</span>
              </div>
             </div>
             <div className="flex gap-2">
              <Button
               variant="outline"
               size="sm"
               onClick={e => {
                e.stopPropagation()
                openModal('call', professional)
               }}
              >
               <Phone className="h-4 w-4 mr-2" />
               Appeler
              </Button>
              <Button
               size="sm"
               onClick={e => {
                e.stopPropagation()
                openModal('message', professional)
               }}
              >
               <MessageCircle className="h-4 w-4 mr-2" />
               Contacter
              </Button>
             </div>
            </div>
           </div>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      ))}

      {filteredProfessionals.length === 0 && (
       <motion.div className="text-center py-12" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.6}}>
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun réparateur trouvé</h3>
        <p className="text-gray-600 mb-6">{userPosition ? `Aucun réparateur dans un rayon de ${maxDistance} km. Essayez d'augmenter la distance ou modifiez vos critères.` : 'Essayez de modifier votre catégorie ou utilisez la géolocalisation pour voir les réparateurs près de chez vous.'}</p>
        <div className="space-x-4">
         {userPosition && maxDistance < 1000 && (
          <Button onClick={() => setMaxDistance(1000)} variant="outline">
           Étendre à 1000 km
          </Button>
         )}
         <Button onClick={() => navigate('/join-as-professional')}>Devenir le premier réparateur de votre région</Button>
        </div>
       </motion.div>
      )}
     </div>
    </div>

    {/* Modal de contact */}
    {modalState.professional && <ContactModal type={modalState.type} isOpen={modalState.isOpen} onClose={closeModal} professional={modalState.professional} />}
   </div>
  </div>
 )
}