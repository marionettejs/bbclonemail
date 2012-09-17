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
    name: "Joe Johnson",
    email: "joe.johnson@example.com",
    phone: "555-555-5555"
  },
  {
    id: "45890bdhj4590gf",
    name: "Jim Jimson",
    email: "jim.jimson@example.com",
    phone: "555-555-5556"
  },
  {
    id: "120985h4509vfh4",
    name: "Ben Benson",
    email: "ben.benson@example.com",
    phone: "555-555-5557"
  },
  {
    id: "9sd9123njkdas90",
    name: "Bob Robertson",
    email: "robert.robertson@example.com",
    phone: "555-555-5558"
  },
  {
    id: "lj32kjsd09xzcv3",
    name: "Amy Amerson",
    email: "amy.amerson@example.com",
    phone: "555-555-5559"
  },
  {
    id: "aa23j45hn45n536",
    name: "Julie Julerson",
    email: "julie.julerson@example.com",
    phone: "555-555-5560"
  }
];

var body = [
  "Voluptate quinoa wayfarers, american apparel consectetur mlkshk dolor DIY. Portland pitchfork terry richardson jean shorts locavore placeat.  Qui retro stumptown, art party aute delectus reprehenderit wolf quinoa craft beer nesciunt minim master cleanse. Irony cliche dreamcatcher, PBR skateboard laborum ex synth trust fund wayfarers tumblr. Gluten-free nostrud williamsburg, sustainable freegan delectus yr laborum wes anderson incididunt vice elit artisan shoreditch. Cred accusamus jean shorts aliquip, 3 wolf moon occaecat farm-to-table VHS stumptown beard in cupidatat ethical sartorial high life. Before they sold out four loko do, chambray wolf eu pariatur in irony.",
  "Whatever keytar odio mollit, portland enim consequat ethical minim quis mixtape VHS master cleanse culpa deserunt. Do mcsweeney's butcher sustainable , cosby sweater cupidatat ex veniam mollit cardigan. Exercitation wayfarers tofu sint fixie irure, vinyl raw denim officia cupidatat. Sed velit enim, sapiente keytar salvia aute non craft beer. Fixie deserunt non banh mi seitan. Salvia cardigan aute duis. Velit pariatur in commodo, wayfarers enim cardigan freegan yr nesciunt helvetica gluten-free culpa minim scenester.",
  "Cred fap cliche hoodie stumptown. Duis cillum wolf quinoa vinyl anim, iphone odio lomo Austin. Freegan carles food truck, 8-bit retro brooklyn Austin tempor nihil voluptate cosby sweater. Squid letterpress craft beer , tumblr portland gentrify vice keytar echo park twee master cleanse. Laboris ad sint vero consectetur cupidatat. Exercitation 3 wolf moon american apparel , labore do iphone +1 gluten-free. Incididunt fixie gluten-free williamsburg , hoodie yr aliqua mcsweeney's. "
];

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
