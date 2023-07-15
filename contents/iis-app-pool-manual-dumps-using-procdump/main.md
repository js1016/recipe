1. ref:open-iis-manager

2. In the left Connections panel of the IIS Manager, click on the server root node, then double-click **Worker Processes** to view all currently running IIS worker processes on the server.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-manual-dumps-using-procdump-1.png)

3. Identify and remember the **Process ID** corresponding to the Application Pool from which you wish to capture a dump.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-manual-dumps-using-procdump-2.png)

    If there are multiple Worker Processes running and you're unsure which Application Pool corresponds to your IIS website of interest, you can refer to the following steps to identify the correct Application Pool.

    - ref:get-app-pool-of-an-iis-website

4. Run CMD or PowerShell with administrator privileges. Change directory (CD) to the location where you've unzipped **ProcDump**, then run the command below, replacing `<PID>` with the Worker Process id you identified in the previous step. For example, if the process id was 7944, then run `procdump.exe -ma 7944 -n 3 -s 2 -accepteula`.

    ```
    procdump.exe -ma <PID> -n 3 -s 2 -accepteula
    ```

    This command will consecutively capture 3 full user dumps, with a 2-second interval between each dump. If you want to adjust the number of dumps being captured, you can modify the parameter following `-n`. If you want to adjust the interval between each dump capture, you can modify the parameter following `-s`.

5. Once **ProcDump** finishes capturing, the dumps will be generated in the current working directory. You can identify these dump files by observing the output of ProcDump for the filenames.

    ```
    [11:57:59] Timed:
    [11:57:59] Dump 1 initiated: c:\temp\Procdump\w3wp.exe_230715_115759.dmp
    [11:58:00] Dump 1 writing: Estimated dump file size is 56 MB.
    [11:58:00] Dump 1 complete: 56 MB written in 0.9 seconds
    [11:58:03] Timed:
    [11:58:03] Dump 2 initiated: c:\temp\Procdump\w3wp.exe_230715_115803.dmp
    [11:58:04] Dump 2 writing: Estimated dump file size is 56 MB.
    [11:58:04] Dump 2 complete: 56 MB written in 0.3 seconds
    [11:58:07] Timed:
    [11:58:07] Dump 3 initiated: c:\temp\Procdump\w3wp.exe_230715_115807.dmp
    [11:58:07] Dump 3 writing: Estimated dump file size is 56 MB.
    [11:58:07] Dump 3 complete: 56 MB written in 0.3 seconds
    [11:58:07] Dump count reached.
    ```
