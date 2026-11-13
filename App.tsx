
import React from  'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};
const evenements: Evenement[] = [
  {
    id: 'E01',
    titre: 'Atelier React',
    categorie: 'Atelier',
    capacite: 25,
    inscrits: 25,
  },
  {
    id: 'E02',
    titre: 'Conférence IA',
    categorie: 'Conférence',
    capacite: 70,
    inscrits: 52,
  },
  {
    id: 'E03',
    titre: 'Sécurité mobile',
    categorie: 'Atelier',
    capacite: 20,
    inscrits: 17,
  },
  {
    id: 'E04',
    titre: 'Design UI',
    categorie: 'Atelier',
    capacite: 18,
    inscrits: 9,
  },
  {
    id: 'E05',
    titre: 'Forum projets',
    categorie: 'Rencontre',
    capacite: 50,
    inscrits: 49,
  },
  {
    id: 'E06',
    titre: 'Découverte Git',
    categorie: 'Atelier',
    capacite: 24,
    inscrits: 24,
  },
];
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

type Statut = 'Complet' | 'Presque complet' | 'Ouvert';

function statutEvenement(e: Evenement): Statut {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}
const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  e => placesRestantes(e) === 0
).length;

const evenementsDisponibles = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);
type BadgeEtatProps = {
  statut: Statut;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = '#dcfce7';

  if (statut === 'Complet') {
    couleur = '#fee2e2';
  } else if (statut === 'Presque complet') {
    couleur = '#ffedd5';
  }

  return (
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text style={styles.badgeText}>{statut}</Text>
    </View>
  );
}
type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View style={styles.carte}>
      <Text style={styles.titreCarte}>
        {evenement.titre}
      </Text>

      <Text style={styles.categorie}>
        {evenement.categorie}
      </Text>

      <Text style={styles.places}>
        {placesRestantes(evenement)} places libres
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}
type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({ libelle, nombre }: BlocStatistiqueProps) {
  return (
    <View style={styles.statistique}>
      <Text style={styles.statNombre}>{nombre}</Text>
      <Text style={styles.statLibelle}>{libelle}</Text>
    </View>
  );
}

const mode: 'tous' | 'ateliers' = 'tous';

const evenementsAffiches =
  mode === 'tous' ? evenements : ateliersDisponibles;

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>CampusAgenda</Text>
        <Text style={styles.headerSubtitle}>
          Événements du campus
        </Text>
      </View>

      <View style={styles.statistiquesContainer}>
        <BlocStatistique
          libelle="Événements"
          nombre={totalEvenements}
        />

        <BlocStatistique
          libelle="Complets"
          nombre={evenementsComplets}
        />

        <BlocStatistique
          libelle="Disponibles"
          nombre={evenementsDisponibles}
        />

        <BlocStatistique
          libelle="Places restantes"
          nombre={totalPlacesRestantes}
        />
      </View>

      <Text style={styles.sectionTitle}>
        {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
      </Text>

      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun événement disponible.
          </Text>
        }
        contentContainerStyle={styles.liste}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    backgroundColor: '#2563eb',
    padding: 22,
    borderRadius: 16,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#dbeafe',
    marginTop: 5,
  },

  statistiquesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statistique: {
    backgroundColor: '#ffffff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },

  statNombre: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  statLibelle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },

  liste: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  carte: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  titreCarte: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
  },

  categorie: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 8,
  },

  places: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
  },

  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },

  messageVide: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 30,
  },
});
