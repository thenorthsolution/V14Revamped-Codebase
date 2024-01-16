# Codebase of the Discord.js V14 Revamped YouTube series
*Last updated: 26-12-2023 @ 17:50 GMT**

*README.md last updated: 16-01-2024 @ 10:30 GMT*

## Getting started with this codebase
1. Download this GitHub repository and open it in your code editor (e.g. Visual Studio Code).

2. Create a new file called `.env` and paste in the following:
```env
TOKEN=
MONGODB_TOKEN=
```
3. Copy your Discord bot token from the Discord Developers website and paste it next to `TOKEN=` in your `.env` file.
   
4. If you do not know how to set up a MongoDB database, then please watch [episode 3 of the Discord.js V14 Revamped series](https://youtu.be/1aY3DO3oOHQ) to see how to create an account and create login credentials.
   
5. Copy the URI that is given on the MongoDB website and paste it next to `MONGODB_TOKEN=` in your `.env` file.
   
6. Save everything and open your terminal / command prompt.
    
7. Run the following command to install every package needed for this codebase to run properly:
```
npm install
```

8. After everything is installed, create 3 folders inside your `src` folder: one with the name `buttons`, one named `contextmenus` and the last one named `modals`. These folders are used for later videos, but you can leave them empty. <ins>**You cannot delete them - they must exist in your `src` folder.**</ins> If done correctly, your `src` folder should look like this:
```
📁 src
  📁 buttons
  📁 commands/misc
  📁 contextmenus
  📁 events
  📁 handlers
  📁 modals
  📁 utils
  config.json
  index.js
  messageConfig.json
  suspiciousUsers.json
```

9. Run one of the following commands to start your bot:
```
node .

nodemon .
```
*Run* `node .` *if you do not want an auto-restart on every save you make in your code editor; run* `nodemon .` *if you do want an auto-restart on every save you make in your code editor.*

## Questions? Having problems?
If you have any questions about this code base or you face issues when following this step-by-step guide, you can join our [The North Solution Discord server](https://discord.gg/nyBw3vrMnM) and we will help you out.
