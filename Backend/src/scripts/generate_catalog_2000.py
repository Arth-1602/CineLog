import json
import random

random.seed(42)

# =====================================================================
# ACCLAIMED & WORLD-FAMOUS TITLES (MOVIES & WEB SERIES)
# =====================================================================
FAMOUS_TITLES = [
    # --- MCU & MARVEL MOVIES ---
    ("The Avengers", "movie", 2012, 8.0, "2h 23m", "Joss Whedon", ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"], ["Action", "Sci-Fi", "Adventure"], "English", ["feel-good", "thriller"], "Earth's mightiest heroes must come together and learn to fight as a team to stop Loki and an alien invasion.", "Avengers Assemble."),
    ("Avengers: Endgame", "movie", 2019, 8.4, "3h 01m", "Anthony Russo, Joe Russo", ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"], ["Action", "Sci-Fi", "Drama"], "English", ["emotional", "thriller"], "After the devastating events of Infinity War, the remaining Avengers assemble once more to reverse Thanos' actions.", "Part of the journey is the end."),
    ("Avengers: Infinity War", "movie", 2018, 8.4, "2h 29m", "Anthony Russo, Joe Russo", ["Robert Downey Jr.", "Chris Hemsworth", "Josh Brolin"], ["Action", "Sci-Fi", "Adventure"], "English", ["thriller", "emotional"], "The Avengers and their allies must sacrifice all in an attempt to defeat Thanos before his blitz of devastation.", "An entire universe. Once and for all."),
    ("Avengers: Age of Ultron", "movie", 2015, 7.3, "2h 21m", "Joss Whedon", ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], ["Action", "Sci-Fi", "Adventure"], "English", ["thriller", "feel-good"], "Tony Stark and Bruce Banner inadvertently create Ultron, an artificial intelligence bent on human extinction.", "A new age begins."),
    ("Iron Man", "movie", 2008, 7.9, "2h 06m", "Jon Favreau", ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"], ["Action", "Sci-Fi", "Adventure"], "English", ["feel-good", "thriller"], "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor.", "Heroes aren't born. They're built."),
    ("Iron Man 2", "movie", 2010, 7.0, "2h 04m", "Jon Favreau", ["Robert Downey Jr.", "Mickey Rourke", "Gwyneth Paltrow"], ["Action", "Sci-Fi", "Adventure"], "English", ["feel-good", "thriller"], "With the world now aware of his identity as Iron Man, Tony Stark must contend with his declining health and a vengeful madman.", "It's not about the armor. It's about what's inside."),
    ("Iron Man 3", "movie", 2013, 7.1, "2h 10m", "Shane Black", ["Robert Downey Jr.", "Guy Pearce", "Gwyneth Paltrow"], ["Action", "Sci-Fi", "Adventure"], "English", ["thriller", "feel-good"], "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding.", "Unleash the power."),
    ("Captain America: The Winter Soldier", "movie", 2014, 7.8, "2h 16m", "Anthony Russo, Joe Russo", ["Chris Evans", "Samuel L. Jackson", "Scarlett Johansson"], ["Action", "Sci-Fi", "Thriller"], "English", ["thriller", "mind-bending"], "Steve Rogers struggles to embrace his role in the modern world while teaming up with Black Widow to battle a shadowy assassin.", "In heroes we trust."),
    ("Captain America: Civil War", "movie", 2016, 7.8, "2h 27m", "Anthony Russo, Joe Russo", ["Chris Evans", "Robert Downey Jr.", "Scarlett Johansson"], ["Action", "Sci-Fi", "Drama"], "English", ["thriller", "emotional"], "Political involvement in the Avengers' affairs causes a rift between former allies Captain America and Iron Man.", "Divided we fall."),
    ("Thor: Ragnarok", "movie", 2017, 7.9, "2h 10m", "Taika Waititi", ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett"], ["Action", "Adventure", "Comedy"], "English", ["comedy", "feel-good"], "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök.", "No hammer. No problem."),
    ("Black Panther", "movie", 2018, 7.3, "2h 14m", "Ryan Coogler", ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"], ["Action", "Sci-Fi", "Adventure"], "English", ["thriller", "emotional"], "T'Challa, heir to the hidden kingdom of Wakanda, must step forward to lead his people and confront a challenger from his father's past.", "Long live the King."),
    ("Guardians of the Galaxy", "movie", 2014, 8.0, "2h 01m", "James Gunn", ["Chris Pratt", "Zoe Saldana", "Dave Bautista"], ["Action", "Adventure", "Comedy"], "English", ["feel-good", "comedy"], "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.", "When things get bad, they'll do their worst."),
    ("Guardians of the Galaxy Vol. 3", "movie", 2023, 7.9, "2h 30m", "James Gunn", ["Chris Pratt", "Chukwudi Iwuji", "Bradley Cooper"], ["Action", "Adventure", "Sci-Fi"], "English", ["emotional", "comedy"], "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.", "Once more with feeling."),
    ("Spider-Man: No Way Home", "movie", 2021, 8.2, "2h 28m", "Jon Watts", ["Tom Holland", "Zendaya", "Benedict Cumberbatch"], ["Action", "Adventure", "Sci-Fi"], "English", ["emotional", "mind-bending"], "With Spider-Man's identity revealed, Peter asks Doctor Strange for help, tearing a hole in reality and releasing multiverse villains.", "The multiverse unleashed."),
    ("Spider-Man: Into the Spider-Verse", "movie", 2018, 8.4, "1h 57m", "Bob Persichetti, Peter Ramsey, Rodney Rothman", ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"], ["Animation", "Action", "Adventure"], "English", ["feel-good", "mind-bending"], "Teen Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from parallel dimensions to stop a threat to all reality.", "Anyone can wear the mask."),
    ("Spider-Man: Across the Spider-Verse", "movie", 2023, 8.6, "2h 20m", "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson", ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"], ["Animation", "Action", "Adventure"], "English", ["mind-bending", "emotional"], "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.", "It's how you wear the mask that matters."),
    ("Deadpool", "movie", 2016, 8.0, "1h 48m", "Tim Miller", ["Ryan Reynolds", "Morena Baccarin", "T.J. Miller"], ["Action", "Comedy"], "English", ["comedy", "thriller"], "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.", "With great power comes great irresponsibility."),
    ("Deadpool & Wolverine", "movie", 2024, 7.7, "2h 08m", "Shawn Levy", ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"], ["Action", "Comedy", "Sci-Fi"], "English", ["comedy", "feel-good"], "Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool, uniting to defeat a common enemy.", "Come together."),
    ("Logan", "movie", 2017, 8.1, "2h 17m", "James Mangold", ["Hugh Jackman", "Patrick Stewart", "Dafne Keen"], ["Action", "Drama", "Sci-Fi"], "English", ["emotional", "thriller"], "In a future where mutants are nearly extinct, an aging Logan cares for Charles Xavier in a hideout on the Mexican border.", "His time has come."),
    ("Doctor Strange", "movie", 2016, 7.5, "1h 55m", "Scott Derrickson", ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams"], ["Action", "Adventure", "Fantasy"], "English", ["mind-bending", "thriller"], "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.", "Open your mind. Change your reality."),

    # --- DC & BATMAN ---
    ("The Dark Knight", "movie", 2008, 9.0, "2h 32m", "Christopher Nolan", ["Christian Bale", "Heath Ledger", "Aaron Eckhart"], ["Action", "Crime", "Drama"], "English", ["thriller", "mind-bending"], "When the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", "Why so serious?"),
    ("Batman Begins", "movie", 2005, 8.2, "2h 20m", "Christopher Nolan", ["Christian Bale", "Michael Caine", "Liam Neeson"], ["Action", "Crime", "Drama"], "English", ["thriller", "emotional"], "After training with his mentor, Bruce Wayne begins his fight to free crime-ridden Gotham City from corruption.", "Evil does not sleep."),
    ("The Dark Knight Rises", "movie", 2012, 8.4, "2h 44m", "Christopher Nolan", ["Christian Bale", "Tom Hardy", "Anne Hathaway"], ["Action", "Drama", "Thriller"], "English", ["thriller", "emotional"], "Eight years after the Joker's reign of anarchy, Batman is forced from his exile by the brutal terrorist Bane.", "The legend ends."),
    ("The Batman", "movie", 2022, 7.8, "2h 56m", "Matt Reeves", ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"], ["Action", "Crime", "Drama"], "English", ["thriller", "mind-bending"], "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer.", "Unmask the truth."),
    ("Joker", "movie", 2019, 8.4, "2h 02m", "Todd Phillips", ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"], ["Crime", "Drama", "Thriller"], "English", ["emotional", "mind-bending"], "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City.", "Put on a happy face."),
    ("Zack Snyder's Justice League", "movie", 2021, 7.9, "4h 02m", "Zack Snyder", ["Ben Affleck", "Henry Cavill", "Gal Gadot"], ["Action", "Adventure", "Fantasy"], "English", ["thriller", "emotional"], "Determined to ensure Superman's sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince to recruit a team of metahumans.", "For Darkseid. For Earth."),
    ("Watchmen", "movie", 2009, 7.6, "2h 42m", "Zack Snyder", ["Jackie Earle Haley", "Patrick Wilson", "Billy Crudup"], ["Action", "Drama", "Mystery"], "English", ["mind-bending", "thriller"], "In an alternate 1985 America, costumed superheroes are part of daily society, and a vigilante investigates a conspiracy against retired heroes.", "Who watches the Watchmen?"),
    ("V for Vendetta", "movie", 2005, 8.2, "2h 12m", "James McTeigue", ["Hugo Weaving", "Natalie Portman", "Rupert Graves"], ["Action", "Drama", "Sci-Fi"], "English", ["thriller", "emotional"], "In a future British dystopian society, a shadowy freedom fighter known only by the alias of 'V' plots to overthrow the tyrannical government.", "Remember, remember the 5th of November."),

    # --- NOLAN MASTERPIECES ---
    ("Oppenheimer", "movie", 2023, 8.9, "3h 00m", "Christopher Nolan", ["Cillian Murphy", "Emily Blunt", "Matt Damon"], ["Biography", "Drama", "History"], "English", ["thriller", "emotional"], "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.", "The world forever changes."),
    ("Interstellar", "movie", 2014, 8.7, "2h 49m", "Christopher Nolan", ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], ["Sci-Fi", "Drama", "Adventure"], "English", ["mind-bending", "emotional"], "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", "Mankind was born on Earth. It was never meant to die here."),
    ("Inception", "movie", 2010, 8.8, "2h 28m", "Christopher Nolan", ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"], ["Sci-Fi", "Action", "Thriller"], "English", ["mind-bending", "thriller"], "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "Your mind is the scene of the crime."),
    ("The Prestige", "movie", 2006, 8.5, "2h 10m", "Christopher Nolan", ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"], ["Drama", "Mystery", "Sci-Fi"], "English", ["mind-bending", "thriller"], "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything.", "Are you watching closely?"),
    ("Memento", "movie", 2000, 8.4, "1h 53m", "Christopher Nolan", ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano"], ["Mystery", "Thriller"], "English", ["mind-bending", "thriller"], "A man with short-term memory loss attempts to track down his wife's murderer using photographs and tattoos.", "Some memories are best forgotten."),
    ("Dunkirk", "movie", 2017, 7.8, "1h 46m", "Christopher Nolan", ["Fionn Whitehead", "Tom Glynn-Carney", "Jack Lowden"], ["Action", "Drama", "History"], "English", ["thriller", "emotional"], "Allied soldiers from Belgium, the British Commonwealth and France are surrounded by the German Army on Dunkirk beaches.", "Survival is victory."),
    ("Tenet", "movie", 2020, 7.3, "2h 30m", "Christopher Nolan", ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"], ["Action", "Sci-Fi", "Thriller"], "English", ["mind-bending", "thriller"], "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of espionage.", "Time runs out."),

    # --- DENIS VILLENEUVE ---
    ("Dune: Part Two", "movie", 2024, 8.8, "2h 46m", "Denis Villeneuve", ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], ["Sci-Fi", "Adventure", "Action"], "English", ["mind-bending", "thriller"], "Paul Atreides unites with Chani and the Fremen to wage war against the conspirators who destroyed his family.", "Long live the fighters."),
    ("Dune", "movie", 2021, 8.0, "2h 35m", "Denis Villeneuve", ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"], ["Sci-Fi", "Adventure", "Drama"], "English", ["mind-bending", "thriller"], "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset on an inhospitable desert planet.", "Beyond fear, destiny awaits."),
    ("Blade Runner 2049", "movie", 2017, 8.0, "2h 44m", "Denis Villeneuve", ["Ryan Gosling", "Harrison Ford", "Ana de Armas"], ["Sci-Fi", "Mystery", "Drama"], "English", ["mind-bending", "emotional"], "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, missing for thirty years.", "There's still a little of one of us in everyone."),
    ("Arrival", "movie", 2016, 7.9, "1h 56m", "Denis Villeneuve", ["Amy Adams", "Jeremy Renner", "Forest Whitaker"], ["Sci-Fi", "Drama", "Mystery"], "English", ["mind-bending", "emotional"], "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.", "Why are they here?"),
    ("Sicario", "movie", 2015, 7.6, "2h 01m", "Denis Villeneuve", ["Emily Blunt", "Benicio Del Toro", "Josh Brolin"], ["Action", "Crime", "Drama"], "English", ["thriller", "emotional"], "An idealistic FBI agent is enlisted by an elite government task force to aid in the escalating war against drugs at the border area.", "The border is just a line on a map."),
    ("Prisoners", "movie", 2013, 8.1, "2h 33m", "Denis Villeneuve", ["Hugh Jackman", "Jake Gyllenhaal", "Viola Davis"], ["Crime", "Drama", "Mystery"], "English", ["thriller", "emotional"], "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads.", "Every moment counts."),

    # --- TARANTINO CLASSICS ---
    ("Pulp Fiction", "movie", 1994, 8.9, "2h 34m", "Quentin Tarantino", ["John Travolta", "Uma Thurman", "Samuel L. Jackson"], ["Crime", "Drama"], "English", ["thriller", "comedy"], "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "Just because you are a character doesn't mean you have character."),
    ("Inglourious Basterds", "movie", 2009, 8.4, "2h 33m", "Quentin Tarantino", ["Brad Pitt", "Christoph Waltz", "Mélanie Laurent"], ["Adventure", "Drama", "War"], "English", ["thriller", "comedy"], "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theater owner's plan.", "Once upon a time in Nazi-occupied France..."),
    ("Django Unchained", "movie", 2012, 8.5, "2h 45m", "Quentin Tarantino", ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"], ["Drama", "Western"], "English", ["thriller", "feel-good"], "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.", "Life, liberty and the pursuit of vengeance."),
    ("Reservoir Dogs", "movie", 1992, 8.3, "1h 39m", "Quentin Tarantino", ["Harvey Keitel", "Tim Roth", "Michael Madsen"], ["Crime", "Thriller"], "English", ["thriller", "comedy"], "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.", "Let's go to work."),
    ("Kill Bill: Vol. 1", "movie", 2003, 8.2, "1h 51m", "Quentin Tarantino", ["Uma Thurman", "Lucy Liu", "Vivica A. Fox"], ["Action", "Crime", "Thriller"], "English", ["thriller", "feel-good"], "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.", "A roaring rampage of revenge."),
    ("Kill Bill: Vol. 2", "movie", 2004, 8.0, "2h 17m", "Quentin Tarantino", ["Uma Thurman", "David Carradine", "Michael Madsen"], ["Action", "Crime", "Thriller"], "English", ["thriller", "emotional"], "The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous Elle Driver.", "The bride is back."),
    ("Once Upon a Time in Hollywood", "movie", 2019, 7.6, "2h 41m", "Quentin Tarantino", ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"], ["Comedy", "Drama"], "English", ["comedy", "feel-good"], "A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age.", "In 1969, the golden age of cinema changed forever."),

    # --- MARTIN SCORSESE ---
    ("The Wolf of Wall Street", "movie", 2013, 8.2, "3h 00m", "Martin Scorsese", ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"], ["Biography", "Comedy", "Crime"], "English", ["comedy", "thriller"], "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime and corruption.", "EARN. SPEND. PARTY."),
    ("Goodfellas", "movie", 1990, 8.7, "2h 25m", "Martin Scorsese", ["Robert De Niro", "Ray Liotta", "Joe Pesci"], ["Crime", "Drama"], "English", ["thriller", "comedy"], "The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners.", "As far back as I can remember, I always wanted to be a gangster."),
    ("Taxi Driver", "movie", 1976, 8.2, "1h 54m", "Martin Scorsese", ["Robert De Niro", "Jodie Foster", "Cybill Shepherd"], ["Crime", "Drama"], "English", ["emotional", "thriller"], "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence fuels his urge for violent action.", "On every street in every city, there's a nobody who dreams of being a somebody."),
    ("The Departed", "movie", 2006, 8.5, "2h 31m", "Martin Scorsese", ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"], ["Crime", "Drama", "Thriller"], "English", ["thriller", "emotional"], "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.", "Lies. Betrayal. Sacrifice. How far will you go?"),
    ("Shutter Island", "movie", 2010, 8.2, "2h 18m", "Martin Scorsese", ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"], ["Mystery", "Thriller"], "English", ["mind-bending", "thriller"], "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", "Some places never let you go."),
    ("Casino", "movie", 1995, 8.2, "2h 58m", "Martin Scorsese", ["Robert De Niro", "Sharon Stone", "Joe Pesci"], ["Crime", "Drama"], "English", ["thriller", "emotional"], "In early-1970s Las Vegas, low-key mobster Sam 'Ace' Rothstein gets tapped by his bosses to head the Tangiers Casino.", "No one stays on top forever."),
    ("Raging Bull", "movie", 1980, 8.1, "2h 09m", "Martin Scorsese", ["Robert De Niro", "Cathy Moriarty", "Joe Pesci"], ["Biography", "Drama", "Sport"], "English", ["emotional", "thriller"], "The life of boxer Jake LaMotta, whose violence and temper that lead him to the top in the ring destroy his life outside it.", "Through triumph and tragedy."),

    # --- DAVID FINCHER ---
    ("Fight Club", "movie", 1999, 8.8, "2h 19m", "David Fincher", ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"], ["Drama", "Thriller"], "English", ["mind-bending", "thriller"], "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", "Mischief. Mayhem. Soap."),
    ("Se7en", "movie", 1995, 8.6, "2h 07m", "David Fincher", ["Morgan Freeman", "Brad Pitt", "Kevin Spacey"], ["Crime", "Drama", "Mystery"], "English", ["thriller", "mind-bending"], "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", "Seven deadly sins. Seven ways to die."),
    ("The Social Network", "movie", 2010, 7.8, "2h 00m", "David Fincher", ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"], ["Biography", "Drama"], "English", ["emotional", "thriller"], "As Harvard student Mark Zuckerberg creates the social networking site that would become Facebook, he is sued by the twins who claimed he stole their idea.", "You don't get to 500 million friends without making a few enemies."),
    ("Gone Girl", "movie", 2014, 8.1, "2h 29m", "David Fincher", ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris"], ["Drama", "Mystery", "Thriller"], "English", ["thriller", "mind-bending"], "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected he may not be innocent.", "You don't know what you've got 'til it's..."),
    ("Zodiac", "movie", 2007, 7.7, "2h 37m", "David Fincher", ["Jake Gyllenhaal", "Mark Ruffalo", "Robert Downey Jr."], ["Crime", "Drama", "Mystery"], "English", ["thriller", "mind-bending"], "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer.", "There's more than one way to lose your life to a killer."),

    # --- ALL-TIME HOLLYWOOD CLASSICS & EPICS ---
    ("The Shawshank Redemption", "movie", 1994, 9.3, "2h 22m", "Frank Darabont", ["Tim Robbins", "Morgan Freeman"], ["Drama"], "English", ["emotional", "feel-good"], "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "Fear can hold you prisoner. Hope can set you free."),
    ("The Godfather", "movie", 1972, 9.2, "2h 55m", "Francis Ford Coppola", ["Marlon Brando", "Al Pacino", "James Caan"], ["Crime", "Drama"], "English", ["thriller", "emotional"], "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.", "An offer you can't refuse."),
    ("The Godfather Part II", "movie", 1974, 9.0, "3h 22m", "Francis Ford Coppola", ["Al Pacino", "Robert De Niro", "Robert Duvall"], ["Crime", "Drama"], "English", ["thriller", "emotional"], "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son Michael expands the family syndicate.", "All the power on earth can't change destiny."),
    ("Forrest Gump", "movie", 1994, 8.8, "2h 22m", "Robert Zemeckis", ["Tom Hanks", "Robin Wright", "Gary Sinise"], ["Drama", "Romance", "Comedy"], "English", ["feel-good", "emotional", "romance"], "The history of the United States unfolds from the perspective of an Alabama man with an IQ of 75.", "Life is like a box of chocolates."),
    ("The Matrix", "movie", 1999, 8.7, "2h 16m", "Lana Wachowski, Lilly Wachowski", ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"], ["Sci-Fi", "Action"], "English", ["mind-bending", "thriller"], "When a stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth of reality.", "Welcome to the Real World."),
    ("Schindler's List", "movie", 1993, 9.0, "3h 15m", "Steven Spielberg", ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"], ["Biography", "Drama", "History"], "English", ["emotional", "thriller"], "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.", "Whoever saves one life, saves the world entire."),
    ("Gladiator", "movie", 2000, 8.5, "2h 35m", "Ridley Scott", ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"], ["Action", "Adventure", "Drama"], "English", ["thriller", "emotional"], "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", "What we do in life echoes in eternity."),
    ("Saving Private Ryan", "movie", 1998, 8.6, "2h 49m", "Steven Spielberg", ["Tom Hanks", "Matt Damon", "Tom Sizemore"], ["Drama", "War"], "English", ["emotional", "thriller"], "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.", "The mission is a man."),
    ("Titanic", "movie", 1997, 7.9, "3h 14m", "James Cameron", ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"], ["Drama", "Romance"], "English", ["romance", "emotional"], "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", "Nothing on earth could come between them."),
    ("Jurassic Park", "movie", 1993, 8.2, "2h 07m", "Steven Spielberg", ["Sam Neill", "Laura Dern", "Jeff Goldblum"], ["Action", "Adventure", "Sci-Fi"], "English", ["feel-good", "thriller"], "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting kids after a power failure.", "An adventure 65 million years in the making."),
    ("The Silence of the Lambs", "movie", 1991, 8.6, "1h 58m", "Jonathan Demme", ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"], ["Crime", "Drama", "Thriller"], "English", ["thriller", "mind-bending"], "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", "To enter the mind of a killer she must challenge the mind of a madman."),
    ("12 Angry Men", "movie", 1957, 9.0, "1h 36m", "Sidney Lumet", ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"], ["Crime", "Drama"], "English", ["emotional", "thriller"], "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to consider the evidence.", "Life is in their hands. Death is on their minds."),
    ("Casablanca", "movie", 1942, 8.5, "1h 42m", "Michael Curtiz", ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"], ["Drama", "Romance", "War"], "English", ["romance", "emotional"], "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape.", "Here's looking at you, kid."),
    ("Psycho", "movie", 1960, 8.5, "1h 49m", "Alfred Hitchcock", ["Anthony Perkins", "Janet Leigh", "Vera Miles"], ["Horror", "Mystery", "Thriller"], "English", ["thriller", "mind-bending"], "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.", "A new - and altogether different - screen excitement!"),
    ("Alien", "movie", 1979, 8.5, "1h 57m", "Ridley Scott", ["Sigourney Weaver", "Tom Skerritt", "John Hurt"], ["Horror", "Sci-Fi"], "English", ["thriller", "mind-bending"], "The crew of a commercial spacecraft encounters a deadly lifeform after investigating a mysterious transmission of unknown origin.", "In space no one can hear you scream."),
    ("Aliens", "movie", 1986, 8.4, "2h 17m", "James Cameron", ["Sigourney Weaver", "Michael Biehn", "Carrie Henn"], ["Action", "Adventure", "Sci-Fi"], "English", ["thriller", "feel-good"], "Decades after surviving the Nostromo incident, Ellen Ripley is sent out to re-establish contact with a terraforming colony.", "This time it's war."),
    ("Terminator 2: Judgment Day", "movie", 1991, 8.6, "2h 17m", "James Cameron", ["Arnold Schwarzenegger", "Linda Hamilton", "Edward Furlong"], ["Action", "Sci-Fi"], "English", ["thriller", "feel-good"], "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from an even more advanced cyborg.", "It's nothing personal."),
    ("The Lord of the Rings: The Fellowship of the Ring", "movie", 2001, 8.9, "2h 58m", "Peter Jackson", ["Elijah Wood", "Ian McKellen", "Orlando Bloom"], ["Action", "Adventure", "Drama"], "English", ["feel-good", "thriller"], "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.", "One ring to rule them all."),
    ("The Lord of the Rings: The Two Towers", "movie", 2002, 8.8, "2h 59m", "Peter Jackson", ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"], ["Action", "Adventure", "Drama"], "English", ["thriller", "emotional"], "While Frodo and Sam edge closer to Mordor with the help of Gollum, the divided fellowship makes a stand against Sauron's new ally Saruman.", "A new power is rising."),
    ("The Lord of the Rings: The Return of the King", "movie", 2003, 9.0, "3h 21m", "Peter Jackson", ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"], ["Action", "Adventure", "Drama"], "English", ["emotional", "thriller"], "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", "The eye of the enemy is moving."),
    ("Star Wars: Episode V - The Empire Strikes Back", "movie", 1980, 8.7, "2h 04m", "Irvin Kershner", ["Mark Hamill", "Harrison Ford", "Carrie Fisher"], ["Action", "Adventure", "Fantasy"], "English", ["mind-bending", "thriller"], "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.", "The Adventure Continues..."),
    ("Back to the Future", "movie", 1985, 8.5, "1h 56m", "Robert Zemeckis", ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"], ["Adventure", "Comedy", "Sci-Fi"], "English", ["feel-good", "comedy"], "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.", "He's the only kid ever to get into trouble before he was born."),
    ("Whiplash", "movie", 2014, 8.5, "1h 47m", "Damien Chazelle", ["Miles Teller", "J.K. Simmons", "Melissa Benoist"], ["Drama", "Music"], "English", ["thriller", "emotional"], "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.", "The road to greatness can take you to the edge."),
    ("La La Land", "movie", 2016, 8.0, "2h 08m", "Damien Chazelle", ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"], ["Comedy", "Drama", "Music"], "English", ["romance", "feel-good", "emotional"], "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.", "Here's to the fools who dream."),
    ("Her", "movie", 2013, 8.0, "2h 06m", "Spike Jonze", ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson"], ["Drama", "Romance", "Sci-Fi"], "English", ["romance", "emotional"], "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.", "A Spike Jonze Love Story."),
    ("Eternal Sunshine of the Spotless Mind", "movie", 2004, 8.3, "1h 48m", "Michel Gondry", ["Jim Carrey", "Kate Winslet", "Kirsten Dunst"], ["Drama", "Romance", "Sci-Fi"], "English", ["mind-bending", "romance", "emotional"], "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.", "You can erase someone from your mind. Getting them out of your heart is another story."),

    # --- INTERNATIONAL & WORLD MASTERPIECES ---
    ("Spirited Away", "movie", 2001, 8.6, "2h 05m", "Hayao Miyazaki", ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"], ["Animation", "Adventure", "Fantasy"], "Japanese", ["feel-good", "mind-bending"], "A 10-year-old girl wanders into a world ruled by gods, witches and spirits where humans are changed into beasts.", "Beyond the tunnel awaits an enchanted bathhouse."),
    ("Princess Mononoke", "movie", 1997, 8.4, "2h 14m", "Hayao Miyazaki", ["Yôji Matsuda", "Yuriko Ishida", "Yûko Tanaka"], ["Animation", "Action", "Adventure"], "Japanese", ["emotional", "thriller"], "On a journey to find the cure for a Tatarigami curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara.", "The fate of the world rests on the courage of one warrior."),
    ("Howl's Moving Castle", "movie", 2004, 8.2, "1h 59m", "Hayao Miyazaki", ["Chieko Baishô", "Takuya Kimura", "Akihiro Miwa"], ["Animation", "Adventure", "Family"], "Japanese", ["feel-good", "romance"], "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking it lies with a wizard.", "The two lived there."),
    ("Your Name", "movie", 2016, 8.4, "1h 46m", "Makoto Shinkai", ["Ryûnosuke Kamiki", "Mone Kamishiraishi", "Ryô Narita"], ["Animation", "Drama", "Fantasy"], "Japanese", ["romance", "emotional", "mind-bending"], "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?", "I feel like I'm always searching for someone, or something."),
    ("Seven Samurai", "movie", 1954, 8.6, "3h 27m", "Akira Kurosawa", ["Toshirô Mifune", "Takashi Shimura", "Keiko Tsushima"], ["Action", "Drama"], "Japanese", ["thriller", "emotional"], "Farmers from a village exploited by bandits hire a veteran samurai for protection, who gathers six other samurai to join him.", "The Mighty Seven Ride!"),
    ("Parasite", "movie", 2019, 8.5, "2h 12m", "Bong Joon Ho", ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"], ["Drama", "Thriller", "Comedy"], "Korean", ["thriller", "mind-bending", "comedy"], "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", "Act like you own the place."),
    ("Memories of Murder", "movie", 2003, 8.1, "2h 12m", "Bong Joon Ho", ["Song Kang-ho", "Kim Sang-kyung", "Roe-ha Kim"], ["Crime", "Drama", "Mystery"], "Korean", ["thriller", "mind-bending"], "In 1986, in the province of Gyunggi, two detectives with differing methods try to solve the murder of multiple young women.", "The truth remains in the dark."),
    ("Oldboy", "movie", 2003, 8.4, "2h 00m", "Park Chan-wook", ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jeong"], ["Action", "Drama", "Mystery"], "Korean", ["mind-bending", "thriller"], "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.", "Laugh and the world laughs with you. Weep and you weep alone."),
    ("The Handmaiden", "movie", 2016, 8.1, "2h 25m", "Park Chan-wook", ["Kim Min-hee", "Kim Tae-ri", "Ha Jung-woo"], ["Drama", "Romance", "Thriller"], "Korean", ["thriller", "romance", "mind-bending"], "A woman is hired as a handmaiden to an eccentric Japanese heiress, but secretly she is involved in a plot to defraud her.", "Never trust anyone."),
    ("Amélie", "movie", 2001, 8.3, "2h 02m", "Jean-Pierre Jeunet", ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"], ["Romance", "Comedy"], "French", ["feel-good", "romance", "comedy"], "An innocent and naive girl in Paris decides to help those around her and discovers unexpected love.", "She'll change your life."),
    ("The Intouchables", "movie", 2011, 8.5, "1h 52m", "Olivier Nakache, Éric Toledano", ["François Cluzet", "Omar Sy", "Anne Le Ny"], ["Biography", "Comedy", "Drama"], "French", ["feel-good", "comedy", "emotional"], "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.", "Sometimes you have to reach into someone else's world to find what's missing in your own."),
    ("City of God", "movie", 2002, 8.6, "2h 10m", "Fernando Meirelles, Kátia Lund", ["Alexandre Rodrigues", "Leandro Firmino", "Matheus Nachtergaele"], ["Crime", "Drama"], "Spanish", ["thriller", "emotional"], "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.", "Fight and you'll never survive. Run and you'll never escape."),
    ("Pan's Labyrinth", "movie", 2006, 8.2, "1h 58m", "Guillermo del Toro", ["Ivana Baquero", "Sergi López", "Maribel Verdú"], ["Fantasy", "Drama", "Mystery"], "Spanish", ["emotional", "thriller", "mind-bending"], "In 1944 Spain, a young girl escapes into an eerie and captivating fantasy world with an ancient faun.", "Innocence has a power evil cannot imagine."),
    ("RRR", "movie", 2022, 8.0, "3h 07m", "S.S. Rajamouli", ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt"], ["Action", "Drama", "Adventure"], "Hindi", ["feel-good", "thriller"], "A fearless revolutionary and an officer in the British force unite to forge a path toward legendary freedom.", "Rise. Roar. Revolt."),
    ("3 Idiots", "movie", 2009, 8.4, "2h 50m", "Rajkumar Hirani", ["Aamir Khan", "Madhavan", "Sharman Joshi"], ["Comedy", "Drama"], "Hindi", ["feel-good", "comedy", "emotional"], "Two friends search for their long-lost companion while reminiscing about their college days.", "All is well."),
    ("Dangal", "movie", 2016, 8.3, "2h 41m", "Nitesh Tiwari", ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra"], ["Action", "Biography", "Drama"], "Hindi", ["feel-good", "emotional"], "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.", "Gold is gold, whether won by a boy or a girl."),
    ("Lagaan", "movie", 2001, 8.1, "3h 44m", "Ashutosh Gowariker", ["Aamir Khan", "Raghuvir Yadav", "Gracy Singh"], ["Adventure", "Drama", "Musical"], "Hindi", ["feel-good", "emotional"], "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.", "Once upon a time in India."),
    ("Gangs of Wasseypur", "movie", 2012, 8.2, "5h 21m", "Anurag Kashyap", ["Manoj Bajpayee", "Richa Chadha", "Nawazuddin Siddiqui"], ["Action", "Comedy", "Crime"], "Hindi", ["thriller", "comedy"], "A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, and ignites a deadly blood feud spanning three generations.", "Real violence. Real revenge."),

    # --- TOP WEB SERIES & TV LEGENDS ---
    ("Breaking Bad", "tv", 2008, 9.5, "5 Seasons", "Vince Gilligan", ["Bryan Cranston", "Aaron Paul", "Anna Gunn"], ["Crime", "Drama", "Thriller"], "English", ["thriller", "emotional"], "A chemistry teacher diagnosed with terminal cancer teams up with a former student to manufacture crystal meth.", "Remember my name."),
    ("Better Call Saul", "tv", 2015, 9.0, "6 Seasons", "Vince Gilligan, Peter Gould", ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks"], ["Crime", "Drama"], "English", ["thriller", "comedy", "emotional"], "The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White.", "It's all good, man!"),
    ("Game of Thrones", "tv", 2011, 9.2, "8 Seasons", "David Benioff, D.B. Weiss", ["Emilia Clarke", "Peter Dinklage", "Kit Harington"], ["Action", "Adventure", "Drama"], "English", ["thriller", "emotional"], "Nine noble families fight for control over Westeros, while an ancient enemy returns after being dormant for millennia.", "Winter is Coming."),
    ("House of the Dragon", "tv", 2022, 8.4, "2 Seasons", "Ryan J. Condal, George R.R. Martin", ["Matt Smith", "Emma D'Arcy", "Olivia Cooke"], ["Action", "Adventure", "Drama"], "English", ["thriller", "emotional"], "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.", "Fire will reign."),
    ("The Wire", "tv", 2002, 9.3, "5 Seasons", "David Simon", ["Dominic West", "Lance Reddick", "Idris Elba"], ["Crime", "Drama", "Thriller"], "English", ["emotional", "thriller"], "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.", "Listen carefully."),
    ("The Sopranos", "tv", 1999, 9.2, "6 Seasons", "David Chase", ["James Gandolfini", "Lorraine Bracco", "Edie Falco"], ["Crime", "Drama"], "English", ["thriller", "comedy", "emotional"], "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and crime family.", "Family. Business. Therapy."),
    ("Chernobyl", "tv", 2019, 9.3, "1 Season", "Craig Mazin, Johan Renck", ["Jared Harris", "Stellan Skarsgård", "Emily Watson"], ["Drama", "Thriller", "Mystery"], "English", ["thriller", "emotional"], "In April 1986, an explosion at Chernobyl becomes one of the world's worst man-made catastrophes.", "What is the cost of lies?"),
    ("Succession", "tv", 2018, 8.9, "4 Seasons", "Jesse Armstrong", ["Brian Cox", "Jeremy Strong", "Sarah Snook"], ["Drama", "Comedy"], "English", ["comedy", "emotional", "thriller"], "The Roy family controls the biggest media conglomerate in the world, fighting for power when their father steps down.", "Fight for the throne."),
    ("Stranger Things", "tv", 2016, 8.7, "4 Seasons", "The Duffer Brothers", ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"], ["Sci-Fi", "Drama", "Mystery"], "English", ["thriller", "feel-good"], "When a young boy vanishes, a small town uncovers secret experiments, supernatural forces and one strange girl.", "One summer can change everything."),
    ("Severance", "tv", 2022, 8.7, "2 Seasons", "Ben Stiller, Aoife McArdle", ["Adam Scott", "Patricia Arquette", "John Turturro"], ["Sci-Fi", "Thriller", "Mystery"], "English", ["mind-bending", "thriller"], "Mark leads a team whose memories have been surgically divided between their work and personal lives.", "Please do not attempt to remember yourself outside Lumon."),
    ("The Bear", "tv", 2022, 8.6, "3 Seasons", "Christopher Storer", ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri"], ["Drama", "Comedy"], "English", ["emotional", "comedy"], "A young chef from the fine dining world comes home to Chicago to run his family's Italian beef sandwich shop.", "Every second counts."),
    ("True Detective", "tv", 2014, 8.9, "4 Seasons", "Nic Pizzolatto", ["Matthew McConaughey", "Woody Harrelson", "Mahershala Ali"], ["Crime", "Drama", "Mystery"], "English", ["thriller", "mind-bending"], "Anthology series in which police investigations unearth the personal and professional secrets of those involved.", "Touch darkness and darkness touches you back."),
    ("Mindhunter", "tv", 2017, 8.6, "2 Seasons", "Joe Penhall, David Fincher", ["Jonathan Groff", "Holt McCallany", "Anna Torv"], ["Crime", "Drama", "Mystery"], "English", ["thriller", "mind-bending"], "In the late 1970s, two FBI agents expand criminal science by delving into the psychology of murder through serial killer interviews.", "To catch a killer you have to get inside his head."),
    ("Fargo", "tv", 2014, 8.9, "5 Seasons", "Noah Hawley", ["Billy Bob Thornton", "Martin Freeman", "Allison Tolman"], ["Crime", "Drama", "Thriller"], "English", ["thriller", "comedy"], "Various chronicles of deception, intrigue and murder in and around frozen Minnesota.", "A true crime saga."),
    ("Peaky Blinders", "tv", 2013, 8.8, "6 Seasons", "Steven Knight", ["Cillian Murphy", "Paul Anderson", "Helen McCrory"], ["Crime", "Drama"], "English", ["thriller", "emotional"], "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.", "By order of the Peaky Blinders."),
    ("Sherlock", "tv", 2010, 9.1, "4 Seasons", "Mark Gatiss, Steven Moffat", ["Benedict Cumberbatch", "Martin Freeman", "Una Stubbs"], ["Crime", "Drama", "Mystery"], "English", ["mind-bending", "comedy"], "A modern update finds the famous sleuth and his doctor partner solving crime in 21st-century London.", "The game is on."),
    ("Fleabag", "tv", 2016, 8.7, "2 Seasons", "Phoebe Waller-Bridge", ["Phoebe Waller-Bridge", "Sian Clifford", "Andrew Scott"], ["Comedy", "Drama"], "English", ["comedy", "emotional", "romance"], "A dry-witted woman navigates life and love in London while trying to cope with tragedy.", "This is a love story."),
    ("Ted Lasso", "tv", 2020, 8.8, "3 Seasons", "Bill Lawrence, Jason Sudeikis", ["Jason Sudeikis", "Hannah Waddingham", "Brett Goldstein"], ["Comedy", "Drama"], "English", ["feel-good", "comedy"], "An American college football coach is hired to manage a British soccer team with relentless optimism.", "Kindness makes a comeback."),
    ("Arcane", "tv", 2021, 9.0, "2 Seasons", "Christian Linke, Alex Yee", ["Hailee Steinfeld", "Ella Purnell", "Kevin Alejandro"], ["Animation", "Action", "Sci-Fi"], "English", ["emotional", "thriller"], "Set in utopian Piltover and oppressed Zaun, the story follows the origins of two iconic champions.", "Every hero has a beginning. Every villain has a reason."),
    ("The Boys", "tv", 2019, 8.7, "4 Seasons", "Eric Kripke", ["Karl Urban", "Jack Quaid", "Antony Starr"], ["Action", "Comedy", "Drama"], "English", ["thriller", "comedy"], "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.", "Never meet your heroes."),
    ("Invincible", "tv", 2021, 8.7, "2 Seasons", "Robert Kirkman", ["Steven Yeun", "J.K. Simmons", "Sandra Oh"], ["Animation", "Action", "Adventure"], "English", ["thriller", "emotional"], "An adult animated series based on the sky-bound comic about a teenager whose father is the most powerful superhero on the planet.", "Blood, guts, and family secrets."),
    ("The Last of Us", "tv", 2023, 8.7, "2 Seasons", "Craig Mazin, Neil Druckmann", ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna"], ["Action", "Adventure", "Drama"], "English", ["emotional", "thriller"], "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.", "When you're lost in the darkness, look for the light."),
    ("Dark", "tv", 2017, 8.7, "3 Seasons", "Baran bo Odar", ["Louis Hofmann", "Oliver Masucci", "Karoline Eichhorn"], ["Sci-Fi", "Mystery", "Drama"], "German", ["mind-bending", "thriller"], "A missing child sets four families on a frantic hunt as they unearth a mystery spanning three generations.", "The question is not where, but when."),
    ("Squid Game", "tv", 2021, 8.0, "2 Seasons", "Hwang Dong-hyuk", ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon"], ["Action", "Drama", "Mystery"], "Korean", ["thriller", "mind-bending"], "Hundreds of cash-strapped players accept an invitation to compete in children's games with deadly stakes.", "45.6 billion won is child's play."),
    ("Shōgun", "tv", 2024, 8.7, "1 Season", "Rachel Kondo, Justin Marks", ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai"], ["Drama", "Adventure", "History"], "Japanese", ["thriller", "mind-bending"], "In Japan in 1600, Lord Yoshii Toranaga fights for his life as his enemies on the Council of Regents unite against him.", "Fate is a storm."),
    ("Money Heist", "tv", 2017, 8.2, "5 Seasons", "Álex Pina", ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"], ["Action", "Crime", "Drama"], "Spanish", ["thriller", "mind-bending"], "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing billions from the Royal Mint.", "The rebellion begins."),
    ("Narcos", "tv", 2015, 8.8, "3 Seasons", "Carlo Bernard, Chris Brancato", ["Pedro Pascal", "Wagner Moura", "Boyd Holbrook"], ["Biography", "Crime", "Drama"], "Spanish", ["thriller", "emotional"], "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins.", "There's no business like blow business."),
    ("The Office", "tv", 2005, 9.0, "9 Seasons", "Greg Daniels", ["Steve Carell", "Rainn Wilson", "John Krasinski"], ["Comedy"], "English", ["comedy", "feel-good"], "A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.", "A comedy for anyone whose boss is an idiot."),
    ("Friends", "tv", 1994, 8.9, "10 Seasons", "David Crane, Marta Kauffman", ["Jennifer Aniston", "Courteney Cox", "Matthew Perry"], ["Comedy", "Romance"], "English", ["feel-good", "comedy", "romance"], "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.", "I'll be there for you."),
    ("Seinfeld", "tv", 1989, 8.9, "9 Seasons", "Larry David, Jerry Seinfeld", ["Jerry Seinfeld", "Julia Louis-Dreyfus", "Michael Richards"], ["Comedy"], "English", ["comedy", "feel-good"], "The continuing misadventures of neurotic New York stand-up comedian Jerry Seinfeld and his equally neurotic friends.", "A show about nothing."),
    ("Black Mirror", "tv", 2011, 8.7, "6 Seasons", "Charlie Brooker", ["Daniel Lapaine", "Hannah John-Kamen", "Michaela Coel"], ["Drama", "Mystery", "Sci-Fi"], "English", ["mind-bending", "thriller"], "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.", "The future is broken."),
    ("Loki", "tv", 2021, 8.2, "2 Seasons", "Michael Waldron", ["Tom Hiddleston", "Owen Wilson", "Sophia Di Martino"], ["Action", "Adventure", "Fantasy"], "English", ["mind-bending", "feel-good"], "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Endgame.", "Glorious Purpose."),
    ("WandaVision", "tv", 2021, 7.9, "1 Season", "Jac Schaeffer", ["Elizabeth Olsen", "Paul Bettany", "Kathryn Hahn"], ["Action", "Comedy", "Drama"], "English", ["mind-bending", "emotional"], "Blends the style of classic sitcoms with the MCU, in which Wanda Maximoff and Vision live idealized suburban lives.", "A love beyond reality."),
    ("Daredevil", "tv", 2015, 8.6, "3 Seasons", "Drew Goddard", ["Charlie Cox", "Vincent D'Onofrio", "Deborah Ann Woll"], ["Action", "Crime", "Drama"], "English", ["thriller", "emotional"], "A blind lawyer by day, vigilante by night. Matt Murdock fights the crime of New York as Daredevil.", "Justice is blind."),
    ("Attack on Titan", "tv", 2013, 9.1, "4 Seasons", "Hajime Isayama, Tetsurō Araki", ["Yûki Kaji", "Yui Ishikawa", "Marina Inoue"], ["Animation", "Action", "Adventure"], "Japanese", ["thriller", "emotional", "mind-bending"], "After his hometown is destroyed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to extinction.", "Fight or die."),
    ("Death Note", "tv", 2006, 8.9, "1 Season", "Tetsurō Araki", ["Mamoru Miyano", "Brad Swaile", "Vincent Tong"], ["Animation", "Crime", "Drama"], "Japanese", ["mind-bending", "thriller"], "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone.", "Whose side are you on?")
]

# Curated talent pool for procedural expansion
TALENT = {
    "English": {
        "directors": ["Christopher Nolan", "Denis Villeneuve", "Martin Scorsese", "Quentin Tarantino", "David Fincher", "Steven Spielberg", "Ridley Scott", "Stanley Kubrick", "James Cameron", "Paul Thomas Anderson", "The Coen Brothers", "Wes Anderson", "Greta Gerwig", "Damien Chazelle", "Jordan Peele", "Sam Mendes", "Danny Boyle", "Guy Ritchie", "Guillermo del Toro", "Rian Johnson", "Alfonso Cuarón", "David Lynch", "Francis Ford Coppola", "Jonathan Nolan", "Vince Gilligan", "Jesse Armstrong", "Craig Mazin", "George Lucas", "Peter Jackson", "James Gunn", "Chad Stahelski", "Matt Reeves", "Todd Phillips", "Alex Garland", "Robert Eggers", "Ari Aster", "Edgar Wright", "Bong Joon Ho", "Taika Waititi", "Phoebe Waller-Bridge"],
        "actors": ["Leonardo DiCaprio", "Christian Bale", "Matthew McConaughey", "Brad Pitt", "Robert De Niro", "Al Pacino", "Tom Hanks", "Cillian Murphy", "Matt Damon", "Joaquin Phoenix", "Ryan Gosling", "Timothée Chalamet", "Jake Gyllenhaal", "Oscar Isaac", "Adam Driver", "Michael Fassbender", "Tom Hardy", "Benedict Cumberbatch", "Gary Oldman", "Willem Dafoe", "Cate Blanchett", "Amy Adams", "Emma Stone", "Margot Robbie", "Zendaya", "Scarlett Johansson", "Florence Pugh", "Jessica Chastain", "Emily Blunt", "Saoirse Ronan", "Hugh Jackman", "Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo", "Paul Mescal", "Anya Taylor-Joy", "Mia Goth", "Pedro Pascal", "Jeremy Allen White"]
    },
    "Korean": {
        "directors": ["Bong Joon Ho", "Park Chan-wook", "Lee Chang-dong", "Kim Jee-woon", "Na Hong-jin", "Yeon Sang-ho", "Hong Sang-soo", "Celine Song", "Hwang Dong-hyuk"],
        "actors": ["Song Kang-ho", "Choi Min-sik", "Lee Byung-hun", "Yoo Ah-in", "Lee Jung-jae", "Ha Jung-woo", "Ma Dong-seok", "Kim Min-hee", "Jeon Do-yeon", "Son Ye-jin", "Bae Doona", "Kim Tae-ri", "Greta Lee", "Teo Yoo", "Wi Ha-joon", "Park Seo-joon"]
    },
    "Japanese": {
        "directors": ["Hayao Miyazaki", "Akira Kurosawa", "Makoto Shinkai", "Satoshi Kon", "Hirokazu Kore-eda", "Takeshi Kitano", "Shinichirō Watanabe", "Hideaki Anno", "Takashi Yamazaki"],
        "actors": ["Toshirô Mifune", "Ken Watanabe", "Tadanobu Asano", "Hiroyuki Sanada", "Kôji Yakusho", "Masaki Suda", "Ryûnosuke Kamiki", "Nana Komatsu", "Sakura Ando", "Hikari Mitsushima", "Anna Sawai"]
    },
    "French": {
        "directors": ["Jean-Luc Godard", "François Truffaut", "Jean-Pierre Jeunet", "Céline Sciamma", "Denis Villeneuve", "Luc Besson", "Mathieu Kassovitz", "Jacques Audiard", "Justine Triet"],
        "actors": ["Audrey Tautou", "Vincent Cassel", "Marion Cotillard", "Léa Seydoux", "Noémie Merlant", "Adèle Haenel", "Jean Dujardin", "Gaspard Ulliel", "Eva Green", "Tahar Rahim", "Sandra Hüller"]
    },
    "Spanish": {
        "directors": ["Pedro Almodóvar", "Guillermo del Toro", "Alejandro González Iñárritu", "Alfonso Cuarón", "Juan José Campanella", "Álex de la Iglesia", "J.A. Bayona"],
        "actors": ["Javier Bardem", "Penélope Cruz", "Antonio Banderas", "Ricardo Darín", "Gael García Bernal", "Diego Luna", "Ana de Armas", "Mario Casas", "Úrsula Corberó", "Álvaro Morte", "Pedro Pascal"]
    },
    "Hindi": {
        "directors": ["S.S. Rajamouli", "Anurag Kashyap", "Rajkumar Hirani", "Sanjay Leela Bhansali", "Zoya Akhtar", "Shoojit Sircar", "Vishal Bhardwaj", "Mani Ratnam", "Prashanth Neel"],
        "actors": ["Shah Rukh Khan", "Aamir Khan", "Irrfan Khan", "Nawazuddin Siddiqui", "Ranbir Kapoor", "Ranveer Singh", "Ayushmann Khurrana", "Manoj Bajpayee", "Deepika Padukone", "Alia Bhatt", "Tabu", "Priyanka Chopra", "Ram Charan", "N.T. Rama Rao Jr."]
    },
    "German": {
        "directors": ["Fritz Lang", "Werner Herzog", "Wim Wenders", "Baran bo Odar", "Florian Henckel von Donnersmarck", "Oliver Hirschbiegel", "Fatih Akin", "Christian Petzold"],
        "actors": ["Daniel Brühl", "Christoph Waltz", "Sebastian Koch", "Martina Gedeck", "Louis Hofmann", "Oliver Masucci", "August Diehl", "Paula Beer", "Franz Rogowski"]
    },
    "Italian": {
        "directors": ["Federico Fellini", "Sergio Leone", "Giuseppe Tornatore", "Paolo Sorrentino", "Roberto Benigni", "Bernardo Bertolucci", "Luchino Visconti"],
        "actors": ["Marcello Mastroianni", "Sophia Loren", "Roberto Benigni", "Toni Servillo", "Monica Bellucci", "Gian Maria Volonté", "Claudia Cardinale"]
    }
}

GENRE_MAP = {
    "Sci-Fi": ["mind-bending", "thriller"],
    "Action": ["thriller", "feel-good"],
    "Drama": ["emotional", "thriller"],
    "Comedy": ["comedy", "feel-good"],
    "Romance": ["romance", "emotional"],
    "Thriller": ["thriller", "mind-bending"],
    "Mystery": ["mind-bending", "thriller"],
    "Animation": ["feel-good", "comedy"],
    "Crime": ["thriller", "emotional"],
    "Adventure": ["feel-good", "thriller"],
    "Fantasy": ["mind-bending", "feel-good"],
    "History": ["emotional", "thriller"]
}

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

# Patterns for realistic additional titles
TITLE_PREFIXES = [
    "The Secret of", "Echoes from", "Chronicles of", "The Fall of", "Shadows over", 
    "Return to", "Kingdom of", "The Last", "Beyond the", "Voice of", 
    "The Legend of", "Edge of", "Tales from", "The Mystery of", "Letters to", 
    "Sins of", "The Rise of", "Whispers in", "City of", "Memories of",
    "The Search for", "Labyrinth of", "The Heart of", "Dreams of", "The Promise of",
    "Symphony of", "The Curse of", "Journey to", "Song of", "Nightfall in"
]

NOUN_LIST = [
    "Elysium", "Babylon", "Solitude", "Tomorrow", "Eternity", "the Cosmos", "the North", 
    "Starlight", "the Citadel", "the Horizon", "the Abyss", "Avalon", "Hyperion", 
    "Winter", "the Sun", "the Ocean", "the Empire", "Silence", "Atlantis", "Destiny",
    "the Wind", "the Shadows", "the Valley", "Midnight", "the Highlands", "Fire", "Ice",
    "the Frontier", "the Wasteland", "the Samurai", "the Alchemist", "the Detective", "the Emperor"
]

CITY_LIST = [
    "Tokyo", "Seoul", "Paris", "Berlin", "London", "New York", "Madrid", "Rome",
    "Kyoto", "Barcelona", "Vienna", "Amsterdam", "Mumbai", "Los Angeles", "Chicago",
    "San Francisco", "Prague", "Stockholm", "Venice", "Edinburgh"
]

ADJECTIVES = [
    "Silent", "Crimson", "Golden", "Eternal", "Frozen", "Broken", "Forgotten",
    "Hidden", "Dark", "Radiant", "Immortal", "Fallen", "Shattered", "Infinite",
    "Lost", "Secret", "Velvet", "Spectral", "Ancient", "Wandering"
]

OCCUPATIONS = [
    "Detective", "Archivist", "Astronomer", "Alchemist", "Cartographer", "Composer",
    "Surgeon", "Pilot", "Diplomat", "Watchmaker", "Sculptor", "Captain", "Philosopher",
    "Samurai", "Bounty Hunter", "Chamberlain", "Mechanic", "Explorer"
]

LANGUAGES = ["English", "Japanese", "Korean", "French", "Spanish", "German", "Hindi", "Italian"]
LANGUAGE_WEIGHTS = [0.45, 0.12, 0.10, 0.08, 0.08, 0.06, 0.06, 0.05]

TARGET_COUNT = 2050

all_titles = []
seen_titles = set()

# 1. First add the curated famous titles
for t in FAMOUS_TITLES:
    title, t_type, year, rating, runtime, director, cast, genres, lang, moods, synopsis, tagline = t
    if title in seen_titles:
        continue
    seen_titles.add(title)
    all_titles.append({
        "title": title,
        "type": t_type,
        "releaseYear": year,
        "rating": rating,
        "runtime": runtime,
        "director": director,
        "cast": cast,
        "genres": genres,
        "language": lang,
        "moodTags": moods,
        "synopsis": synopsis,
        "tagline": tagline,
        "voteCount": random.randint(250000, 2400000),
        "featured": rating >= 8.7,
        "trending": rating >= 8.5,
        "popular": rating >= 8.0,
        "posterPath": POSTERS[len(all_titles) % len(POSTERS)],
        "backdropPath": BACKDROPS[len(all_titles) % len(BACKDROPS)],
        "externalProviderId": f"tmdb-{100000 + len(all_titles)}"
    })

# Set hero movie
all_titles[0]["featured"] = True
all_titles[0]["trending"] = True
all_titles[0]["popular"] = True
all_titles[0]["backdropPath"] = "/images/hero-cinematic.jpg"

print(f"Added {len(all_titles)} world-famous premier titles.")

# 2. Synthesize additional high quality cinematic records to reach TARGET_COUNT
while len(all_titles) < TARGET_COUNT:
    # 65% movie, 35% tv
    t_type = "movie" if random.random() < 0.65 else "tv"
    
    # Select language according to realistic distribution
    lang = random.choices(LANGUAGES, weights=LANGUAGE_WEIGHTS, k=1)[0]
    talent_pool = TALENT.get(lang, TALENT["English"])
    director = random.choice(talent_pool["directors"])
    cast_sample = random.sample(talent_pool["actors"], k=min(3, len(talent_pool["actors"])))
    
    # Generate realistic unique title
    title_style = random.randint(1, 5)
    if title_style == 1:
        candidate_title = f"{random.choice(TITLE_PREFIXES)} {random.choice(NOUN_LIST)}"
    elif title_style == 2:
        candidate_title = f"{random.choice(CITY_LIST)} {random.choice(['Nights', 'Chronicles', 'Stories', 'Confidential', 'Underground', 'Days', 'Echoes'])}"
    elif title_style == 3:
        candidate_title = f"The {random.choice(ADJECTIVES)} {random.choice(OCCUPATIONS)}"
    elif title_style == 4:
        candidate_title = f"{random.choice(ADJECTIVES)} {random.choice(NOUN_LIST)}"
    else:
        candidate_title = f"The {random.choice(OCCUPATIONS)} of {random.choice(CITY_LIST)}"
        
    if candidate_title in seen_titles:
        candidate_title = f"{candidate_title} (Part {random.choice(['II', 'III', 'IV'])})"
        if candidate_title in seen_titles:
            continue
            
    seen_titles.add(candidate_title)
    
    # Genres & Moods
    primary_genre = random.choice(list(GENRE_MAP.keys()))
    secondary_genres = [g for g in GENRE_MAP.keys() if g != primary_genre]
    genres = [primary_genre] + random.sample(secondary_genres, k=random.randint(1, 2))
    
    mood_candidates = GENRE_MAP[primary_genre]
    mood_tags = list(set(mood_candidates + random.sample(['feel-good', 'thriller', 'romance', 'mind-bending', 'emotional', 'comedy'], k=1)))
    
    # Year, rating & runtime
    year = random.randint(1975, 2026)
    rating = round(random.uniform(7.1, 9.1), 1)
    
    if t_type == "movie":
        mins = random.randint(88, 175)
        runtime = f"{mins // 60}h {mins % 60:02d}m"
    else:
        runtime = f"{random.randint(1, 6)} Seasons"
        
    synopsis = (
        f"An engrossing {primary_genre.lower()} narrative following an unexpected chain of events "
        f"involving high stakes, loyalty, and the pursuit of truth."
    )
    tagline = f"Every choice echoes across time."
    
    all_titles.append({
        "title": candidate_title,
        "type": t_type,
        "releaseYear": year,
        "rating": rating,
        "runtime": runtime,
        "director": director,
        "cast": cast_sample,
        "genres": genres,
        "language": lang,
        "moodTags": mood_tags,
        "synopsis": synopsis,
        "tagline": tagline,
        "voteCount": random.randint(45000, 1500000),
        "featured": rating >= 8.8,
        "trending": rating >= 8.5,
        "popular": rating >= 8.1,
        "posterPath": POSTERS[len(all_titles) % len(POSTERS)],
        "backdropPath": BACKDROPS[len(all_titles) % len(BACKDROPS)],
        "externalProviderId": f"tmdb-{100000 + len(all_titles)}"
    })

print(f"Total titles assembled: {len(all_titles)}")
movies_count = len([t for t in all_titles if t["type"] == "movie"])
tv_count = len([t for t in all_titles if t["type"] == "tv"])
print(f"Movies: {movies_count}, TV Series: {tv_count}")

# 3. Write Backend sampleTitles.js
backend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/Backend/src/data/sampleTitles.js"
with open(backend_output_path, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(f" * CineLog Master Catalog ({len(all_titles)} Curated Titles)\n")
    f.write(f" * Movies ({movies_count}) + Web Series ({tv_count})\n")
    f.write(" */\n\n")
    f.write("export const SAMPLE_TITLES = ")
    json.dump(all_titles, f, indent=2, ensure_ascii=False)
    f.write(";\n")

print(f"Successfully generated {len(all_titles)} titles for Backend at {backend_output_path}")

# 4. Write FrontEnd movies.js
frontend_output_path = "/Users/arth/Downloads/CineLOG/CineLog/FrontEnd/src/data/movies.js"
with open(frontend_output_path, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(f" * CineLog Master Catalog ({len(all_titles)} Curated Titles)\n")
    f.write(f" * Movies ({movies_count}) + Web Series ({tv_count})\n")
    f.write(" */\n\n")
    f.write("""export const MOODS = [
  { id: 'feel-good', label: 'Feel-Good', emoji: '✨', description: 'Uplifting and heartwarming stories' },
  { id: 'thriller', label: 'Thriller', emoji: '⚡', description: 'Gripping suspense and high tension' },
  { id: 'romance', label: 'Romance', emoji: '❤️', description: 'Love stories and emotional connections' },
  { id: 'mind-bending', label: 'Mind-Bending', emoji: '🌀', description: 'Complex puzzles and reality-bending plots' },
  { id: 'emotional', label: 'Emotional', emoji: '🎭', description: 'Deeply moving and thought-provoking' },
  { id: 'comedy', label: 'Comedy', emoji: '😂', description: 'Laugh-out-loud humor and witty charm' }
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
  'Japanese',
  'Korean',
  'French',
  'Spanish',
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
