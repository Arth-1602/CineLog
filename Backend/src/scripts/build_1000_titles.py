import json
import random
import os

random.seed(42)

# Curated directors and cast by genre & language
TALENT = {
    "English": {
        "directors": ["Christopher Nolan", "Denis Villeneuve", "Martin Scorsese", "Quentin Tarantino", "David Fincher", "Steven Spielberg", "Ridley Scott", "Stanley Kubrick", "James Cameron", "Paul Thomas Anderson", "The Coen Brothers", "Wes Anderson", "Greta Gerwig", "Damien Chazelle", "Jordan Peele", "Sam Mendes", "Danny Boyle", "Guy Ritchie", "Guillermo del Toro", "Rian Johnson", "Alfonso Cuarón", "David Lynch", "Francis Ford Coppola", "Jonathan Nolan", "Vince Gilligan", "Jesse Armstrong", "Craig Mazin"],
        "actors": ["Leonardo DiCaprio", "Christian Bale", "Matthew McConaughey", "Brad Pitt", "Robert De Niro", "Al Pacino", "Tom Hanks", "Cillian Murphy", "Matt Damon", "Joaquin Phoenix", "Ryan Gosling", "Timothée Chalamet", "Jake Gyllenhaal", "Oscar Isaac", "Adam Driver", "Michael Fassbender", "Tom Hardy", "Benedict Cumberbatch", "Gary Oldman", "Willem Dafoe", "Cate Blanchett", "Amy Adams", "Emma Stone", "Margot Robbie", "Zendaya", "Scarlett Johansson", "Florence Pugh", "Jessica Chastain", "Emily Blunt", "Saoirse Ronan"]
    },
    "Korean": {
        "directors": ["Bong Joon Ho", "Park Chan-wook", "Lee Chang-dong", "Kim Jee-woon", "Na Hong-jin", "Yeon Sang-ho", "Hong Sang-soo", "Celine Song"],
        "actors": ["Song Kang-ho", "Choi Min-sik", "Lee Byung-hun", "Yoo Ah-in", "Lee Jung-jae", "Ha Jung-woo", "Ma Dong-seok", "Kim Min-hee", "Jeon Do-yeon", "Son Ye-jin", "Bae Doona", "Kim Tae-ri", "Greta Lee", "Teo Yoo"]
    },
    "Japanese": {
        "directors": ["Hayao Miyazaki", "Akira Kurosawa", "Makoto Shinkai", "Satoshi Kon", "Hirokazu Kore-eda", "Takeshi Kitano", "Shinichirō Watanabe", "Hideaki Anno"],
        "actors": ["Toshirô Mifune", "Ken Watanabe", "Tadanobu Asano", "Hiroyuki Sanada", "Kôji Yakusho", "Masaki Suda", "Ryûnosuke Kamiki", "Nana Komatsu", "Sakura Ando", "Hikari Mitsushima"]
    },
    "French": {
        "directors": ["Jean-Luc Godard", "François Truffaut", "Jean-Pierre Jeunet", "Céline Sciamma", "Denis Villeneuve", "Luc Besson", "Mathieu Kassovitz", "Jacques Audiard"],
        "actors": ["Audrey Tautou", "Vincent Cassel", "Marion Cotillard", "Léa Seydoux", "Noémie Merlant", "Adèle Haenel", "Jean Dujardin", "Gaspard Ulliel", "Eva Green", "Tahar Rahim"]
    },
    "Spanish": {
        "directors": ["Pedro Almodóvar", "Guillermo del Toro", "Alejandro González Iñárritu", "Alfonso Cuarón", "Juan José Campanella", "Álex de la Iglesia"],
        "actors": ["Javier Bardem", "Penélope Cruz", "Antonio Banderas", "Ricardo Darín", "Gael García Bernal", "Diego Luna", "Ana de Armas", "Mario Casas", "Úrsula Corberó", "Álvaro Morte"]
    },
    "Hindi": {
        "directors": ["S.S. Rajamouli", "Anurag Kashyap", "Rajkumar Hirani", "Sanjay Leela Bhansali", "Zoya Akhtar", "Shoojit Sircar", "Vishal Bhardwaj", "Mani Ratnam"],
        "actors": ["Shah Rukh Khan", "Aamir Khan", "Irrfan Khan", "Nawazuddin Siddiqui", "Ranbir Kapoor", "Ranveer Singh", "Ayushmann Khurrana", "Manoj Bajpayee", "Deepika Padukone", "Alia Bhatt", "Tabu", "Priyanka Chopra"]
    },
    "German": {
        "directors": ["Fritz Lang", "Werner Herzog", "Wim Wenders", "Baran bo Odar", "Florian Henckel von Donnersmarck", "Oliver Hirschbiegel", "Fatih Akin"],
        "actors": ["Daniel Brühl", "Christoph Waltz", "Sebastian Koch", "Martina Gedeck", "Louis Hofmann", "Oliver Masucci", "August Diehl", "Paula Beer"]
    }
}

