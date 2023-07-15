1. Run PowerShell as an administrator, navigate (using the cd command) to the directory where you extracted **LogCLogCatcherV3.5.zip**, then execute the following command to start log collection:

    ```powershell
    .\LogCatcher.ps1
    ```

    **Note**: The first time you run this script, you may need to click **Accept** to agree to the User License Agreement.

2. In the pop-up **LogCatcher** interface, specify the number of days covered by the logs you want to capture in the **Log Age** field. The default is 2 days. Input the IIS website IDs you want to capture in the **Site IDs** field. By default, it will capture all IIS websites. Then click **GENERATE ZIP** to begin capturing the logs.

    ![](https://joji.blob.core.windows.net/recipe/logcatcher-2.png)

3. Wait for **LogCatcher** to capture the logs. The whole process will take some time depending on the number and size of the logs to be captured. Errors may appear in PowerShell during this process, but you can ignore them. Upon completion, LogCatcher will package all the logs into a ZIP file and display the path of the ZIP file on the interface.

    ![](https://joji.blob.core.windows.net/recipe/logcatcher-3.png)
