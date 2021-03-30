# Gra Sokoban 


## Przygotowanie środowiska

Polecam korzystać z przeglądarek innych niż safari i internet explorer gdyż może to powodować pewne problemy np. firefox czy opera. Gra była robiona na mac os więc jeżeli to możliwe to proszę o jej testowanie na tym systemie, ubuntu miewał pewne problemy przy kompilacji.

### Serwer lokalny
Do odpalenaia gry potrzebny będzie serwer lokalny 'localhost' np. na Mac'u . [MAMP](https://www.mamp.info/en/downloads/)
na windowsie i linuxie [xammp](https://www.apachefriends.org/download.html) oraz 

### Potrzebne narzędzia
[Parcel](https://parceljs.org/), [Node.js](https://github.com/nvm-sh/nvm) oraz [npm](https://www.npmjs.com/) 
, które warto zainstalować z [nvm](https://github.com/nvm-sh/nvm)-dla systemów linuxowych i mac os, [nvm](https://github.com/coreybutler/nvm-windows)-dla systemów windowsowych 

#### Instalacja nvm na linuxie i mac os:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
//lub
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
Więcej informacji co do instalacji proszę szukać w podanym wyżej linku 'nvm'.

#### Instalacja npm oraz Node.js:
```bash
nvm install node

nvm use node
```
#### Instalacja Parcel'a:
```bash
npm install -g parcel bundler
```

## Instalacja gry
Gre można ściagnać wedle uznania np. za pomocą ściągnięcia paczki zip,
natomiast ja prefereuje wersje konsolową:

```bash
git clone "https://github.com/jfx21/Sokoban.git"
```
jeżeli nie posiadamy gita to można go zainstalować z tej [strony](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
Przechodzimy do folderu gdzie ściągneliśmy gre
```bash
cd Sokoban ##domyślnie floder zostanie tak zapisany
npm install
```
Przy instalacjii mogą wyskoczy 4 błedy, proszę się nie przejmować bo nie mają one wpływy na funkcjonowanie aplikacji.

Startujemy server localhost, następnie:
```bash
npm run start
```

Proszę odświeżyć raz stronę aby się załadowała czcionka google'a.

Aby zbudować:
```bash
npm run build
```
## Sterowanie
W grze postacią sterujemy za pomocą strzałek.
## Tworzenie własnej mapy-3 etap
Aby stworzyć własną mapę należy skorzystać z programu dostępnego pod tym linkiem [Tiled](https://www.mapeditor.org/)

Otwieramy ściągnięty program:

![I krok](img/4.png?raw=true)
klikamy na 'New Map'

![II krok](img/5.png?raw=true)

Wybieramy parametry tak jak na zdjęciu,

![III krok](img/1.png?raw=true)

powinniśmy dostać taki widok.

![IV krok](img/2.png?raw=true)

Dodajemy 'new tileset' o nazwie 'Sokoban' z parametrami tak jak na grafice, 'image source' znajduje się w folderze 
/public/assets/sokoban_tilesheet.png klikamy i dodajemy

![Zdjęcie poglodowe](https://github.com/jfx21/Sokoban/tree/main/img/3.png?raw=true)

![V krok](img/7.png?raw=true)

Zmieniamy nazwe 'Tile Layer 1' na 'Layer'

![VI krok](img/6.png?raw=true)
Z ukazanych kafelków na mapie możemy korzystac przy budowie jej własnej wersji, po pro

Ostatni krok

Klikamy 'file>export as' następnie zapisujemy go jako 'level$.json' (gdzie $ jest liczbą od 21-32) w folderze gry 
/public/levels


## Credits 
Grafiki zostały pobrane od https://www.kenney.nl/assets/sokoban

Efekty dźwiękowe oraz muzyka 
https://opengameart.org/content/puzzle-reflexion-loop-opening-theme