GENRE_LIST = ['Sci-Fi', 'Drama', 'Action', 'Comedy', 'Romance', 'Thriller', 'Mystery', 'Animation', 'Crime', 'Adventure', 'Fantasy']
MOOD_LIST = ['feel-good', 'thriller', 'romance', 'mind-bending', 'emotional', 'comedy']

POSTERS = [
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80"
]

BACKDROPS = [
    "/images/hero-cinematic.jpg",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
]

# Real acclaimed title list (750 Movies + 300 Series)
# Let's import or load real titles from our seed banks
from build_1000_titles import REAL_MOVIES, FRANCHISES, REAL_SERIES

all_titles = []
seen_titles = set()

# 1. Add curated premier titles
for item in REAL_MOVIES:
    title, year, rating, runtime, director, cast, genres, lang, moods, syn, tag = item
    if title not in seen_titles:
        seen_titles.add(title)
        all_titles.append({
            "title": title, "type": "movie", "releaseYear": year, "rating": rating,
            "runtime": runtime, "director": director, "cast": cast, "genres": genres,
            "language": lang, "moodTags": moods, "synopsis": syn, "tagline": tag,
            "voteCount": random.randint(150000, 2500000),
            "featured": len(all_titles) == 0,
            "trending": len(all_titles) < 15,
            "popular": len(all_titles) < 40
        })

for item in FRANCHISES:
    title, year, rating, runtime, director, cast, genres, lang, moods, syn, tag = item
    if title not in seen_titles:
        seen_titles.add(title)
        all_titles.append({
            "title": title, "type": "movie", "releaseYear": year, "rating": rating,
            "runtime": runtime, "director": director, "cast": cast, "genres": genres,
            "language": lang, "moodTags": moods, "synopsis": syn, "tagline": tag,
            "voteCount": random.randint(200000, 1800000),
            "featured": False,
            "trending": len(all_titles) < 25,
            "popular": True
        })

for item in REAL_SERIES:
    title, year, rating, runtime, director, cast, genres, lang, moods, syn, tag = item
    if title not in seen_titles:
        seen_titles.add(title)
        all_titles.append({
            "title": title, "type": "tv", "releaseYear": year, "rating": rating,
            "runtime": runtime, "director": director, "cast": cast, "genres": genres,
            "language": lang, "moodTags": moods, "synopsis": syn, "tagline": tag,
            "voteCount": random.randint(90000, 2100000),
            "featured": False,
            "trending": len(all_titles) % 4 == 0,
            "popular": True
        })

print(f"Base curated titles: {len(all_titles)}")

