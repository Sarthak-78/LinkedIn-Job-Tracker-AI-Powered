# AI Powered LinkedIn Job Tracker
**Made by:** Team Alphas

## Introduction
This project implements the **DroidRun framework** along with **MobileRun Cloud** to create an autonomous system for job search on LinkedIn.  
It features an **agentic AI-powered framework** that intelligently hunts for the best-matching jobs based on user skills and preferences.

Let’s hunt jobs intelligently in the era of **Artificial Intelligence** 🚀

## Installation
Let's first make the workplace and install droidrun framework

**For CLI & Python Usage**
```bash
pip install 'droidrun[google,anthropic,openai,deepseek,ollama,openrouter]'
```

**Setup the Portal APK**
Droidrun requires the Portal app to be installed on your Android device for device control. The Portal app provides accessibility services that expose the UI accessibility tree, enabling the agent to see and interact with UI elements.
```bash
droidrun setup
```
This command automatically:
<ol>
<li>Downloads the latest Portal APK</li>
<li>Installs it on your connected device</li>
<li>Enables the accessibility service</li>
</ol>

**Test Connection**
Verify that Droidrun can communicate with your device:
```bash
droidrun devices
```
If successful, you'll see your device ID<br>

**Configure Your LLM**<br>
**Set your API key:**<br>
For Windows:
```bash
setx GOOGLE_API_KEY "your_api_key"
```
For Linux:
```bash
export GOOGLE_API_KEY="your_api_key"
```
For MacOS:
```bash
echo 'export OPENAI_API_KEY="your_api_key_here"' >> ~/.zshrc
source ~/.zshrc
```

# Steps To Use
Step 1: Fork the project in your repository and make a clone of it.</br>
Step 2: Setup MongoDB in your system for using the app otherwise it will not run </br>
Step 3: After this in /backend  and /frontend folder write <code>npm i</code> to download the node modules</br>
Step 4: Then add your API key (If the given api key has expired) and add search for deviceId in the <code>agentRoutes.js</code> in the /backend/routes</br>
Step 5: Now you are all set to go start the server by writing <code>nodemon server.js</code> and start the frontend by <code>npm run dev</code></br>
Step 6: Connect your Mobile Phone and setup droidrun portal in it by watching this video <a href="https://youtu.be/4WT7FXJah2I">Click Here!</a></br>
Step 7: Connect with mobilerun framework and add your device ID </br>
Step 8: Now fill the necessary details in the web app and start your agent !</br>

Note : The Agent gives you the job roles which you have entered if you add a role which does not exist then it will not be able to send a job .</br>
