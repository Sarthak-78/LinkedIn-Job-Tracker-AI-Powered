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
