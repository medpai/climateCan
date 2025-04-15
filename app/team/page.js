'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function TeamPage() {
  // État pour gérer les détails affichés pour chaque membre
  const [expandedMember, setExpandedMember] = useState(null);

  // Données des membres de l'équipe
  const teamMembers = [
    {
      id: 1,
      name: "Elmahdi harchi",
      role: "Étudiant",
      image: "/team/member1.jpg", 
      contribution: [
        "Conception de la base de données PostgreSQL",
        "Développement des procédures stockées pour l'analyse des données",
        "Optimisation des requêtes SQL",
        "Création des scripts d'importation des données climatiques"
      ],
      bio: "Étudiant en PROGRAMMATION INFORMATIQUE"
    },
    {
      id: 2,
      name: "Ziad Radi",
      role: "Étudiant",
      image: "/team/member2.jpg", 
      contribution: [
        "Conception de l'interface utilisateur avec Next.js et Tailwind CSS",
        "Développement des composants de visualisation de données",
        "Implémentation des graphiques interactifs",
        "Optimisation des performances frontend"
      ],
      bio: "Étudiant en PROGRAMMATION INFORMATIQUE"
    },
    {
      id: 3,
      name: "Zakaria Kebdani",
      role: "Étudiant",
      image: "img/zak.jpg", // Remplacer par le chemin réel de l'image
      contribution: [
        "Analyse statistique des données climatiques",
        "Développement des modèles de corrélation entre les différentes variables",
        "Création des algorithmes de détection de tendances",
        "Documentation des méthodologies d'analyse"
      ],
      bio: "Étudiant en PROGRAMMATION INFORMATIQUE"
    },
    {
      id: 4,
      name: "Wassim Bellouz",
      role: "Étudiant",
      image: "/team/member4.jpg", // Remplacer par le chemin réel de l'image
      contribution: [
        "Coordination de l'équipe et gestion du projet",
        "Configuration de l'infrastructure et du déploiement continu",
        "Mise en place des tests automatisés",
        "Gestion de la qualité et de la documentation"
      ],
      bio: "Étudiant en PROGRAMMATION INFORMATIQUE"
    }
  ];

  // Fonction pour afficher/masquer les détails d'un membre
  const toggleMemberDetails = (memberId) => {
    if (expandedMember === memberId) {
      setExpandedMember(null);
    } else {
      setExpandedMember(memberId);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* En-tête de la page */}
        <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Notre Équipe</h1>
            <p className="text-xl">
              Découvrez les personnes talentueuses derrière le projet Canada Weather.
            </p>
          </div>
        </section>

        {/* Introduction de l'équipe */}
        <section className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">À propos de notre équipe</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-center">
            Notre équipe multidisciplinaire combine expertise technique, analyses de données et design pour créer une plateforme 
            complète d'analyse des données climatiques canadiennes. Chaque membre apporte des compétences uniques qui contribuent 
            à la réussite de ce projet.
          </p>
        </section>

        {/* Membres de l'équipe */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Image du membre (placeholder en attendant les vraies images) */}
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <div className="relative w-full h-full">
                      {/* Remplacer par Image quand les vraies images seront disponibles */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Informations du membre */}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    
                    <button 
                      onClick={() => toggleMemberDetails(member.id)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      {expandedMember === member.id ? 'Masquer les détails' : 'Voir les contributions'}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${expandedMember === member.id ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Détails des contributions (conditionnellement affiché) */}
                {expandedMember === member.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Contributions au projet :</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {member.contribution.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Section de collaboration */}
        <section className="bg-blue-50 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Notre collaboration</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-center mb-6">
            Notre équipe a travaillé en étroite collaboration pour développer ce système d'analyse de données climatiques. 
            Nous avons utilisé une méthodologie agile avec des sprints hebdomadaires et des réunions quotidiennes pour 
            assurer une communication efficace et un développement rapide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-500 mb-3 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Travail d'équipe</h3>
              <p className="text-gray-600 text-center">
                Collaboration étroite entre les membres avec des compétences complémentaires.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-green-500 mb-3 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Qualité</h3>
              <p className="text-gray-600 text-center">
                Engagement envers l'excellence avec des tests rigoureux et des revues de code.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-purple-500 mb-3 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Innovation</h3>
              <p className="text-gray-600 text-center">
                Approche créative pour résoudre les défis techniques et d'analyse de données.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
