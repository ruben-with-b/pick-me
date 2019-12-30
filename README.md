# Entwickler-Dokumentation

## Externe Abhängigkeiten
Die einzige externe Abhängigkeit dieser Anwendung ist die Datenbank. Hierbei 
greifen wir auf eine SaaS zurück. Das heißt: Die Datenbank wird von
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) zur Verfügung gestellt
und ist bei AWS gehostet. **Als Nutzer der Anwendung kann die Abhängigkeit 
zur Datenbank ignoriert werden. Die Datenbank ist stets erreichbar und mit 
Demo-Daten initialisiert.**

## Start
Zum Starten der Anwendung `npm start` eingeben. Danach findet man die Anwendung
unter *https://localhost:8080*.<br>
Gleichzeitig mit der Anwendung wird auch die API-Dokumentation ausgeliefert. 
Die API-Dokumentation findet man unter *http://localhost:3000/api-docs*

## Konsolen-Output
Jede Zeile, die mit [0] beginnt stammt vom Backend.<br>
Analog dazu stammt jede Zeile, die mit [1] beginnt vom Frontend.

Um den Konsolen-Output beider Teile zu trennen kann man in zwei verschiedenen 
Terminals `npm run start:frontend` und `npm run start:backend` ausführen.

## Linter
In diesem Projekt wird [ESLint](https://eslint.org/) als Linter verwendet. 
Bitte konfiguriere deine IDE so, dass sie die Warnungen und Fehler von 
[ESLint](https://eslint.org/) anzeigt.

