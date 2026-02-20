-- ============================================================
-- SEED DATA for Animal Shelter Management System
-- Run this after creating tables (db.sql)
-- Order respects foreign-key constraints
-- ============================================================

-- ── Staff ──
INSERT INTO staff (name, role) VALUES
  ('Dr. Priya Sharma', 'Veterinarian'),
  ('Amit Verma',       'Caretaker'),
  ('Neha Gupta',       'Manager'),
  ('Ravi Kumar',       'Assistant'),
  ('Sonia Mehta',      'Receptionist');

-- ── Adopters ──
INSERT INTO adopter (name, address) VALUES
  ('Rahul Sharma',       'Delhi'),
  ('Sanket Kumar Kar',   'Crossing Republik'),
  ('Anjali Patel',       'Mumbai'),
  ('Vikram Singh',       'Chandigarh'),
  ('Meera Joshi',        'Pune'),
  ('Arjun Nair',         'Kochi');

-- ── Donations ──
INSERT INTO donation (amt, items, don_date) VALUES
  (5000, 'Dog Food (20kg)',      '2025-07-10'),
  (3000, 'Cat Litter & Toys',    '2025-08-15'),
  (10000, 'Medical Supplies',    '2025-09-20'),
  (2500, 'Blankets & Bedding',   '2025-10-05'),
  (7500, 'Vaccination Fund',     '2025-11-12'),
  (1500, 'Grooming Kit',         '2025-12-01'),
  (4000, 'Leashes & Collars',    '2026-01-18');

-- ── Animals ──
INSERT INTO animal (name, age, adm_date, breed, ad_id, stff_id) VALUES
  ('Tommy',     3,  '2025-08-15', 'Labrador',           NULL, 1),
  ('Buddy',     2,  '2025-09-01', 'Golden Retriever',   1,    2),
  ('Luna',      1,  '2025-10-10', 'Persian Cat',        NULL, 1),
  ('Max',       4,  '2025-07-20', 'German Shepherd',    3,    2),
  ('Bella',     2,  '2025-11-05', 'Beagle',             NULL, 3),
  ('Charlie',   5,  '2025-06-12', 'Indie',              4,    4),
  ('Daisy',     1,  '2025-12-01', 'Shih Tzu',           NULL, 1),
  ('Rocky',     3,  '2026-01-15', 'Rottweiler',         NULL, 2),
  ('Coco',      2,  '2026-01-20', 'Siamese Cat',        NULL, 3),
  ('Leo',       6,  '2025-05-10', 'Pomeranian',         5,    4),
  ('Milo',      1,  '2026-02-01', 'Husky',              NULL, 1),
  ('Ginger',    4,  '2025-09-25', 'Mixed Breed',        6,    2);

-- ── Medical Records ──
INSERT INTO medrec (vacc_det, treatment, anl_id) VALUES
  ('Rabies Vaccine',          'Regular Checkup',       1),
  ('Distemper Vaccine',       'Deworming',             1),
  ('DHPP Vaccine',            'Flea Treatment',        2),
  ('Rabies Vaccine',          'Spay Surgery',          3),
  ('Bordetella Vaccine',      'Ear Infection Treatment', 5),
  ('DHPP Vaccine',            'Regular Checkup',       7),
  ('Rabies Vaccine',          'Dental Cleaning',       8),
  ('Distemper Vaccine',       'Skin Allergy Treatment', 9),
  ('Rabies + DHPP',           'Annual Wellness Exam',  4),
  ('Leptospirosis Vaccine',   'Regular Checkup',       11);

-- ── Checkups ──
INSERT INTO checkup (symptoms, details, checkup_date, r_id) VALUES
  ('Mild cough',           'Routine checkup, no concerns',     '2025-08-20', 1),
  ('None',                 'Post-vaccine observation',          '2025-09-15', 2),
  ('Itching',              'Prescribed anti-flea medication',   '2025-09-10', 3),
  ('Loss of appetite',     'Blood test normal, monitoring',     '2025-10-15', 4),
  ('Ear discharge',        'Prescribed ear drops, follow-up',   '2025-11-10', 5),
  ('None',                 'Healthy, all vitals normal',        '2025-12-10', 6),
  ('Tartar buildup',       'Dental scaling completed',          '2026-01-20', 7),
  ('Dry skin patches',     'Medicated shampoo prescribed',      '2026-01-25', 8);

-- ── Vets ──
INSERT INTO vet (name, doc_id, ph, checkup_id) VALUES
  ('Dr. Priya Sharma',  'VET-001', '9876543210', 1),
  ('Dr. Rajesh Kumar',  'VET-002', '9876543211', 2),
  ('Dr. Priya Sharma',  'VET-001', '9876543210', 3),
  ('Dr. Anita Desai',   'VET-003', '9876543212', 4),
  ('Dr. Rajesh Kumar',  'VET-002', '9876543211', 5),
  ('Dr. Priya Sharma',  'VET-001', '9876543210', 6);

-- ── Volunteers ──
INSERT INTO volunteer (name, role, d_id) VALUES
  ('Karan Malhotra',   'Dog Walker',       1),
  ('Priyanka Reddy',   'Feeding Helper',   2),
  ('Deepak Jain',      'Cleaner',          NULL),
  ('Simran Kaur',      'Adoption Counselor', 3),
  ('Rohit Agarwal',    'Event Organizer',  5),
  ('Nisha Pandey',     'Dog Walker',       NULL),
  ('Arun Sharma',      'Admin Helper',     4);

-- ── Adopter Phones ──
INSERT INTO adopter_ph (ph, ad_id) VALUES
  ('9876543210', 1),
  ('+91 8076634588', 2),
  ('9988776655', 3),
  ('8877665544', 4),
  ('7766554433', 5),
  ('9123456789', 6);

-- ── Staff Phones ──
INSERT INTO staff_ph (ph, stff_id) VALUES
  ('9871234567', 1),
  ('9872345678', 2),
  ('9873456789', 3),
  ('9874567890', 4),
  ('9875678901', 5);
