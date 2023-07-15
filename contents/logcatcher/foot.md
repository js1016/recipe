1. Run PowerShell as an administrator, navigate (using the cd command) to the directory where you extracted **LogCatcher.zip**, then execute the following command to start log collection:

    ```powershell
    .\LogCatcher.ps1 -Quiet $true
    ```

    **Note**: The first time you run this script, you may need to click **Accept** to agree to the User License Agreement.

2. Wait for the script to finish running. There may be some error messages during the process, but they can be ignored. After the script is complete, it will notify you of the log's storage path.
    ```
    Zip can be found at the following path: C:\temp\LogCatcher\LOGcatcher-23-07-15-07-29-53.zip
    ```
