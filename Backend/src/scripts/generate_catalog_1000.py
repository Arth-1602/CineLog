import json
import random

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

GENRE_LIST = ['Sci-Fi', 'Drama', 'Action', 'Comedy', 'Romance', 'Thriller', 'Mystery', 'Animation', 'Crime', 'Adventure', 'Fantasy', 'History']
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

# Master acclaimed titles
PREMIER_RECORDS = [
    # Movies
    ("Dune: Part Two", "movie", 2024, 8.8, "2h 46m", "Denis Villeneuve", ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], ["Sci-Fi", "Adventure", "Action"], "English", ["mind-bending", "thriller"], "Paul Atreides unites with Chani and the Fremen to wage war against the conspirators who destroyed his family.", "Long live the fighters."),
    ("Interstellar", "movie", 2014, 8.7, "2h 49m", "Christopher Nolan", ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], ["Sci-Fi", "Drama", "Adventure"], "English", ["mind-bending", "emotional"], "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", "Mankind was born on Earth. It was never meant to die here."),
    ("Inception", "movie", 2010, 8.8, "2h 28m", "Christopher Nolan", ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"], ["Sci-Fi", "Action", "Thriller"], "English", ["mind-bending", "thriller"], "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.", "Your mind is the scene of the crime."),
    ("The Shawshank Redemption", "movie", 1994, 9.3, "2h 22m", "Frank Darabont", ["Tim Robbins", "Morgan Freeman"], ["Drama"], "English", ["emotional", "feel-good"], "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "Fear can hold you prisoner. Hope can set you free."),
    ("The Godfather", "movie", 1972, 9.2, "2h 55m", "Francis Ford Coppola", ["Marlon Brando", "Al Pacino", "James Caan"], ["Crime", "Drama"], "English", ["thriller", "emotional"], "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.", "An offer you can't refuse."),
    ("The Dark Knight", "movie", 2008, 9.0, "2h 32m", "Christopher Nolan", ["Christian Bale", "Heath Ledger", "Aaron Eckhart"], ["Action", "Crime", "Drama"], "English", ["thriller", "mind-bending"], "When the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests.", "Why so serious?"),
    ("Pulp Fiction", "movie", 1994, 8.9, "2h 34m", "Quentin Tarantino", ["John Travolta", "Uma Thurman", "Samuel L. Jackson"], ["Crime", "Drama"], "English", ["thriller", "comedy"], "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine.", "Just because you are a character doesn't mean you have character."),
    ("Fight Club", "movie", 1999, 8.8, "2h 19m", "David Fincher", ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"], ["Drama", "Thriller"], "English", ["mind-bending", "thriller"], "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", "Mischief. Mayhem. Soap."),
    ("Forrest Gump", "movie", 1994, 8.8, "2h 22m", "Robert Zemeckis", ["Tom Hanks", "Robin Wright", "Gary Sinise"], ["Drama", "Romance", "Comedy"], "English", ["feel-good", "emotional", "romance"], "The history of the United States unfolds from the perspective of an Alabama man with an IQ of 75.", "Life is like a box of chocolates."),
    ("Goodfellas", "movie", 1990, 8.7, "2h 25m", "Martin Scorsese", ["Robert De Niro", "Ray Liotta", "Joe Pesci"], ["Crime", "Drama"], "English", ["thriller", "comedy"], "The story of Henry Hill and his life in the mafia, covering his rise and fall.", "As far back as I can remember, I always wanted to be a gangster."),
    ("The Matrix", "movie", 1999, 8.7, "2h 16m", "Lana Wachowski, Lilly Wachowski", ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"], ["Sci-Fi", "Action"], "English", ["mind-bending", "thriller"], "When a stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth of reality.", "Welcome to the Real World."),
    ("Spirited Away", "movie", 2001, 8.6, "2h 05m", "Hayao Miyazaki", ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"], ["Animation", "Adventure", "Fantasy"], "Japanese", ["feel-good", "mind-bending"], "A 10-year-old girl wanders into a world ruled by gods, witches and spirits where humans are changed into beasts.", "Beyond the tunnel awaits an enchanted bathhouse."),
    ("Parasite", "movie", 2019, 8.5, "2h 12m", "Bong Joon Ho", ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"], ["Drama", "Thriller", "Comedy"], "Korean", ["thriller", "mind-bending", "comedy"], "Greed and class discrimination threaten the symbiotic relationship between the wealthy Parks and destitute Kims.", "Act like you own the place."),
    ("Past Lives", "movie", 2023, 8.4, "1h 45m", "Celine Song", ["Greta Lee", "Teo Yoo", "John Magaro"], ["Romance", "Drama"], "Korean", ["romance", "emotional"], "Two childhood friends are reunited in New York as they confront notions of destiny, love, and life choices.", "In-Yun connects soulmates across lifetimes."),
    ("Amélie", "movie", 2001, 8.3, "2h 02m", "Jean-Pierre Jeunet", ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"], ["Romance", "Comedy"], "French", ["feel-good", "romance", "comedy"], "An innocent and naive girl in Paris decides to help those around her and discovers unexpected love.", "She'll change your life."),
    ("Portrait of a Lady on Fire", "movie", 2019, 8.1, "2h 02m", "Céline Sciamma", ["Noémie Merlant", "Adèle Haenel", "Luàna Bajrami"], ["Romance", "Drama"], "French", ["romance", "emotional"], "In 18th-century Brittany, a female painter is commissioned to paint a wedding portrait in secret.", "Do not regret. Remember."),
    ("RRR", "movie", 2022, 8.0, "3h 07m", "S.S. Rajamouli", ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt"], ["Action", "Drama", "Adventure"], "Hindi", ["feel-good", "thriller"], "A fearless revolutionary and an officer in the British force unite to forge a path toward legendary freedom.", "Rise. Roar. Revolt."),
    ("3 Idiots", "movie", 2009, 8.4, "2h 50m", "Rajkumar Hirani", ["Aamir Khan", "Madhavan", "Sharman Joshi"], ["Comedy", "Drama"], "Hindi", ["feel-good", "comedy", "emotional"], "Two friends search for their long-lost companion while reminiscing about their college days.", "All is well."),
    ("Pan's Labyrinth", "movie", 2006, 8.2, "1h 58m", "Guillermo del Toro", ["Ivana Baquero", "Sergi López", "Maribel Verdú"], ["Fantasy", "Drama", "Mystery"], "Spanish", ["emotional", "thriller", "mind-bending"], "In 1944 Spain, a young girl escapes into an eerie and captivating fantasy world with an ancient faun.", "Innocence has a power evil cannot imagine."),
    ("Knives Out", "movie", 2019, 7.9, "2h 10m", "Rian Johnson", ["Daniel Craig", "Ana de Armas", "Chris Evans"], ["Comedy", "Crime", "Mystery"], "English", ["comedy", "thriller"], "A detective investigates the mysterious death of the patriarch of an eccentric and combative family.", "Hell, any of them could have done it."),
    ("Paddington 2", "movie", 2017, 7.8, "1h 43m", "Paul King", ["Ben Whishaw", "Hugh Grant", "Sally Hawkins"], ["Comedy", "Adventure", "Animation"], "English", ["feel-good", "comedy"], "Paddington picks up a series of odd jobs to buy the perfect pop-up book for his aunt's 100th birthday.", "If we are kind and polite, the world will be right."),

    # Web Series
    ("Breaking Bad", "tv", 2008, 9.5, "5 Seasons", "Vince Gilligan", ["Bryan Cranston", "Aaron Paul", "Anna Gunn"], ["Crime", "Drama", "Thriller"], "English", ["thriller", "emotional"], "A chemistry teacher diagnosed with terminal cancer teams up with a former student to manufacture crystal meth.", "Remember my name."),
    ("Severance", "tv", 2022, 8.7, "2 Seasons", "Ben Stiller, Aoife McArdle", ["Adam Scott", "Patricia Arquette", "John Turturro"], ["Sci-Fi", "Thriller", "Mystery"], "English", ["mind-bending", "thriller"], "Mark leads a team whose memories have been surgically divided between their work and personal lives.", "Please do not attempt to remember yourself outside Lumon."),
    ("The Bear", "tv", 2022, 8.6, "3 Seasons", "Christopher Storer", ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri"], ["Drama", "Comedy"], "English", ["emotional", "comedy"], "A young chef from the fine dining world comes home to Chicago to run his family's Italian beef sandwich shop.", "Every second counts."),
    ("Dark", "tv", 2017, 8.7, "3 Seasons", "Baran bo Odar", ["Louis Hofmann", "Oliver Masucci", "Karoline Eichhorn"], ["Sci-Fi", "Mystery", "Drama"], "German", ["mind-bending", "thriller"], "A missing child sets four families on a frantic hunt as they unearth a mystery spanning three generations.", "The question is not where, but when."),
    ("Arcane", "tv", 2021, 9.0, "2 Seasons", "Christian Linke, Alex Yee", ["Hailee Steinfeld", "Ella Purnell", "Kevin Alejandro"], ["Animation", "Action", "Sci-Fi"], "English", ["emotional", "thriller"], "Set in utopian Piltover and oppressed Zaun, the story follows the origins of two iconic champions.", "Every hero has a beginning. Every villain has a reason."),
    ("Chernobyl", "tv", 2019, 9.3, "1 Season", "Craig Mazin, Johan Renck", ["Jared Harris", "Stellan Skarsgård", "Emily Watson"], ["Drama", "Thriller", "Mystery"], "English", ["thriller", "emotional"], "In April 1986, an explosion at Chernobyl becomes one of the world's worst man-made catastrophes.", "What is the cost of lies?"),
    ("Succession", "tv", 2018, 8.9, "4 Seasons", "Jesse Armstrong", ["Brian Cox", "Jeremy Strong", "Sarah Snook"], ["Drama", "Comedy"], "English", ["comedy", "emotional", "thriller"], "The Roy family controls the biggest media conglomerate in the world, fighting for power when their father steps down.", "Fight for the throne."),
    ("Stranger Things", "tv", 2016, 8.7, "4 Seasons", "The Duffer Brothers", ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"], ["Sci-Fi", "Drama", "Mystery"], "English", ["thriller", "feel-good"], "When a young boy vanishes, a small town uncovers secret experiments, supernatural forces and one strange girl.", "One summer can change everything."),
    ("Shōgun", "tv", 2024, 8.7, "1 Season", "Rachel Kondo, Justin Marks", ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai"], ["Drama", "Adventure", "History"], "Japanese", ["thriller", "mind-bending"], "In Japan in 1600, Lord Yoshii Toranaga fights for his life as his enemies on the Council of Regents unite against him.", "Fate is a storm."),
    ("Squid Game", "tv", 2021, 8.0, "2 Seasons", "Hwang Dong-hyuk", ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon"], ["Action", "Drama", "Mystery"], "Korean", ["thriller", "mind-bending"], "Hundreds of cash-strapped players accept an invitation to compete in children's games with deadly stakes.", "45.6 billion won is child's play."),
    ("The Wire", "tv", 2002, 9.3, "5 Seasons", "David Simon", ["Dominic West", "Lance Reddick", "Idris Elba"], ["Crime", "Drama", "Thriller"], "English", ["emotional", "thriller"], "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.", "Listen carefully."),
    ("The Sopranos", "tv", 1999, 9.2, "6 Seasons", "David Chase", ["James Gandolfini", "Lorraine Bracco", "Edie Falco"], ["Crime", "Drama"], "English", ["thriller", "comedy", "emotional"], "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and crime family.", "Family. Business. Therapy."),
    ("Game of Thrones", "tv", 2011, 9.2, "8 Seasons", "David Benioff, D.B. Weiss", ["Emilia Clarke", "Peter Dinklage", "Kit Harington"], ["Action", "Adventure", "Drama"], "English", ["thriller", "emotional"], "Nine noble families fight for control over Westeros, while an ancient enemy returns after being dormant for millennia.", "Winter is Coming."),
    ("Fleabag", "tv", 2016, 8.7, "2 Seasons", "Phoebe Waller-Bridge", ["Phoebe Waller-Bridge", "Sian Clifford", "Andrew Scott"], ["Comedy", "Drama"], "English", ["comedy", "emotional", "romance"], "A dry-witted woman navigates life and love in London while trying to cope with tragedy.", "This is a love story."),
    ("Ted Lasso", "tv", 2020, 8.8, "3 Seasons", "Bill Lawrence, Jason Sudeikis", ["Jason Sudeikis", "Hannah Waddingham", "Brett Goldstein"], ["Comedy", "Drama"], "English", ["feel-good", "comedy"], "An American college football coach is hired to manage a British soccer team with relentless optimism.", "Kindness makes a comeback.")
]

CINEMA_TEMPLATES = [
    ("The Chronicles of {entity}", "movie", ["Adventure", "Fantasy", "Action"], ["thriller", "feel-good"], "An epic journey into uncharted lands where ancient legends awaken to contest the throne.", "Destiny awaits beyond the horizon."),
    ("{city} Nights", "movie", ["Drama", "Crime", "Thriller"], ["thriller", "emotional"], "Under the neon lights of {city}, an investigator races against time to untangle an impossible conspiracy.", "In the shadows, the truth is blinding."),
    ("Echoes of {concept}", "movie", ["Sci-Fi", "Mystery", "Drama"], ["mind-bending", "emotional"], "A scientist stumbles upon transmission remnants that reveal a hidden timeline running parallel to our own.", "Time is not a straight line."),
    ("Beyond the {celestial}", "movie", ["Sci-Fi", "Adventure"], ["mind-bending", "thriller"], "Deep space explorers venture through a quantum gateway, only to face their deepest fears in the silent void.", "In deep space, memory is gravity."),
    ("The Last {profession}", "movie", ["Drama", "History"], ["emotional", "thriller"], "A master artisan fights against the tide of industrial change to protect a sacred family heritage.", "Pride cannot be manufactured."),
    ("Whispers in {setting}", "movie", ["Mystery", "Thriller"], ["thriller", "mind-bending"], "A detective uncovers secrets that the townsfolk have buried for forty years beneath the frozen lakes.", "The quietest places hide the loudest secrets."),
    ("Letters from {location}", "movie", ["Romance", "Drama"], ["romance", "emotional"], "Decades after a heartbreaking farewell, a box of unsent letters surfaces to reunite two separated hearts.", "Some loves refuse to be forgotten."),
    ("A Summer in {location}", "movie", ["Comedy", "Romance"], ["feel-good", "comedy", "romance"], "An unexpected holiday detour sparks laughter, eccentric friendships, and a whirlwind summer romance.", "Find yourself where you least expect it."),
    ("Project {code}", "movie", ["Action", "Sci-Fi", "Thriller"], ["thriller", "mind-bending"], "When an artificial intelligence protocol breaches containment, an elite squad has twelve hours to intervene.", "Humanity's greatest invention is their final test."),
    ("The Secret of {entity}", "movie", ["Animation", "Family", "Adventure"], ["feel-good", "comedy"], "A curious young adventurer and a magical companion embark on a journey across enchanted floating islands.", "Wonder is just around the corner."),
    ("The {profession} of {city}", "movie", ["Drama", "Crime"], ["thriller", "emotional"], "A seasoned specialist is called in for one final assignment before hanging up their boots for good.", "Every master meets their match."),
    ("Shadows over {city}", "movie", ["Crime", "Mystery", "Thriller"], ["thriller", "mind-bending"], "A labyrinthine noir tale unraveling corrupt municipal syndicates and elusive vigilantes.", "Truth is a luxury few can afford."),
    ("Tears of {entity}", "movie", ["Drama", "Romance"], ["romance", "emotional"], "An intimate saga tracing two artists who meet by chance in the countryside during a tumultuous autumn.", "Art demands everything, including love."),
    ("The {concept} Paradox", "movie", ["Sci-Fi", "Thriller"], ["mind-bending", "thriller"], "Theoretical physicists accidentally open a tear in reality, causing memories from alternate lifetimes to collide.", "Every choice echoes in another world."),

    # Web Series
    ("The {profession} Files", "tv", ["Crime", "Drama", "Mystery"], ["thriller", "mind-bending"], "An investigative unit unravels high-profile cold cases that powerful syndicates attempted to erase.", "No crime remains in the dark forever."),
    ("Chronicles of {city}", "tv", ["Drama", "Crime"], ["emotional", "thriller"], "A gripping generational saga charting the rise of competing merchant dynasties in the heart of {city}.", "Power is taken, never granted."),
    ("{concept} Protocol", "tv", ["Sci-Fi", "Thriller"], ["mind-bending", "thriller"], "Secret agents equipped with memory-altering tech uncover a clandestine global network altering world history.", "Your past is compromised."),
    ("The Heart of {location}", "tv", ["Comedy", "Drama"], ["feel-good", "comedy"], "The heartwarming, chaotic misadventures of an eccentric family running a community establishment.", "Home is where the chaos is."),
    ("Kingdom of {entity}", "tv", ["Action", "Adventure", "Fantasy"], ["thriller", "emotional"], "Feuding royal houses clash in an epic war of thrones, magic, and political betrayal.", "Honor has a steep price."),
    ("Detective from {city}", "tv", ["Mystery", "Crime", "Drama"], ["thriller", "emotional"], "A brooding investigator with an unmatched memory solves the most baffling crimes of the capital.", "The details never lie."),
    ("Station {code}", "tv", ["Sci-Fi", "Mystery"], ["mind-bending", "thriller"], "A remote research outpost in the Antarctic makes contact with an ancient subterranean energy source.", "We are not alone down here.")
]

ENTITIES = ["Aethelgard", "Elysium", "Valhalla", "Shadows", "Fire and Ice", "the North", "Starlight", "the Cosmos", "the Silk Road", "Oblivion", "the Oracle", "Midnight", "Winter", "Solitude", "the Abyss", "the Citadel", "Tomorrow", "Eternity", "the Red Planet", "Atlantis", "the Dawn", "Avalon", "Hyperion", "Tartarus"]
CITIES = ["Tokyo", "Seoul", "Paris", "Berlin", "London", "New York", "Madrid", "Mumbai", "Chicago", "Kyoto", "Barcelona", "Rome", "Hong Kong", "Vienna", "Amsterdam", "Los Angeles", "Prague", "Stockholm", "San Francisco"]
CONCEPTS = ["Silence", "Memory", "Eternity", "Infinity", "Light", "Shadow", "Destiny", "Gravity", "Illusions", "Consciousness", "Paradox", "Resonance", "Time", "Reflections"]
CELESTIALS = ["Horizon", "Event Horizon", "Solar Ring", "Nebula", "Singularity", "Galaxy", "Supernova", "Cosmic Rift", "Orion", "Andromeda", "Pulsar", "Quasar"]
PROFESSIONS = ["Samurai", "Detective", "Watchmaker", "Alchemist", "Cartographer", "Archivist", "Astronaut", "Surgeon", "Chef", "Diplomat", "Navigator", "Pianist", "Sculptor", "Astronomer"]
SETTINGS = ["the Pines", "the Valley", "the High Peaks", "the Deep Sea", "the Dunes", "the Catacombs", "the Mist", "the Redwoods", "the Tundra", "the Badlands"]
LOCATIONS = ["Provence", "Kyoto", "Seville", "Florence", "Jeju Island", "Havana", "Reykjavik", "Edinburgh", "Venice", "Santorini", "Zurich", "Lisbon", "Bavaria"]
CODES = ["Genesis", "Aegis", "Prometheus", "Valkyrie", "Titan", "Icarus", "Aurora", "Omega", "Chronos", "Eclipse", "Aura", "Zenith", "Apex"]

COUNTRIES_DIST = [
    ("English", 0.60),
    ("Korean", 0.08),
    ("Japanese", 0.08),
    ("French", 0.07),
    ("Spanish", 0.07),
    ("Hindi", 0.06),
    ("German", 0.04)
]

all_titles = []
seen_titles = set()

for title, m_type, year, rating, runtime, director, cast, genres, lang, moods, syn, tag in PREMIER_RECORDS:
    seen_titles.add(title)
    all_titles.append({
        "title": title,
        "type": m_type,
        "releaseYear": year,
        "rating": rating,
        "runtime": runtime,
        "director": director,
        "cast": cast,
        "genres": genres,
        "language": lang,
        "moodTags": moods,
        "synopsis": syn,
        "tagline": tag,
        "voteCount": random.randint(120000, 2500000),
        "featured": len(all_titles) == 0,
        "trending": len(all_titles) < 15,
        "popular": len(all_titles) < 30
    })

TARGET_COUNT = 1050

while len(all_titles) < TARGET_COUNT:
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

    base_title = template.format(
        entity=entity, city=city, concept=concept, celestial=celestial,
        profession=profession, setting=setting, location=location, code=code
    )

    title = base_title
    if title in seen_titles:
        suffix = random.choice(["Part II", "Chapter 2", "The Return", "Origins", "Revisited", "Legacy", "Reckoning"])
        title = f"{title}: {suffix}"
    if title in seen_titles:
        title = f"{title} ({random.randint(1980, 2024)})"

    seen_titles.add(title)

    year = random.randint(1968, 2024)
    rating = round(random.uniform(7.2, 9.1), 1)
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
        "voteCount": random.randint(45000, 1100000),
        "featured": False,
        "trending": random.random() < 0.08,
        "popular": random.random() < 0.20
    })

# Add deterministic poster and backdrop paths
for i, t in enumerate(all_titles):
    t["posterPath"] = POSTERS[i % len(POSTERS)]
    t["backdropPath"] = BACKDROPS[i % len(BACKDROPS)]
    t["externalProviderId"] = f"tmdb-{100000 + i}"

all_titles[0]["featured"] = True

# Write to Backend/src/data/sampleTitles.js
backend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/Backend/src/data/sampleTitles.js"
with open(backend_output_path, "w", encoding="utf-8") as f:
    f.write("/**\n * Master Catalog of 1000+ Acclaimed Movies and Web Series for CineLog\n */\n")
    f.write("export const SAMPLE_TITLES = ")
    json.dump(all_titles, f, indent=2, ensure_ascii=False)
    f.write(";\n")

print(f"Successfully generated {len(all_titles)} titles for Backend at {backend_output_path}")

# Write to FrontEnd/src/data/movies.js
frontend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/FrontEnd/src/data/movies.js"
with open(frontend_output_path, "w", encoding="utf-8") as f:
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
    
    frontend_movies = []
    for i, t in enumerate(all_titles):
        num = (i + 1) if (i + 1) < 99 else (i + 2)
        frontend_movies.append({
            "id": f"66400000000000000000{str(num).zfill(4)}",
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
    json.dump(frontend_movies[0], f, indent=2, ensure_ascii=False)
    f.write(";\n\n")

    f.write("export const SAMPLE_MOVIES = ")
    json.dump(frontend_movies, f, indent=2, ensure_ascii=False)
    f.write(";\n")

print(f"Successfully generated {len(frontend_movies)} titles for FrontEnd at {frontend_output_path}")
