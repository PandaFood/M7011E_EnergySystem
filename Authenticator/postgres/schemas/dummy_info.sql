
INSERT INTO users (id, name, adress, city, country, email, password, role) VALUES (uuid_generate_v4(), 'Per Lindgren', 'Busvägen 12', 'Luleå', 'Sweden', 'Per.Lindgren@perrabus.se', '1', 'USER');
INSERT INTO users (id, name, adress, city, country, email, password, role) VALUES (uuid_generate_v4(), 'Jonathan Brorsson', 'Docentvägen 18', 'Luleå', 'Sweden', 'admin@gle.se', '$argon2i$v=19$m=4096,t=3,p=1$lvahi/MBONWY1iW1vn1Uxg$UIclMMcnRhJvu3D0S/LwYmVD+IPVmgfHegsB0dCDM2s', 'ADMIN');
INSERT INTO users (id, name, adress, city, country, email, password, role) VALUES (uuid_generate_v4(), 'test', 'test', 'Luleå', 'Sweden', 'test@gle.se', '$argon2i$v=19$m=4096,t=3,p=1$mw5Lt+Ggt+Vze7P08zXcmQ$Z/wDwgtmdRylcNvmyquiPIqE3Nm1mtLz', 'USER');

