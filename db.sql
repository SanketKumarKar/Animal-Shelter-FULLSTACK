--this file contains tne SQL Commands as per PostgreSQL.

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'staff'
);

CREATE TABLE adopter (
  ad_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE staff (
  stff_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(50)
);

CREATE TABLE animal (
  anl_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  adm_date DATE,
  breed VARCHAR(100),
  ad_id INT REFERENCES adopter(ad_id),
  stff_id INT REFERENCES staff(stff_id)
);

CREATE TABLE medrec (
  r_id SERIAL PRIMARY KEY,
  vacc_det TEXT,
  treatment TEXT,
  anl_id INT REFERENCES animal(anl_id) ON DELETE CASCADE
);

CREATE TABLE checkup (
  id SERIAL PRIMARY KEY,
  symptoms TEXT,
  details TEXT,
  checkup_date DATE,
  r_id INT REFERENCES medrec(r_id) ON DELETE CASCADE
);

CREATE TABLE vet (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  doc_id VARCHAR(50),
  ph VARCHAR(15),
  checkup_id INT REFERENCES checkup(id)
);

CREATE TABLE donation (
  d_id SERIAL PRIMARY KEY,
  amt INT,
  items TEXT
);

CREATE TABLE volunteer (
  v_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  role VARCHAR(50),
  d_id INT REFERENCES donation(d_id)
);

CREATE TABLE adopter_ph (
  ph VARCHAR(15),
  ad_id INT REFERENCES adopter(ad_id) ON DELETE CASCADE,
  PRIMARY KEY (ph, ad_id)
);

CREATE TABLE staff_ph (
  ph VARCHAR(15),
  stff_id INT REFERENCES staff(stff_id) ON DELETE CASCADE,
  PRIMARY KEY (ph, stff_id)
);