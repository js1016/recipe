1. Open an elevated command prompt or PowerShell
2. Ensure `c:\temp` folder exists or create it using command: `mkdir c:\temp`
3. To start tracing, please run following command in command prompt or PowerShell:

    ```
    netsh trace start tracefile=c:\temp\internetclient.etl scenario=InternetClient level=5 capture=yes persistent=yes
    ```

    You will see `Status: Running` indicating the tracing has been started.

    ![](https://joji.blob.core.windows.net/recipe/internetclient-etl-tracing-1.png)
