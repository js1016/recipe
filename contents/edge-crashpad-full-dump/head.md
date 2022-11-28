1. Search `environment` in Windows and open `Edit the system environment variables`.

   ![](https://joji.blob.core.windows.net/recipe/edge-crashpad-full-dump-1.png)

2. Click **Environment Variables**, create a new user variable as:
   
   **Variable name**: ENABLE_HEAP_DUMPS
   
   **Variable value**: 1
   
   ![](https://joji.blob.core.windows.net/recipe/edge-crashpad-full-dump-2.png)

3. The setting will only take effect after you close all existing Edge processes (msedge.exe) and start a new Edge window.