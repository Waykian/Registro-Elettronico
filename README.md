# Registro-Digitale
A digital register made with Spring Boot and Angular + Ionic.

# Setup
1. You need to manually create the schema *demo*, containing the tables *alunni* and *voti*
```SQL
CREATE TABLE alunni(
  matricola int,
  assenze int,
  nome varchar,
  cognome varchar,
  PRIMARY KEY (matricola)
);
```

```SQL
CREATE TABLE voti(
  votoid int,
  "data" date,
  materia varchar,
  voto int,
  matricola int,
  PRIMARY KEY (votoid),
  FOREIGN KEY (matricola) REFERENCES alunni(matricola)
);
```

2. Add the container "ode-postgres" to your Docker by executing the command below inside the **dockerPostgres** folder 
```
docker compose up
```

3. Run the backend in IntelliJ IDEA (recommended)

4. Run the frontend in Visual Studio Code (recommended) by executing the command below inside the **Registro-Elettronico-Fe** folder (in a new terminal inside the IDE)
```
ionic serve
```

The application will automatically appear on your default browser. If that doesn't happen, go to
http://localhost:8100/.


