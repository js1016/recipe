1. ref:install-debug-diag
2. Once installed, open **DebugDiag 2 Collection**, select **Crash** as the Rule Type, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-1.png)

3. Choose **A specific IIS web application pool** as the Target Type, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-2.png)

4. Select the IIS application pool from which you want to monitor exceptions, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-3.png)

    If you don't know the application pool corresponding to your IIS website, please refer to the steps below to retrieve it.

    - ref:get-app-pool-of-an-iis-website

5. In the **Advanced Configuration** page, change **Action type for unconfigured first chance exceptions** to **Log Stack Trace**, keep all other settings as default, then click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-exception-monitoring-using-debug-diag-1.png)

    Click **Yes** if you see following prompt:

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-exception-monitoring-using-debug-diag-2.png)

6. Keep default settings and click **Next**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-exception-monitoring-using-debug-diag-3.png)

7. If you want the rule monitoring Application Pool exceptions to take effect immediately, select **Activate the rule now** and then click **Finish**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-10.png)

8. DebugDiag might display a confirmation box regarding the Symbol search path. Click **Yes**.

    ![](https://joji.blob.core.windows.net/recipe/iis-app-pool-debug-diag-crash-dump-11.png)

9. At this point, you should see the rule you just created in the Rules list, which means the configuration is complete. Next, let's monitor this Application Pool for a period of time. If the Application Pool throws any exceptions, DebugDiag will record the stack trace of these exceptions in plain text.
