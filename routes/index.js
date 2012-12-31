exports.index = function(req, res){
  res.render('index');
};

exports.getContacts = function(req, res){
  res.send(contacts);
};

exports.getCategories = function(req, res){
  res.send(categories);
};

exports.getEmail = function(req, res){
  res.send(email);
};

// --------------------

var categories = [
  {name: "Work Related"},
  {name: "Personal"}, 
  {name: "Important"}, 
  {name: "Read Later"}
];

var contacts = [
  {
    id: "09vsjk3209svdjh",
    firstName: "Joe",
    lastName: "Johnson",
    email: "joe.johnson@example.com",
    phone: "555-555-5555"
  },
  {
    id: "45890bdhj4590gf",
    firstName: "Jim",
    lastName: "Jimson",
    email: "jim.jimson@example.com",
    phone: "555-555-5556"
  },
  {
    id: "120985h4509vfh4",
    firstName: "Ben",
    lastName: "Benson",
    email: "ben.benson@example.com",
    phone: "555-555-5557"
  },
  {
    id: "9sd9123njkdas90",
    firstName: "Bob",
    lastName: "Robertson",
    email: "robert.robertson@example.com",
    phone: "555-555-5558"
  },
  {
    id: "lj32kjsd09xzcv3",
    firstName: "Amy",
    lastName: "Amerson",
    email: "amy.amerson@example.com",
    phone: "555-555-5559"
  },
  {
    id: "aa23j45hn45n536",
    firstName: "Julie", 
    lastName: "Julerson",
    email: "julie.julerson@example.com",
    phone: "555-555-5560"
  }
];

var body = [
  "<p>Bring the Humans to me RUN! wibbly wobbly timey wimey wibbly wobbly timey wimey you are not alone in the universe ninehundred  Hey, who turned out the lights? I wear a fez now, fezzes are cool EXTERMINATE! Hello sweetie IT is the Doctor! Enemy of the Daleks! wibbly-wobbly timey-wimey Fantastic! I wear a fez now, fezzes are cool Galifrey River Song EXTERMINATE! </p>" + 
  "<p>the girl who waited the oncoming storm Davros The Shadow Proclamation Bad Wolf  River Song RUN! Donna Noble has left the library. Donna Noble has been saved. IT is the Doctor! Enemy of the Daleks! We are Dalek Skaro Davros The angels have the phone box DON'T BLINK! River Song You are better at dying Bow ties are cool Geronimo! Rose Tyler I am a Dalek Hello, Captain Jack Harkness.</p>" + 
  "<p>Raxacoricofallapatorius Silence will fall I really hate stairs. EXTERMINATE ALL STAIRCASES! Reverse the polarity of the positron flow The Supreme Dalek IT is the Doctor! Enemy of the Daleks! Reverse the polarity of the positron flow I hereby invoke The Shadow Proclamation! Reverse the polarity of the positron flow puny human Tick tock goes the clock... Bow ties are cool Skaro Donna</p>" + 
  "<p>Noble has left the library. Donna Noble has been saved. Hello Sweetie. I wear a fez now, fezzes are cool You are better at dying We are Dalek Hello sweetie! Allons-y Bow ties are cool MY VISION IS IMPAIRED! EXTERMINATE! Would you like a jelly baby? RUN! Raxacoricofallapatorius EXTERMINATE! Hello Sweetie. Emperor of the Daleks Emperor of the Daleks Delete. Delete. Delete. The angels have the phone box </p>" + 
  "<p>Raxacoricofallapatorius The socks with holes, dummy! River Song Hello sweetie! Galifreyan You are better at dying Rory the Roman The Master Hey, who turned out the lights? Are you my mummy? Hello, Captain Jack Harkness.  Cult of Skaro Time War Bad Wolf Fantastic! The angels have the phone box Raxacoricofallapatorius Puny Human! The Supreme Dalek Hello sweetie! The Supreme Dalek </p>" + 
  "<p>the oncoming storm Galifrey Hello Sweetie. Time Lord Fantastic! Rory the Roman Hello, Captain Jack Harkness.  you are not alone in the universe puny human Spoilers!"
].join();

var email = [
  {
    id: "sdf908f67hjf9sf",
    from: "Joe Johnson",
    subject: "Some email about that subject which was sent to you",
    date: "1/1/2001",
    body: body,
    categories: ["Work Related"]
  },
  {
    id: "365hljk85436lkh",
    from: "Jim Jimson",
    subject: "Did you get that thing I sent you?",
    date: "1/1/2001",
    body: body,
    categories: ["Work Related", "Read Later"]
  },
  {
    id: "a89ghjkl12389sg",
    from: "Ben Benson",
    subject: "Nigerian King needs YOU to send HIM money!",
    date: "1/1/2001",
    body: body,
    categories: ["Personal", "Important"]
  },
  {
    id: "764089gfdljk563",
    from: "Bob Robertson",
    subject: "Yo dawg, I hear you like Backbone...",
    date: "1/1/2001",
    body: body,
    categories: ["Read Later", "Important"]
  },
];
