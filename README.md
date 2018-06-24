# RaspTube-server

## Introduction

YouTube music server, which lets queueing songs from different devices.

## Instalation

You'll need `nodejs`, `npm`, `git` and `bower` (a package manager for the web) installed.

```
git clone https://github.com/petkofff/rasptube-server.git
cd rasptube-server
npm install 
bower install
```

You're almost ready! RaspTube usues [mpsyt](https://github.com/mps-youtube/mps-youtube) to play music.

```
sudo pip3 install mps-youtube
```
If you prefer other player:

```
cd settings
sh [your fav player].sh
```

Or you can change `pls.sh` (first argument shoud be URL to a youtube video) and `sts.sh` (should kill the player).

## Usage 

```
node index.js
```