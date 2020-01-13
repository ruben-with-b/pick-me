# Dokumentation

## "Unsichtbare Funktionen"
Die Funktionen "auf WhatsApp teilen" und "Benachrichtigungen erstellen" werden 
nicht vom Frontend unterstützt. Diese Funktionen können nur über die 
Swagger-API-Dokumentation genutzt werden: 
 * Zum nutzen der Funktion "***auf WhatsApp teilen***" muss zuerst die ID einer 
 Packliste in Erfahrung gebracht werden. Dazu bietete es sich an einen GET-Aufruf
 auf dem "/my_bags"-Endpoint auszuführen. Hier kopiert man sich nun die ID der
 Packliste, die geteilt werden soll. Diese ID übergibt man im Anschluss an den 
 Endpoint "/my_bags/{id}/share_on_whatsapp". Dieser Endpoint liefert dann eine 
 URI im whatsapp-Protokoll. Diese URI kann jedem gängigen Browser übergeben 
 werden. Ist WhatsApp Desktop oder WhatsApp installiert, so wird die 
 Applikation geöffnet. In der Applikation muss man nun nur noch den Empfänger 
 wählen. Danach kann mit einem Klick eine Text-Repräsentation der Packliste 
 verschickt werden.
 * Die Funktion "***Benachrichtigungen erstellen***" ist Teil der Funktion 
 "Tasche erzeugen". Zusätzlich zu den Standardattributen einer Tasche muss
 ein dueDate übergeben werden. Dieses dueDate wird entweder absolut (als 
 Datum im ISO-Format, z.B.: "2020-01-13T15:11:50.068Z") oder relativ (x Sekunden 
 in der Zukunft, z.B.: "+10") angegeben. Nachdem die Tasche erzeugt wurde 
 erinnert die Anwendung zum spezifizierten Zeitpunkt daran, dass man die Tasche
 fertig packen muss. ***Das geschieht mithilfe einer Ausgabe auf der Konsole.***

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

