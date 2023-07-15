1. Download from <https://github.com/rajkumar-rangaraj/PDB-Downloader/releases/download/v1.0/PDBDownloader.exe> and run **PDBDownloader.exe**.

2. Click on **Open File(s)**, browse and select `iisw3adm.dll` in the following directory, then click **Start** to begin downloading the Symbol files.

    - For 64-bit systems: C:\Windows\System32\inetsrv
    - For 32-bit systems: C:\Windows\SysWOW64\inetsrv

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-2.png)

    The downloaded Symbol files will be stored in `C:\symbols`.

3. ref:install-debug-diag

4. After installation, open **DebugDiag 2 Collection**. You will see a **Select Rule Type** window. Click **Cancel** to close this window.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-3.png)

5. Open **Tools** -> **Options And Settings...**, change the **Symbol Search Path** to `srv*c:\symbols*http://msdl.microsoft.com/download/symbols`, then click **OK** to save.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-4.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-5.png)

6. Click on **Add Rule...**, select **Crash**, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-6.png)

7. Choose **A specific NT service** as the Target Type, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-7.png)

8. In the Select Target window, select **WAS** (Windows Process Activation Service), then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-8.png)

9. In the Advanced Configuration window, click on **Breakpoints...** to open the Configure Breakpoints window, then click on **Add Breakpoint...**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-9.png)

10. In the Configure Breakpoint window, enter `iisw3adm!WORKER_PROCESS::PingResponseTimerExpiredWorkItem` in the Breakpoint Expression field, set **Action Limit** to **0**, set **Action Type** to **Custom...**, a window for Provide DebugDiag Script Commands For Custom Action will pop up. Enter the following script content and click **OK** to save. Then click **OK** again to save this Breakpoint.

    ```vb
    Dim w3wpProcessId, rcx
    rcx = CausingThread.Register("rcx")
    w3wpProcessId = CInt(Debugger.ReadDWORD(rcx + 72))
    WriteToLog "w3wp process id = " & w3wpProcessId
    Dim Controller, ActiveProcess
    Set Controller = CreateObject("DbgSvc.Controller")
    Set ActiveProcess = Controller.Processes.GetProcessByProcessID(w3wpProcessId)
    DumpName = ActiveProcess.CreateDump("PING_FAILURE")
    WriteToLog "Created dump file " & DumpName
    ```

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-10.png)

11. DebugDiag will show the following prompt, click Yes to continue.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-11.png)

12. You will see the Breakpoint you just created in the Breakpoints list. Click **Save & Close**, click **Next**, then click **Next** again.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-12.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-13.png)

13. If you want this rule to take effect immediately, select **Activate the rule now** and then click **Finish** to complete the configuration.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-10.png)

14. Open **Services** as an administrator, right-click on **Windows Process Activation Service** and select **Restart**. If a prompt asks you to confirm the restart of other associated services, click **Yes** to confirm.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-14.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-15.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-ping-failure-dump-using-debug-diag-16.png)

15. You now have the rule configured. Let's just wait for the issue to reoccur. The dumps will be generated in the `Misc` folder at `C:\Program Files\DebugDiag\Logs\Misc` (no matter what folder you choose while creating the crash rule) and will have the text `PING_FAILURE` appended in the file name.
