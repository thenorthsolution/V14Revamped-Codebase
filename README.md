# Codebase of the Discord.js V14 Revamped YouTube series
*Last updated: 04-06-2024 @ 00:31 UTC*

*README.md last updated: 04-06-2024 @ 00:37 UTC*

## Getting started with this codebase
1. Download this GitHub repository and open it in your code editor (e.g. Visual Studio Code).

2. Create a new file called `.env` and paste in the following:
```env
DISCORD_TOKEN=
MONGODB_URI=
```
3. Open the `.env.example` file to see what you need to paste in where.
   
4. If you do not know how to set up a MongoDB database, then please watch [episode 3 of the Discord.js V14 Revamped series](https://youtu.be/1aY3DO3oOHQ) to see how to create an account and create login credentials.

5. Open the `config.json` file and change the values to match both the server ID of your test server and the user ID of all developers working on this project (can be multiple, just add multiple elements inside the array).
   
6. Save everything and open your terminal/console.
    
6. Run the following command to install every package needed for this codebase to run properly:
```
npm install
```

7. Run one of the following commands to start your bot:
```
npm run dev

npm run public
```
*Run* `npm run dev` *if you want to edit your dev-only commands that are registered on your test server - the bot will not auto-restart on every save you make in your code editor. Run* `npm run public` *if you want to edit your regular commands that are registered globally - the bot will auto-restart on every save you make in your code editor.*

## Questions? Having problems?
If you have any questions about this code base or you face issues when following this step-by-step guide, you can join our [The North Solution Discord server](https://discord.gg/nyBw3vrMnM) and we will help you out.
