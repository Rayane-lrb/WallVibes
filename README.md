# WallVibes – Brussels Street Art Explorer

## Namen studenten
- Rayane Laroub
- Ibrahim Cheryoukh



##  Projectbeschrijving

WallVibes is een interactieve webapplicatie waarmee gebruikers street art in Brussel kunnen ontdekken.  
De applicatie maakt gebruik van open data van Brussel en toont verschillende kunstwerken met informatie zoals naam, kunstenaar, datum en locatie.

Gebruikers kunnen zoeken, sorteren en hun favoriete locaties opslaan. Daarnaast kunnen ze de sortering resetten en schakelen tussen een light en dark thema.

De applicatie is ontwikkeld met HTML, CSS en JavaScript en past verschillende concepten toe uit het vak Dynamic Web.



## Functionaliteiten

- Data ophalen via API
- Weergave van street art locaties in kaarten (cards)
- Zoekfunctie (real-time filtering)
- Sorteerfunctie:
  - A - Z
  - Z - A
  - Nieuwste eerst
  - Oudste eerst
  - Op gemeente
- Reset knop om sortering terug te zetten
- Favorieten opslaan met LocalStorage
- Dark en Light mode (theme switch)
- Foutmelding bij geen resultaten
- Responsive design (mobiel en desktop)
- Lazy loading met IntersectionObserver


## Gebruikte API

Brussels Open Data API:  
https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=20

De API bevat:
- Naam van het kunstwerk
- Kunstenaar
- Datum
- Postcode
- Afbeelding


## Technische vereisten 
| Functienaam | Bestand | Beginregel | Eindregel |
|---|---|---|---|
| `themeSwitch` | `main.js` | 13 | 21 |
| `fetchImages` | `main.js` | 33 | 43 |
| `displayImages` | `main.js` | 45 | 94 |
| `sortCards` | `main.js` | 103 | 120 |
| `addToFavs` | `favUtils.js` | 1 | 7 |
| `removeFromFavs` | `favUtils.js` | 9 | 13 |

###  DOM manipulatie
- Elementen selecteren met:
  - document.getElementById() (bovenaan main.js)
- Dynamisch elementen maken:
  - document.createElement() en innerHTML (functie displayImages)
- Events:
  - addEventListener() (zoekfunctie, sorteren, reset knop, favorieten)


### Modern JavaScript
- Arrow functions → gebruikt bij event listeners
- Template literals → bij het genereren van kaarten
- Array methods:
  - forEach() → in displayImages
  - sort() → in sortCards
- Ternary operator → bij theme switch
- Async / Await → in fetchImages()


### Data & API
- Fetch API:
  fetch(...) (in fetchImages)
- JSON verwerking:
  response.json()


###  Opslag & validatie
- LocalStorage:
  - Favorieten opslaan (addToFavs)
  - Favorieten verwijderen (removeFromFavs)
- Zoek validatie:
  - Controle op geen resultaten met visibleCount



### Observer API
- IntersectionObserver:
- Lazy loading van kaarten (onderaan main.js)



### Styling & layout
- Flexbox voor layout
- CSS styling
- Media queries voor responsive design


## Installatiehandleiding

1. Clone of download de repository  
2. Open het project in Visual Studio Code  
3. Start de applicatie:
   - met Live Server  
   OF  
   - open index.html in je browser  


## Screenshots

![1](image.png)
![2](image-1.png)
![3](image-2.png)
![4](image-3.png)



## Gebruikte bronnen
- Claude IA
  https://claude.ai/
- Canvas Cursus
  https://canvas.ehb.be/courses/45807
- Youtube Video
  https://youtu.be/vnftyztz6ss?si=iImQgFJTTL_YdgcY
- developer.mozilla.org ( Javascript documentatie)
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects


## AI chat
https://claude.ai/share/355dc8ed-affa-4a0b-b59c-faf2eefa2dff

## Taakverdeling
### Rayane
- Implementatie van API (fetch & data verwerking)
- Opbouw van de kaarten (displayImages)
- Favorieten functionaliteit (toevoegen/verwijderen)
- Lazy loading met IntersectionObserver
- Sorteringsfunctionaliteit
- Theme switch (dark/light mode)
- Algemene JavaScript logica
- CSS verbeteringen en layout styling
- User Storie

### Ibrahim
- Navbar en layout structuur
- Zoekfunctie (search bar)
- Filter en sorteer UI
- Error melding bij geen resultaten
- Responsive design (mobile optimalisatie)
- Iconen en visuele elementen (moon/sun, locatie, kalender)
- Styling en design aanpassingen
- Backlog 

###  Samenwerking
- Samen oplossen van bugs en merge conflicts
- Regelmatige commits per onderdeel en per dag
- Gezamenlijke verbetering van UI en functionaliteiten

## GitHub workflow

Tijdens het project werden meerdere commits uitgevoerd per onderdeel en per dag.
