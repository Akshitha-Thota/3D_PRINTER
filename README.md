# 3D Printer Project



## Table of Contents

- [Step 1: Import Repository from GitHub](#step-1-import-repository-from-github)
- [Step 2: Install Node.js](#step-2-install-nodejs)
- [Step 3: Run the Server](#step-3-run-the-server)
- [Step 4: Open HTML File in VS Code](#step-4-open-html-file-in-vs-code)
  
## Step 1: Import Repository from GitHub

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/Akshitha-Thota/3D_PRINTER.git
   ```

   This command will create a local copy of the repository on your machine. After executing the command, you can navigate into the cloned directory using:

   ```bash
   cd 3D_PRINTER
   ```

## Step 2: Install Node.js

1. Go to the [Node.js official website](https://nodejs.org/).
2. Download the installer for your operating system (Windows, macOS, or Linux).
3. Run the installer and follow the instructions to complete the installation.
4. Verify the installation by running the following commands in your terminal:

   ```bash
   node -v
   npm -v
   ```

## Step 3: Run the Server

1. Open your terminal or command prompt.
2. Navigate to the directory of the cloned repository:

   ```bash
   cd 3D_PRINTER
   ```

3. Start the server by running the following command:

   ```bash
   node server.js
   ```

4. Your server should now be running. You can access it by opening your web browser and navigating to `http://localhost:3000`.

## Step 4: Open HTML File in VS Code

1. Open Visual Studio Code.
2. Click on `File` in the top menu, then select `Open Folder...`.
3. Navigate to the directory of your cloned repository and select it.
4. In the Explorer sidebar, locate the HTML file you want to open (e.g., `index.html`).
5. Click on the HTML file to open it in the editor.
6. To view the HTML file in your browser, you can either:
   - Right-click on the HTML file in the Explorer sidebar and select `Open with Live Server` (if you have the Live Server extension installed).
   - Or, simply open the HTML file directly in your web browser by navigating to the file location on your system.


[Download/View Video](3D_printer.mp4)

## Challenges Faced

### 1. Real-Time Data Simulation
- **Issue**: Generating realistic mock data for printer status (e.g., extruder temperature, bed temperature, print progress) required careful randomization to mimic real-world behavior.  
- **Solution**: Implemented a backend API with dynamic data ranges and randomized values to simulate real-time updates.

### 2. Frontend-Backend Integration
- **Issue**: Ensuring seamless communication between the frontend (HTML/CSS/JavaScript) and backend (Node.js/Express) for real-time dashboard updates.  
- **Solution**: Used `fetch` API for asynchronous data polling and updated the DOM dynamically to reflect changes without page reloads.

### 3. Error Handling
- **Issue**: Handling edge cases like printer disconnections or invalid data inputs.  
- **Solution**: Added error-checking in the backend API and user-friendly alerts on the frontend.

## How Challenges Were Overcome

### Independent Problem-Solving
- **Self-Reliance**: As a solo developer, I tackled challenges by breaking them into smaller tasks and prioritizing them based on impact and complexity.
### Documentation & Learning
- **Code Comments**: Added detailed inline comments to simplify future debugging and maintenance.  
- **Learning Curve**: Invested time in learning new tools (e.g., Chart.js for graphs) through tutorials and practice.  
