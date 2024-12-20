Følgende steps er required for at kunne køre systemet, når koden er hentet ned. 
 - Start en database(eksempelvis med docker)
 - Ændre "db.js" inde i "utils" mappen, så det passer med oplysningerne fra din database.
 - Opret en ny database, og kald den "portainer" uden quotes.
 - importer filen "portainerDB.sql ind i den nye oprettede database
 - Kør koden fra din konsol med "node app.js"

Ved start af applikationen, kan du logge ind som
test admin med følgende login oplysninger:

Email: admin@admin.dk
Password: 123

