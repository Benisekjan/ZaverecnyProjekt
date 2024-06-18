Systém pro správu a sledování aktivity 
-
Desktopová aplikaci, která umožňuje uživatelům sledovat, kolik času tráví na různých aplikacích a webech na svém zařízení, a zaznamenává, kdy jsou neaktivní. Aplikace bude umístěna v systémové liště (system tray) a bude poskytovat podrobné statistiky o aktivitách uživatele, aby jim pomohla analyzovat a optimalizovat jejich produktivitu.

Klíčové vlastnosti:
-
1.Sledování času stráveného na aplikacích a webech:

    Automatické sledování doby, kterou uživatel stráví v různých aplikacích a na webových stránkách.

  
2.Detekce neaktivity:

    Zaznamenávání doby, kdy uživatel není aktivní, například při nečinnosti počítače.

  
3.Podrobné statistiky:

    Generování reportů a grafů zobrazujících časové rozložení činností.

  
4.Nastavení cílů:

    Možnost nastavit denní nebo týdenní cíle pro používání různých aplikací nebo snížení neaktivního času.

  
5.Upozornění a notifikace:

    Upozornění na překročení stanoveného času na aplikacích nebo dosažení cílů.

  
6.Historie a export dat:

    Ukládání historie aktivit a možnost exportu dat do CSV nebo jiných formátů pro další analýzu.


Technologie:
-
  Vývoj desktopové aplikace:
  
    Electron.js: Pro vývoj multiplatformní desktopové aplikace, která bude běžet na Windows, macOS a Linux.
    Node.js: Pro backendovou logiku a zpracování dat v aplikaci.
    
  Sledování aktivit:
  
    Node.js moduly (např. active-win, node-os-utils): Pro sledování aktivních oken, doby strávené na jednotlivých aplikacích a systémové aktivity.

  Uživatelské rozhraní:
  
    HTML5 & CSS3: Pro strukturování a stylizaci rozhraní aplikace.
  
  Databáze:
  
    SQLite: Vestavěná databáze pro ukládání uživatelských dat a aktivit lokálně na zařízení.

  Notifikace:
  
    Node.js moduly (např. node-notifier): Pro zobrazování nativních notifikací v systému.

  Autentizace a zabezpečení:
   
    Keytar: Pro bezpečné ukládání a správu uživatelských hesel a autentizačních tokenů.
  
  Analytika a monitoring:
  
    Sentry: Pro sledování chyb a monitorování výkonu aplikace.

  Nasazení:
  
    Electron Builder: Pro balení aplikace do instalačních balíčků pro různé operační systémy (Windows, macOS, Linux).


Návrh funkcionalit:
-
  System Tray Integration:
  
    Aplikace bude mít ikonu v systémové liště, kde bude zobrazovat základní statistiky a umožňovat rychlý přístup k detailnějším údajům.
    
  Activity Dashboard:
  
    -Hlavní okno aplikace bude poskytovat podrobné statistiky o aktivitách, včetně grafů a tabulek.
    
  Customizable Alerts:
  
    -Uživatelé si budou moci nastavit vlastní upozornění pro překročení stanoveného času na aplikacích.
    
  Idle Time Detection:
  
    -Aplikace bude detekovat, kdy je uživatel neaktivní (např. myš a klávesnice nejsou používány po určitý čas).

Architektura aplikace:
-
  Frontend:
  
    -Electron.js (HTML, CSS, JavaScript)
    -React.js pro komponenty a interaktivní prvky
  
  Backend:
  
    -Node.js pro logiku aplikace a zpracování dat
    -SQLite pro ukládání dat
  
  Monitoring a notifikace:
  
    -Node.js moduly jako node-notifier a node-os-utils pro sledování a upozornění

  Deployment:
  
    -Electron Builder pro vytváření instalačních balíčků

Konkurence
-
RescueTime:

https://www.rescuetime.com/

Toggl Track:

https://toggl.com/

ManicTime:

https://www.manictime.com/

ActivityWatch:

https://github.com/ActivityWatch/activitywatch

Unikátní vlastnosti a rozšíření
-

Integrace s kalendáři a plánovači:

        Integrace s Google Calendar, Outlook a dalšími kalendáři pro synchronizaci a plánování produktivního času.

Multiplatformní podpora:

        Zajištění podpory pro různé operační systémy (Windows, macOS, Linux) s konzistentním uživatelským rozhraním a funkcemi.

Gamifikace:

        Zavedení herních prvků, jako jsou odznaky, úrovně a odměny za dosažení produktivních cílů.
