# ZeDu

Zählung zur Erfassung des Durchgangsverkehrs. Client/Server Anwendung auf nodejs basierend mit Spracherkennung / für Spracheingabe.


### Auf Entwicklungssystem ausführen

- Benötigt ein Ubuntu (wegen Vosk / damit läuft's jedenfalls) mit Git und Node.js installiert.
- [Build tools installieren für ffi-napi](https://github.com/TooTallNate/node-gyp#installation)
```bash
git clone https://github.com/bogi-hw/zedu.git
cd zedu
npm install --ignore-scripts TODO: Muss --ignore-scripts raus, wegen Vosk, weil das irgendwelche c++ library bindings baut ?
npm run dev
```