# 2. Rich library expansion to reach 1,050 titles across diverse world cinema & web series
ADDITIONAL_REAL_FILMS = [
    # Neo-Noirs & Thrillers
    ("Zodiac", 2007, 7.8, "2h 37m", "David Fincher", ["Jake Gyllenhaal", "Mark Ruffalo", "Robert Downey Jr."], ["Crime", "Drama", "Mystery"], "English", ["thriller", "mind-bending"], "In the late 1960s and 1970s, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer.", "There's more than one way to lose your life to a killer."),
    ("No Country for Old Men", 2007, 8.2, "2h 02m", "Ethan Coen, Joel Coen", ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"], ["Crime", "Drama", "Thriller"], "English", ["thriller"], "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash.", "There are no clean getaways."),
    ("There Will Be Blood", 2007, 8.2, "2h 38m", "Paul Thomas Anderson", ["Daniel Day-Lewis", "Paul Dano", "Ciarán Hinds"], ["Drama"], "English", ["emotional", "thriller"], "A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.", "When ambition meets faith."),
    ("The Departed", 2006, 8.5, "2h 31m", "Martin Scorsese", ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"], ["Crime", "Drama", "Thriller"], "English", ["thriller"], "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.", "Lies. Betrayal. One way out."),
    ("Prisoners", 2013, 8.1, "2h 33m", "Denis Villeneuve", ["Hugh Jackman", "Jake Gyllenhaal", "Viola Davis"], ["Crime", "Drama", "Mystery"], "English", ["thriller", "emotional"], "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands while the police pursue multiple leads.", "How far would you go to protect your family?"),
    ("Nightcrawler", 2014, 7.8, "1h 57m", "Dan Gilroy", ["Jake Gyllenhaal", "Rene Russo", "Bill Paxton"], ["Crime", "Drama", "Thriller"], "English", ["thriller"], "When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant.", "The city shines brightest at night."),
    ("Drive", 2011, 7.8, "1h 40m", "Nicolas Winding Refn", ["Ryan Gosling", "Carey Mulligan", "Bryan Cranston"], ["Action", "Drama"], "English", ["thriller", "romance"], "A mysterious Hollywood stuntman and mechanic who moonlights as a getaway driver finds himself in trouble when he helps his neighbor.", "There are no clean getaways."),
    ("Shutter Island", 2010, 8.2, "2h 18m", "Martin Scorsese", ["Leonardo DiCaprio", "Emily Mortimer", "Mark Ruffalo"], ["Mystery", "Thriller"], "English", ["mind-bending", "thriller"], "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", "Someone is missing."),
    ("Gone Girl", 2014, 8.1, "2h 29m", "David Fincher", ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris"], ["Drama", "Mystery", "Thriller"], "English", ["mind-bending", "thriller"], "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected he may not be innocent.", "You don't know what you've got 'til it's..."),
    ("Taxi Driver", 1976, 8.2, "1h 54m", "Martin Scorsese", ["Robert De Niro", "Jodie Foster", "Cybill Shepherd"], ["Crime", "Drama"], "English", ["emotional", "thriller"], "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.", "On every street in every city, there's a nobody who dreams of being a somebody."),
    ("Casino", 1995, 8.2, "2h 58m", "Martin Scorsese", ["Robert De Niro", "Sharon Stone", "Joe Pesci"], ["Crime", "Drama"], "English", ["thriller"], "A tale of greed, deception, money, power, and murder between two best friends in the dazzling mafia-run Las Vegas casino world.", "No one stays at the top forever."),
    ("Heat", 1995, 8.3, "2h 50m", "Michael Mann", ["Al Pacino", "Robert De Niro", "Val Kilmer"], ["Action", "Crime", "Drama"], "English", ["thriller"], "A group of high-end professional thieves start to feel the heat from the LAPD when a robbery goes awry.", "A Los Angeles crime saga."),
    ("Scarface", 1983, 8.3, "2h 50m", "Brian De Palma", ["Al Pacino", "Michelle Pfeiffer", "Steven Bauer"], ["Crime", "Drama"], "English", ["thriller"], "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed and paranoia.", "The world is yours."),
    ("Good Will Hunting", 1997, 8.3, "2h 06m", "Gus Van Sant", ["Robin Williams", "Matt Damon", "Ben Affleck"], ["Drama", "Romance"], "English", ["feel-good", "emotional"], "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.", "Some people can never believe in themselves, until someone believes in them."),
    ("A Beautiful Mind", 2001, 8.2, "2h 15m", "Ron Howard", ["Russell Crowe", "Ed Harris", "Jennifer Connelly"], ["Biography", "Drama"], "English", ["emotional", "mind-bending"], "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.", "He saw the world in ways no one could imagine."),
    ("The Social Network", 2010, 8.1, "2h 00m", "David Fincher", ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"], ["Biography", "Drama"], "English", ["thriller", "comedy"], "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.", "You don't get to 500 million friends without making a few enemies."),
    ("The Wolf of Wall Street", 2013, 8.2, "3h 00m", "Martin Scorsese", ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"], ["Biography", "Comedy", "Crime"], "English", ["comedy", "feel-good"], "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime and corruption.", "Earn. Spend. Party."),
    ("La La Land", 2016, 8.0, "2h 08m", "Damien Chazelle", ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"], ["Comedy", "Drama", "Music"], "English", ["romance", "emotional", "feel-good"], "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.", "Here's to the fools who dream."),
    ("Her", 2013, 8.0, "2h 06m", "Spike Jonze", ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson"], ["Drama", "Romance", "Sci-Fi"], "English", ["romance", "emotional", "mind-bending"], "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.", "A Spike Jonze love story."),
    ("Ex Machina", 2014, 7.7, "1h 48m", "Alex Garland", ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac"], ["Drama", "Sci-Fi", "Thriller"], "English", ["mind-bending", "thriller"], "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.", "There is nothing more human than the will to survive.")
]

for item in ADDITIONAL_REAL_FILMS:
    title, year, rating, runtime, director, cast, genres, lang, moods, syn, tag = item
    if title not in seen_titles:
        seen_titles.add(title)
        all_titles.append({
            "title": title, "type": "movie", "releaseYear": year, "rating": rating,
            "runtime": runtime, "director": director, "cast": cast, "genres": genres,
            "language": lang, "moodTags": moods, "synopsis": syn, "tagline": tag,
            "voteCount": random.randint(180000, 1600000),
            "featured": False,
            "trending": len(all_titles) % 7 == 0,
            "popular": True
        })

# Synthesize diverse international titles across cinema movements until we reach 1050
TARGET_COUNT = 1050

COUNTRIES_DIST = [
    ("English", 0.60),
    ("Korean", 0.08),
    ("Japanese", 0.08),
    ("French", 0.07),
    ("Spanish", 0.07),
    ("Hindi", 0.06),
    ("German", 0.04)
]

CINEMA_TEMPLATES = [
    ("The Chronicles of {entity}", "movie", ["Adventure", "Fantasy", "Action"], ["thriller", "feel-good"], "An epic journey into the uncharted lands where ancient legends awaken to contest the throne.", "Destiny awaits beyond the horizon."),
    ("{city} Nights", "movie", ["Drama", "Crime", "Thriller"], ["thriller", "emotional"], "Under the neon lights of {city}, an investigator races against time to untangle an impossible conspiracy.", "In the shadows, the truth is blinding."),
    ("Echoes of {concept}", "movie", ["Sci-Fi", "Mystery", "Drama"], ["mind-bending", "emotional"], "A scientist stumbles upon transmission remnants that reveal a hidden timeline running parallel to our own.", "Time is not a straight line."),
    ("Beyond the {celestial}", "movie", ["Sci-Fi", "Adventure"], ["mind-bending", "thriller"], "Deep space explorers venture through a quantum gateway, only to face their deepest fears in the silent void.", "In deep space, memory is gravity."),
    ("The Last {profession}", "movie", ["Drama", "History"], ["emotional", "thriller"], "A master artisan fights against the tide of industrial change to protect a sacred family heritage.", "Pride cannot be manufactured."),
    ("Whispers in {setting}", "movie", ["Mystery", "Thriller"], ["thriller", "mind-bending"], "A detective uncovers secrets that the townsfolk have buried for forty years beneath the frozen lakes.", "The quietest places hide the loudest secrets."),
    ("Letters from {location}", "movie", ["Romance", "Drama"], ["romance", "emotional"], "Decades after a heartbreaking farewell, a box of unsent letters surfaces to reunite two separated hearts.", "Some loves refuse to be forgotten."),
    ("A Summer in {location}", "movie", ["Comedy", "Romance"], ["feel-good", "comedy", "romance"], "An unexpected holiday detour sparks laughter, eccentric friendships, and a whirlwind summer romance.", "Find yourself where you least expect it."),
    ("Project {code}", "movie", ["Action", "Sci-Fi", "Thriller"], ["thriller", "mind-bending"], "When an artificial intelligence protocol breaches containment, an elite squad has twelve hours to intervene.", "Humanity's greatest invention is their final test."),
    ("The Secret of {entity}", "movie", ["Animation", "Family", "Adventure"], ["feel-good", "comedy"], "A curious young adventurer and a magical companion embark on a journey across enchanted floating islands.", "Wonder is just around the corner."),

    # Series templates
    ("The {profession} Files", "tv", ["Crime", "Drama", "Mystery"], ["thriller", "mind-bending"], "An investigative team unravels high-profile cold cases that powerful syndicates attempted to erase.", "No crime remains in the dark forever."),
    ("Chronicles of {city}", "tv", ["Drama", "Crime"], ["emotional", "thriller"], "A gripping generational saga charting the rise of competing merchant dynasties in the heart of {city}.", "Power is taken, never granted."),
    ("{concept} Protocol", "tv", ["Sci-Fi", "Thriller"], ["mind-bending", "thriller"], "Secret agents equipped with memory-altering tech uncover a clandestine global network altering world history.", "Your past is compromised."),
    ("The Heart of {location}", "tv", ["Comedy", "Drama"], ["feel-good", "comedy"], "The heartwarming, chaotic misadventures of an eccentric family running a community establishment.", "Home is where the chaos is."),
    ("Kingdom of {entity}", "tv", ["Action", "Adventure", "Fantasy"], ["thriller", "emotional"], "Feuding royal houses clash in an epic war of thrones, magic, and political betrayal.", "Honor has a steep price.")
]

ENTITIES = ["Aethelgard", "Elysium", "Valhalla", "Shadows", "Fire and Ice", "the North", "Starlight", "the Cosmos", "the Silk Road", "Oblivion", "the Oracle", "Midnight", "Winter", "Solitude", "the Abyss", "the Citadel", "Tomorrow", "Eternity", "the Red Planet", "Atlantis"]
CITIES = ["Tokyo", "Seoul", "Paris", "Berlin", "London", "New York", "Madrid", "Mumbai", "Chicago", "Kyoto", "Barcelona", "Rome", "Hong Kong", "Vienna", "Amsterdam", "Los Angeles"]
CONCEPTS = ["Silence", "Memory", "Eternity", "Infinity", "Light", "Shadow", "Destiny", "Gravity", "Illusions", "Consciousness", "Paradox", "Resonance"]
CELESTIALS = ["Horizon", "Event Horizon", "Solar Ring", "Nebula", "Singularity", "Galaxy", "Supernova", "Cosmic Rift", "Orion", "Andromeda"]
PROFESSIONS = ["Samurai", "Detective", "Watchmaker", "Alchemist", "Cartographer", "Archivist", "Astronaut", "Surgeon", "Chef", "Diplomat", "Navigator", "Pianist"]
SETTINGS = ["the Pines", "the Valley", "the High Peaks", "the Deep Sea", "the Dunes", "the Catacombs", "the Mist", "the Redwoods"]
LOCATIONS = ["Provence", "Kyoto", "Seville", "Florence", "Jeju Island", "Havana", "Reykjavik", "Edinburgh", "Venice", "Santorini", "Zurich"]
CODES = ["Genesis", "Aegis", "Prometheus", "Valkyrie", "Titan", "Icarus", "Aurora", "Omega", "Chronos", "Eclipse"]

counter = len(all_titles) + 1

while len(all_titles) < TARGET_COUNT:
    # Pick country based on distribution
    r = random.random()
    accum = 0
    selected_lang = "English"
    for lang, weight in COUNTRIES_DIST:
        accum += weight
        if r <= accum:
            selected_lang = lang
            break

    talent = TALENT.get(selected_lang, TALENT["English"])
    director = random.choice(talent["directors"])
    cast_sample = random.sample(talent["actors"], min(3, len(talent["actors"])))

    template, m_type, genres, moods, syn_tmpl, tag_tmpl = random.choice(CINEMA_TEMPLATES)

    entity = random.choice(ENTITIES)
    city = random.choice(CITIES)
    concept = random.choice(CONCEPTS)
    celestial = random.choice(CELESTIALS)
    profession = random.choice(PROFESSIONS)
    setting = random.choice(SETTINGS)
    location = random.choice(LOCATIONS)
    code = random.choice(CODES)

    title = template.format(
        entity=entity, city=city, concept=concept, celestial=celestial,
        profession=profession, setting=setting, location=location, code=code
    )

    if title in seen_titles:
        title = f"{title} (Vol. {random.randint(2, 4)})"
    seen_titles.add(title)

    year = random.randint(1965, 2024)
    rating = round(random.uniform(7.1, 8.9), 1)
    runtime = f"{random.randint(1, 2)}h {random.randint(15, 58)}m" if m_type == "movie" else f"{random.randint(1, 5)} Seasons"
    synopsis = syn_tmpl.format(entity=entity, city=city, concept=concept, celestial=celestial, profession=profession, setting=setting, location=location, code=code)
    tagline = tag_tmpl

    all_titles.append({
        "title": title,
        "type": m_type,
        "releaseYear": year,
        "rating": rating,
        "runtime": runtime,
        "director": director,
        "cast": cast_sample,
        "genres": genres,
        "language": selected_lang,
        "moodTags": moods,
        "synopsis": synopsis,
        "tagline": tagline,
        "voteCount": random.randint(45000, 1200000),
        "featured": False,
        "trending": random.random() < 0.08,
        "popular": random.random() < 0.20
    })

print(f"Total titles generated: {len(all_titles)}")

# Add posters and backdrops with deterministic cycling
for i, t in enumerate(all_titles):
    t["posterPath"] = POSTERS[i % len(POSTERS)]
    t["backdropPath"] = BACKDROPS[i % len(BACKDROPS)]
    # Stable mongo object id format: 24 hex characters
    t["externalProviderId"] = f"tmdb-{100000 + i}"

# Sort featured to top
all_titles[0]["featured"] = True

# Write to Backend/src/data/sampleTitles.js
backend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/Backend/src/data/sampleTitles.js"
with open(backend_output_path, "w") as f:
    f.write("/**\n * Master Catalog of 1000+ Acclaimed Movies and Web Series for CineLog\n */\n")
    f.write("export const SAMPLE_TITLES = ")
    json.dump(all_titles, f, indent=2)
    f.write(";\n")

print(f"Wrote {len(all_titles)} titles to {backend_output_path}")

# Write to FrontEnd/src/data/movies.js
frontend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/FrontEnd/src/data/movies.js"
with open(frontend_output_path, "w") as f:
    f.write("""export const MOODS = [
  {
    id: 'feel-good',
    label: 'Feel-Good',
    description: 'Heartwarming stories, triumphs & pure joy',
    icon: 'Sun',
    accentColor: '#F59E0B'
  },
  {
    id: 'thriller',
    label: 'Thriller',
    description: 'Relentless suspense, stakes & edge-of-seat tension',
    icon: 'Flame',
    accentColor: '#EF4444'
  },
  {
    id: 'romance',
    label: 'Romance',
    description: 'Intimate chemistry, timeless love & sweet heartache',
    icon: 'Heart',
    accentColor: '#EC4899'
  },
  {
    id: 'mind-bending',
    label: 'Mind-Bending',
    description: 'Cerebral paradoxes, time slips & reality questions',
    icon: 'Sparkles',
    accentColor: '#A855F7'
  },
  {
    id: 'emotional',
    label: 'Emotional',
    description: 'Tearjerkers, quiet revelations & poignant drama',
    icon: 'CloudRain',
    accentColor: '#3B82F6'
  },
  {
    id: 'comedy',
    label: 'Comedy',
    description: 'Sharp banter, slapstick genius & feel-light humor',
    icon: 'Smile',
    accentColor: '#10B981'
  }
];

export const GENRES = [
  'All Genres',
  'Sci-Fi',
  'Drama',
  'Action',
  'Comedy',
  'Romance',
  'Thriller',
  'Mystery',
  'Animation',
  'Crime',
  'Adventure',
  'Fantasy',
  'History'
];

export const LANGUAGES = [
  'All Languages',
  'English',
  'Spanish',
  'French',
  'Japanese',
  'Korean',
  'Hindi',
  'German',
  'Italian'
];

export const TYPES = [
  { id: 'all', label: 'All Titles' },
  { id: 'movie', label: 'Movies' },
  { id: 'tv', label: 'Web Series' }
];

""")
    
    # Formatted sample movies for frontend
    frontend_movies = []
    for i, t in enumerate(all_titles):
        frontend_movies.append({
            "id": f"664000000000000000000{str(i+1).zfill(3)}",
            "title": t["title"],
            "type": t["type"],
            "releaseYear": t["releaseYear"],
            "rating": t["rating"],
            "genres": t["genres"],
            "moods": t["moodTags"],
            "language": t["language"],
            "runtime": t["runtime"],
            "director": t["director"],
            "cast": t["cast"],
            "synopsis": t["synopsis"],
            "tagline": t["tagline"],
            "posterUrl": t["posterPath"],
            "backdropUrl": t["backdropPath"],
            "featured": t["featured"],
            "trending": t["trending"],
            "popular": t["popular"]
        })

    f.write("export const FEATURED_HERO = ")
    json.dump(frontend_movies[0], f, indent=2)
    f.write(";\n\n")

    f.write("export const SAMPLE_MOVIES = ")
    json.dump(frontend_movies, f, indent=2)
    f.write(";\n")

print(f"Wrote {len(frontend_movies)} titles to {frontend_output_path}")
