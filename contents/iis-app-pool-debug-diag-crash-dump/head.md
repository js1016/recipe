1. Download and install Debug Diagnostic Tool from <https://www.microsoft.com/en-us/download/details.aspx?id=103453>.
2. Once installed, open **DebugDiag 2 Collection**, select **Crash** as the Rule Type, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-1.png)

3. Choose **A specific IIS web application pool** as the Target Type, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-2.png)

4. Select the IIS application pool from which you want to capture crash dumps, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-3.png)

    If you don't know the application pool corresponding to your IIS website, please refer to the steps below to retrieve it.

    - ref:get-app-pool-of-an-iis-website

5. In the **Advanced Configuration** page, click **Breakpoints...** to enter the **Configure Breakpoints** page, then click **Add Breakpoint...**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-4.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-5.png)

6. Select the first option from the list: **Ntdll!ZwTerminateProcess**. This value will automatically fill the **Breakpoint Expression** box. Set **Action Type** to **Full Userdump** and **Action Limit** to **5**. Click **OK** to save. You should then see the entry you just configured in the Breakpoints list. Click **Save & Close** to close the current window.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-6.png)

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-7.png)

7. You will return to the **Advanced Configuration** page. Keep all other settings as default, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-8.png)

8. Here, an automatically generated Rule name and a default path for saving crash dumps will be provided. If you want to change the path, choose your preferred location for saving crash dumps, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-9.png)

9. If you want the rule monitoring Application Pool crashes to take effect immediately, select **Activate the rule now** and then click **Finish**.

![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-10.png)

10. DebugDiag might display a confirmation box regarding the Symbol search path. Click **Yes**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-11.png)

11. At this point, you should see the rule you just created in the Rules list, which means the configuration is complete. Now we just wait for the application pool to crash next time. DebugDiag will automatically capture the crash dump.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-12.png)
