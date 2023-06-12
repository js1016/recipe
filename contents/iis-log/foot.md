1. Run **Command Prompt** or **PowerShell** as Administrator and execute the command `netsh http flush logbuffer` to force all entries in the log buffer to be written into the log file.

    ![](https://joji.blob.core.windows.net/recipe/iis-log-1.png)

2. ref:iis-site-id

3. Double-click the target site, and then double-click **Logging** to view its logging settings. Here, you can find the storage path for the IIS logs of the target site.

    ![](https://joji.blob.core.windows.net/recipe/iis-log-2.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-log-3.png)

4. Access the storage path in **File Explorer**. You may find multiple folders starting with `W3SVC` followed by a number. Choose the folder that ends with the site ID you obtained earlier. For example, if the site ID is **2**, navigate to the W3SVC**2** directory.

    ![](https://joji.blob.core.windows.net/recipe/iis-log-6.png)

5. Inside this folder, you may find several IIS log files. Identify the ones that cover the time period you are interested in and retrieve those files.

    ![](https://joji.blob.core.windows.net/recipe/iis-log-5.png)
